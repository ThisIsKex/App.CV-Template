import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Resume } from "../types/resume.types";
import { getDefaultResume } from "../utils/defaults";
import { isValidResume } from "../utils/validation";
import { STORAGE_KEYS } from "../constants";

export const useCVStore = defineStore("cv", () => {
  // State
  const resumeData = ref<Resume>(getDefaultResume());
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Auto-save to localStorage on changes (with debounce)
  let saveTimeout: number | undefined;
  watch(
    resumeData,
    () => {
      if (saveTimeout) clearTimeout(saveTimeout);
      saveTimeout = window.setTimeout(() => {
        saveToLocalStorage();
      }, 500);
    },
    { deep: true },
  );

  // Actions
  async function loadResumeData() {
    isLoading.value = true;
    error.value = null;

    try {
      // 1. Try loading from localStorage first
      const stored = localStorage.getItem(STORAGE_KEYS.CV_DATA);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isValidResume(parsed)) {
          resumeData.value = parsed;
          console.log("✅ CV-Daten aus localStorage geladen");
          isLoading.value = false;
          return;
        }
      }

      // 2. Try loading from cv-data.json
      const response = await fetch("/cv-data.json");
      if (response.ok) {
        const jsonData = await response.json();
        if (isValidResume(jsonData)) {
          resumeData.value = jsonData;
          saveToLocalStorage();
          console.log("✅ CV-Daten aus cv-data.json geladen");
        } else {
          throw new Error("Ungültiges Resume-Format");
        }
      } else {
        // 3. Use default data
        console.log("ℹ️ Keine cv-data.json gefunden, nutze Standard-Daten");
        resumeData.value = getDefaultResume();
      }
    } catch (err) {
      console.error("❌ Fehler beim Laden der CV-Daten:", err);
      error.value = err instanceof Error ? err.message : "Unbekannter Fehler";
      resumeData.value = getDefaultResume();
    } finally {
      isLoading.value = false;
    }
  }

  function saveToLocalStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.CV_DATA, JSON.stringify(resumeData.value));
    } catch (err) {
      console.error("❌ Fehler beim Speichern in localStorage:", err);
    }
  }

  function updateResumeData(newData: Resume) {
    if (isValidResume(newData)) {
      resumeData.value = newData;
      saveToLocalStorage();
    }
  }

  function resetResumeData() {
    resumeData.value = getDefaultResume();
    localStorage.removeItem(STORAGE_KEYS.CV_DATA);
    error.value = null;
  }

  // Array manipulation helpers with proper typing
  function addToArray<K extends keyof Resume>(
    section: K,
    item: Resume[K] extends (infer T)[] ? T : never,
  ) {
    const array = resumeData.value[section];
    if (Array.isArray(array)) {
      array.push(item as any);
    }
  }

  function removeFromArray<K extends keyof Resume>(section: K, index: number) {
    const array = resumeData.value[section];
    if (Array.isArray(array)) {
      array.splice(index, 1);
    }
  }

  return {
    // State
    resumeData,
    isLoading,
    error,

    // Actions
    loadResumeData,
    updateResumeData,
    resetResumeData,
    saveToLocalStorage,
    addToArray,
    removeFromArray,
  };
});
