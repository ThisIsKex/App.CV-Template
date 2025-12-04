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
import { ref, onMounted, computed } from "vue";
import { useCVStore } from "../stores/cvStore";
import { useToast } from "../composables/useToast";
import { useFileHandling } from "../composables/useFileHandling";

const cvStore = useCVStore();
const { success, error: showError, warning } = useToast();
const { downloadResume, uploadResume } = useFileHandling();

const fileInputRef = ref<HTMLInputElement | null>(null);
const showConfirmDialog = ref(false);

// Computed reference to store data
const resume = computed(() => cvStore.resumeData);

onMounted(async () => {
  await cvStore.loadResumeData();
});

function triggerFileInput() {
  fileInputRef.value?.click();
}

function handleDownload() {
  downloadResume(resume.value);
  success("CV-Daten erfolgreich heruntergeladen!");
}

function handleSave() {
  cvStore.saveToLocalStorage();
  success("Daten wurden gespeichert!");
}

async function handleUpload(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  try {
    const data = await uploadResume(file);
    cvStore.updateResumeData(data);
    success("Daten erfolgreich geladen!");
  } catch (err) {
    showError(err instanceof Error ? err.message : "Fehler beim Laden der Datei");
  } finally {
    // Reset input so the same file can be uploaded again
    input.value = "";
  }
}

function requestReset() {
  showConfirmDialog.value = true;
}

function confirmReset() {
  cvStore.resetResumeData();
  showConfirmDialog.value = false;
  warning("Alle Daten wurden zurückgesetzt");
}

function cancelReset() {
  showConfirmDialog.value = false;
}

function addArrayItem<K extends keyof typeof resume.value>(
  section: K,
  item: (typeof resume.value)[K] extends Array<infer T> ? T : never,
) {
  cvStore.addToArray(section, item);
}

function removeArrayItem<K extends keyof typeof resume.value>(section: K, idx: number) {
  cvStore.removeFromArray(section, idx);
}
</script>
<template>
  <div class="editor-view">
    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="modal-overlay" @click="cancelReset">
      <div class="modal-content" @click.stop>
        <h3>Bestätigung erforderlich</h3>
        <p>
          Möchten Sie wirklich alle Daten zurücksetzen? Diese Aktion kann nicht rückgängig gemacht
          werden.
        </p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="cancelReset">Abbrechen</button>
          <button class="btn-confirm" @click="confirmReset">Zurücksetzen</button>
        </div>
      </div>
    </div>

    <div class="editor-toolbar">
      <button class="editor-btn" @click="triggerFileInput">JSON Resume hochladen</button>
      <input
        ref="fileInputRef"
        type="file"
        accept=".json"
        @change="handleUpload"
        style="display: none"
      />
      <button class="editor-btn" @click="handleSave">Speichern</button>
      <button class="editor-btn" @click="handleDownload">Download</button>
      <button class="editor-btn btn-danger" @click="requestReset">Reset</button>
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
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 24px 20px;
}

h2 {
  margin-top: 0;
  font-size: 1.3rem;
  color: var(--color-primary);
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
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: var(--color-primary-dark);
}

.editor-toolbar {
  display: flex;
  margin: 0 auto;
  gap: 45px;
}

.editor-btn {
  background: var(--color-primary);
  color: var(--color-white);
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
  background: var(--color-primary-dark);
}

.editor-btn.btn-danger {
  background: var(--color-error);
}

.editor-btn.btn-danger:hover {
  background: #c82333;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--color-white);
  padding: 32px;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  max-width: 500px;
  width: 90%;
}

.modal-content h3 {
  margin-top: 0;
  color: var(--color-primary);
}

.modal-content p {
  margin: 16px 0 24px;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-cancel {
  background: #6c757d;
  color: var(--color-white);
}

.btn-cancel:hover {
  background: #5a6268;
}

.btn-confirm {
  background: var(--color-error);
  color: var(--color-white);
}

.btn-confirm:hover {
  background: #c82333;
}
</style>
