<script setup lang="ts">
import PersonalDataEditor from "../components/editor/PersonalDataEditor.vue";
import WorkEditor from "../components/editor/WorkEditor.vue";
import EducationEditor from "../components/editor/EducationEditor.vue";
import SkillsEditor from "../components/editor/SkillsEditor.vue";
import ProjectsEditor from "../components/editor/ProjectsEditor.vue";
import InterestsEditor from "../components/editor/InterestsEditor.vue";
import CertificatesEditor from "../components/editor/CertificatesEditor.vue";
import AwardsEditor from "../components/editor/AwardsEditor.vue";
import PublicationsEditor from "../components/editor/PublicationsEditor.vue";
import LanguagesEditor from "../components/editor/LanguagesEditor.vue";
import ReferencesEditor from "../components/editor/ReferencesEditor.vue";
import { ref, onMounted } from "vue";
import type { Resume } from "../types/resume.types";

const fileInputRef = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInputRef.value?.click();
}

function getDefaultResume(): Resume {
  return {
    basics: {
      name: "",
      label: "",
      image: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: { address: "", city: "", countryCode: "", postalCode: "", region: "" },
      profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
  };
}

const resume = ref<Resume>(getDefaultResume());

function downloadResume() {
  const dataStr = JSON.stringify(resume.value, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cv-data.json";
  a.click();
  URL.revokeObjectURL(url);
}

function resetResume() {
  if (confirm("Wirklich alle Daten zurücksetzen?")) {
    resume.value = getDefaultResume();
    localStorage.removeItem("cvData");
  }
}

onMounted(() => {
  const stored = localStorage.getItem("cvData");
  if (stored) {
    try {
      resume.value = JSON.parse(stored);
    } catch (e) {
      resume.value = getDefaultResume();
    }
  }
});

function saveToLocalStorage() {
  localStorage.setItem("cvData", JSON.stringify(resume.value));
  alert("Daten wurden gespeichert!");
}

function handleUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      resume.value = data;
      localStorage.setItem("cvData", JSON.stringify(data));
      alert("Daten erfolgreich geladen und gespeichert!");
    } catch (err) {
      alert("Fehler beim Laden der Datei. Ungültiges JSON.");
    }
  };
  reader.readAsText(file);
}

function addArrayItem(section: keyof Resume, item: any) {
  (resume.value[section] as any[]).push(item);
}

