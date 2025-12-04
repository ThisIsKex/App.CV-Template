<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/resume/Header.vue";
import Work from "../components/resume/Work.vue";
import Education from "../components/resume/Education.vue";
import Skills from "../components/resume/Skills.vue";
import Projects from "../components/resume/Projects.vue";
import Interests from "../components/resume/Interests.vue";
import { useCVStore } from "../stores/cvStore";
import Certificates from "../components/resume/Certificates.vue";

const router = useRouter();
const cvStore = useCVStore();
const isPrinting = ref(false);

onMounted(async () => {
  await cvStore.loadResumeData();
});

const handlePrint = () => {
  isPrinting.value = true;
  window.print();
  setTimeout(() => {
    isPrinting.value = false;
  }, 1000);
};

const isEmpty = (arr: unknown[] | undefined) => !arr || arr.length === 0;
const hasContent = () => {
  const data = cvStore.resumeData;
  return (
    data.basics.name ||
    !isEmpty(data.work) ||
    !isEmpty(data.education) ||
    !isEmpty(data.skills) ||
    !isEmpty(data.projects)
  );
};
</script>

<template>
  <div class="cv-app">
    <!-- Loading State -->
    <div v-if="cvStore.isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Lebenslauf wird geladen...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="cvStore.error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h2>Fehler beim Laden</h2>
      <p>{{ cvStore.error }}</p>
      <button @click="router.push('/edit')" class="edit-button">
        <font-awesome-icon icon="pen" /> Zum Editor
      </button>
    </div>

    <!-- Empty State -->
    <div v-else-if="!hasContent()" class="empty-container">
      <div class="empty-icon">📄</div>
      <h2>Noch keine Daten vorhanden</h2>
      <p>Erstellen Sie Ihren Lebenslauf im Editor oder laden Sie eine JSON-Datei hoch.</p>
      <button @click="router.push('/edit')" class="edit-button">
        <font-awesome-icon icon="pen" /> Zum Editor
      </button>
    </div>

    <!-- Content State -->
    <div v-else>
      <div class="print-controls">
        <button @click="router.push('/edit')" class="edit-button">
          <font-awesome-icon icon="pen" /> Bearbeiten
        </button>
        <button @click="handlePrint" class="print-button">
          <font-awesome-icon icon="print" /> PDF/Drucken
        </button>
      </div>
      <Header :basics="cvStore.resumeData.basics" />
      <Work v-if="!isEmpty(cvStore.resumeData.work)" :work="cvStore.resumeData.work" />
      <Education
        v-if="!isEmpty(cvStore.resumeData.education)"
        :education="cvStore.resumeData.education"
      />
      <Skills v-if="!isEmpty(cvStore.resumeData.skills)" :skills="cvStore.resumeData.skills" />
      <Projects
        v-if="!isEmpty(cvStore.resumeData.projects)"
        :projects="cvStore.resumeData.projects"
      />
      <Certificates
        v-if="!isEmpty(cvStore.resumeData.certificates)"
        :certificates="cvStore.resumeData.certificates"
      />
      <Interests
        v-if="!isEmpty(cvStore.resumeData.interests)"
        :interests="cvStore.resumeData.interests"
      />

      <footer class="cv-footer">
        © 2025 {{ cvStore.resumeData.basics.name }} – Erstellt mit Vue 3 & TypeScript
      </footer>
    </div>
  </div>
</template>

<style scoped>
.print-controls {
  text-align: center;
  padding: 20px;
  background: #f5f5f5;
  margin-bottom: 30px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.print-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.print-button:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 80, 145, 0.3);
}

.print-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(14, 80, 145, 0.2);
}

.edit-button {
  background-color: var(--color-success);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-right: 12px;
}

.edit-button:hover {
  background-color: var(--color-success-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.edit-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(40, 167, 69, 0.2);
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-container p {
  font-size: 1.2rem;
  color: var(--color-primary);
}

.error-container {
  color: var(--color-error);
}

.error-icon,
.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.error-container h2,
.empty-container h2 {
  font-size: 2rem;
  margin-bottom: 12px;
  color: var(--color-text-dark);
}

.error-container p,
.empty-container p {
  font-size: 1.1rem;
  color: var(--color-text-light);
  margin-bottom: 24px;
  max-width: 500px;
}

.cv-app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.cv-footer {
  text-align: center;
  color: var(--color-text-light);
  padding: 20px;
  font-size: 13px;
  margin-top: 40px;
}

@media print {
  @page {
    margin-top: 1cm;
    margin-bottom: 1cm;
    size: A4;
  }

  @page :first {
    margin: 0;
    margin-bottom: 1cm;
    size: A4;
  }

  .print-controls,
  .loading-container,
  .error-container,
  .empty-container {
    display: none !important;
  }

  .cv-footer {
    display: none;
  }
}
</style>
