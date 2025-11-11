<script setup lang="ts">
import { onMounted } from "vue";
import Header from "../components/Header.vue";
import Profile from "../components/Profile.vue";
import Experience from "../components/Experience.vue";
import Education from "../components/Education.vue";
import Skills from "../components/Skills.vue";
import Projects from "../components/Projects.vue";
import ProfessionalDevelopment from "../components/ProfessionalDevelopment.vue";
import Interests from "../components/Interests.vue";
import { useCVStore } from "../stores/cvStore";

const cvStore = useCVStore();

onMounted(async () => {
  await cvStore.loadCVData();
});
</script>

<template>
  <div class="cv-app" v-if="cvStore.cvData">
    <Header :personalInfo="cvStore.cvData.personalInfo" />
    <Profile v-if="cvStore.cvData.profile" :profile="cvStore.cvData.profile" />
    <Experience :experiences="cvStore.experience" />
    <Education :education="cvStore.education" />
    <Skills :skills="cvStore.skills" />
    <Projects v-if="cvStore.projects.length > 0" :projects="cvStore.projects" />
    <ProfessionalDevelopment v-if="cvStore.cvData.professionalDevelopment.length > 0"
      :professionalDevelopment="cvStore.cvData.professionalDevelopment" />
    <Interests :interests="cvStore.cvData.interests" />

    <!-- <footer class="cv-footer">
      © 2025 {{ cvStore.cvData.personalInfo.name }} – Erstellt mit Vue 3 & TypeScript
    </footer> -->
  </div>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: #0e5091;
}

.cv-app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.cv-footer {
  text-align: center;
  color: #777;
  padding: 20px;
  font-size: 13px;
  margin-top: 40px;
}
</style>
