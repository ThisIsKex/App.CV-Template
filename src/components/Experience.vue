<script setup lang="ts">
import type { Experience } from "../types/cv.types";

defineProps<{
  experiences: Experience[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="briefcase" class="section-icon" />
      Berufserfahrung
    </h2>
    <div v-for="(exp, index) in experiences" :key="index" class="experience-item">
      <h3>
        <strong>{{ exp.title }}</strong> – {{ exp.company }}, {{ exp.location }}
      </h3>
      <span class="period">{{ exp.period }}</span>
      <ul>
        <li v-for="(resp, idx) in exp.responsibilities" :key="idx">{{ resp }}</li>
      </ul>
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

.experience-item {
  margin-bottom: 25px;
  page-break-inside: avoid;
  break-inside: avoid;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title period"
    "tasks .";
  gap: 10px 20px;
}

.experience-item:last-child {
  margin-bottom: 0;
}

.experience-item h3 {
  grid-area: title;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.experience-item .period {
  grid-area: period;
  color: #777;
  font-size: 16px;
  white-space: nowrap;
  align-self: baseline;
}

.experience-item ul {
  grid-area: tasks;
  margin: 0;
  padding-left: 20px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 6px;
}

@media print {
  .cv-section {
    box-shadow: none;
    margin: 5px auto;
    page-break-inside: auto;
    padding: 15px 1.5cm;
  }

  .experience-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 15px;
    orphans: 3;
    widows: 3;
    gap: 5px 15px;
  }

  .experience-item+.experience-item {
    border-top: 20px solid transparent;
    margin-top: -20px;
  }
}
</style>
