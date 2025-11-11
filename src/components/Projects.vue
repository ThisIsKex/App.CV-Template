<script setup lang="ts">
import type { Project } from "../types/cv.types";

defineProps<{
  projects: Project[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="lightbulb" class="section-icon" />
      Projekte (Auswahl)
    </h2>
    <div v-for="(project, index) in projects" :key="index" class="project-item">
      <p>
        <span v-if="project.icon" class="project-icon">{{ project.icon }}</span>
        <strong>{{ project.name }}:</strong> {{ project.description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.cv-section {
  margin: 30px auto;
  max-width: 900px;
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #0e5091;
  border-bottom: 2px solid #0e5091;
  padding-bottom: 6px;
  margin-bottom: 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-icon {
  font-size: 18px;
}

.project-item {
  margin-bottom: 15px;
}

.project-item:last-child {
  margin-bottom: 0;
}

.project-item p {
  margin: 0;
  line-height: 1.6;
}

.project-icon {
  margin-right: 5px;
}

@media print {
  .cv-section {
    box-shadow: none;
    margin: 5px auto;
    page-break-inside: avoid;
    padding: 15px 1.5cm;
  }
}
</style>
