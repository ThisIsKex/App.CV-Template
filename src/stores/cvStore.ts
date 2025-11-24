import { defineStore } from "pinia";
import { ref } from "vue";
import type { Resume } from "../types/resume.types";

export const useCVStore = defineStore("cv", () => {
  // State
  const resumeData = ref<Resume | null>(null);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  // Actions
  async function loadResumeData() {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch("/cv-data.json");
      if (response.ok) {
        const jsonData = await response.json();
        console.log(jsonData);
        resumeData.value = jsonData;
        console.log("✅ CV-Daten aus cv-data.json geladen");
      } else {
        console.log("ℹ️ Keine cv-data.json gefunden, nutze Standard-Daten");
        // Hier könnten Standard-Daten gesetzt werden
      }
    } catch (err) {
      console.log("ℹ️ Keine cv-data.json gefunden, nutze Standard-Daten");
      error.value = err instanceof Error ? err.message : "Unbekannter Fehler";
    } finally {
      isLoading.value = false;
    }
  }

  function updateResumeData(newData: Resume) {
    resumeData.value = newData;
  }

  function resetResumeData() {
    resumeData.value = null;
    error.value = null;
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
  };
});
