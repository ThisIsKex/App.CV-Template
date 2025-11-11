<script setup lang="ts">
import type { Education } from "../types/cv.types";

defineProps<{
  education: Education[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="graduation-cap" class="section-icon" />
      Ausbildung
    </h2>
    <div v-for="(edu, index) in education" :key="index" class="education-item">
      <h3>
        <strong>{{ edu.degree }}</strong> – {{ edu.institution }}
      </h3>
      <span class="period">{{ edu.period }}</span>
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

.education-item {
  margin-bottom: 15px;
  page-break-inside: avoid;
  break-inside: avoid;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px 20px;
}

.education-item:last-child {
  margin-bottom: 0;
}

.education-item h3 {
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.education-item .period {
  color: #777;
  font-size: 16px;
  white-space: nowrap;
  align-self: baseline;
}

@media print {
  .cv-section {
    box-shadow: none;
    margin: 5px auto;
    page-break-inside: auto;
    padding: 15px 1.5cm;
  }
  
  .education-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 12px;
    gap: 5px 15px;
  }
}
</style>