function removeArrayItem(section: keyof Resume, idx: number) {
  (resume.value[section] as any[]).splice(idx, 1);
}
</script>
<template>
  <div class="editor-view">
    <div class="editor-toolbar">
      <button class="editor-btn" @click="triggerFileInput">JSON Resume hochladen</button>
      <input
        ref="fileInputRef"
        type="file"
        accept=".json"
        @change="handleUpload"
        style="display: none"
      />
      <button class="editor-btn" @click="saveToLocalStorage">Speichern</button>
      <button class="editor-btn" @click="downloadResume">Download</button>
      <button class="editor-btn" @click="resetResume">Reset</button>
    </div>

    <h1>CV Editor (JSON Resume Schema)</h1>
    <PersonalDataEditor
      v-model="resume"
      @addProfile="
        (resume.basics.profiles ?? (resume.basics.profiles = [])).push({
          network: '',
          username: '',
          url: '',
        })
      "
      @removeProfile="(idx) => (resume.basics.profiles ?? []).splice(idx, 1)"
    />
    <WorkEditor
      v-model="resume"
      @addWork="
        addArrayItem('work', {
          name: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          url: '',
          summary: '',
          highlights: [],
        })
      "
      @removeWork="(idx) => removeArrayItem('work', idx)"
      @addWorkHighlight="(idx) => resume.work[idx]?.highlights?.push('')"
      @removeWorkHighlight="(idx, hidx) => resume.work[idx]?.highlights?.splice(hidx, 1)"
    />
    <EducationEditor
      v-model="resume"
      @addEducation="
        addArrayItem('education', {
          institution: '',
          area: '',
          studyType: '',
          score: '',
          startDate: '',
          endDate: '',
        })
      "
      @removeEducation="(idx) => removeArrayItem('education', idx)"
    />
    <SkillsEditor
      v-model="resume"
      @addSkill="addArrayItem('skills', { name: '', level: '', keywords: [] })"
      @removeSkill="(idx) => removeArrayItem('skills', idx)"
      @addSkillKeyword="(idx) => resume.skills[idx]?.keywords?.push('')"
      @removeSkillKeyword="(idx, kidx) => resume.skills[idx]?.keywords?.splice(kidx, 1)"
    />
    <ProjectsEditor
      v-model="resume"
      @addProject="
        addArrayItem('projects', {
          name: '',
          url: '',
          startDate: '',
          endDate: '',
          description: '',
          highlights: [],
          keywords: [],
        })
      "
      @removeProject="(idx) => removeArrayItem('projects', idx)"
      @addProjectHighlight="(idx) => resume.projects[idx]?.highlights?.push('')"
      @removeProjectHighlight="(idx, hidx) => resume.projects[idx]?.highlights?.splice(hidx, 1)"
      @addProjectKeyword="(idx) => resume.projects[idx]?.keywords?.push('')"
      @removeProjectKeyword="(idx, kidx) => resume.projects[idx]?.keywords?.splice(kidx, 1)"
    />
    <InterestsEditor
      v-model="resume"
      @addInterest="addArrayItem('interests', { name: '', keywords: [] })"
      @removeInterest="(idx) => removeArrayItem('interests', idx)"
      @addInterestKeyword="(idx) => resume.interests[idx]?.keywords?.push('')"
      @removeInterestKeyword="(idx, kidx) => resume.interests[idx]?.keywords?.splice(kidx, 1)"
    />
    <CertificatesEditor
      v-model="resume"
      @addCertificate="addArrayItem('certificates', { name: '', issuer: '', date: '', url: '' })"
      @removeCertificate="(idx) => removeArrayItem('certificates', idx)"
    />
    <AwardsEditor
      v-model="resume"
      @addAward="addArrayItem('awards', { title: '', awarder: '', date: '', summary: '' })"
      @removeAward="(idx) => removeArrayItem('awards', idx)"
    />
    <PublicationsEditor
      v-model="resume"
      @addPublication="
        addArrayItem('publications', {
          name: '',
          publisher: '',
          releaseDate: '',
          url: '',
          summary: '',
        })
      "
      @removePublication="(idx) => removeArrayItem('publications', idx)"
    />
    <LanguagesEditor
      v-model="resume"
      @addLanguage="addArrayItem('languages', { language: '', fluency: '' })"
      @removeLanguage="(idx) => removeArrayItem('languages', idx)"
    />
    <ReferencesEditor
      v-model="resume"
      @addReference="addArrayItem('references', { name: '', reference: '' })"
      @removeReference="(idx) => removeArrayItem('references', idx)"
    />
  </div>
</template>

<style>
.editor-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}

section {
  margin-bottom: 32px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: 24px 20px;
}

h2 {
  margin-top: 0;
  font-size: 1.3rem;
  color: #0e5091;
}

.array-block {
  border-bottom: 1px solid #eee;
  margin-bottom: 16px;
  padding-bottom: 12px;
}

input,
textarea {
  display: block;
  margin-bottom: 8px;
  width: 100%;
  font-size: 1rem;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  margin: 4px 0 12px 0;
  padding: 6px 14px;
  background: #0e5091;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #09325c;
}

.editor-toolbar {
  display: flex;
  margin: 0 auto;
  gap: 45px;
}

.editor-btn {
  background: #0e5091;
  color: #fff;
  padding: 8px 18px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  min-width: 170px;
  text-align: center;
  transition: background 0.2s;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-btn:hover {
  background: #09325c;
}
</style>
