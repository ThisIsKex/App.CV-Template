<script setup lang="ts">
import type { ProfessionalDevelopment } from "../types/cv.types";

defineProps<{
  professionalDevelopment: ProfessionalDevelopment[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="lightbulb" class="section-icon" />
      Weiterbildung
    </h2>
    <div v-for="(dev, index) in professionalDevelopment" :key="index" class="development-item">
      <h3>
        <strong>{{ dev.title }}</strong> – {{ dev.institution }}
      </h3>
      <span class="period">{{ dev.period }}</span>
      <p v-if="dev.description" class="description">{{ dev.description }}</p>
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

.development-item {
  margin-bottom: 15px;
  page-break-inside: avoid;
  break-inside: avoid;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: 
    "title period"
    "description .";
  gap: 10px 20px;
}

.development-item:last-child {
  margin-bottom: 0;
}

.development-item h3 {
  grid-area: title;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.development-item .period {
  grid-area: period;
  color: #777;
  font-size: 16px;
  white-space: nowrap;
  align-self: baseline;
}

.description {
  grid-area: description;
  margin: 8px 0 0 0;
  line-height: 1.6;
  color: #555;
}

@media print {
  .cv-section {
    box-shadow: none;
    margin: 5px auto;
    page-break-inside: auto;
    padding: 15px 1.5cm;
  }
  
  .development-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 12px;
    gap: 5px 15px;
  }
}
</style>