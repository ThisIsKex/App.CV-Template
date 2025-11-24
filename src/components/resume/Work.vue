<script setup lang="ts">
import type { Work } from "../../types/resume.types";
import { defineProps } from "vue";
defineProps<{
  work: Work[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="briefcase" class="section-icon" />
      Berufserfahrung
    </h2>
    <div v-for="(item, index) in work" :key="index" class="experience-item">
      <h3>
        <strong>{{ item.position }}</strong> – {{ item.name }}
        <!--, {{ exp.location }} --->
      </h3>
      <span class="period">{{ item.startDate }} - {{ item.endDate }}</span>
      <ul>
        <li v-for="(resp, idx) in item.highlights" :key="idx">{{ resp }}</li>
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
  margin-bottom: 20px;
  page-break-inside: avoid;
  break-inside: avoid;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title period"
    "tasks .";
}

.experience-item:last-child {
  margin-bottom: 0;
}

.experience-item h3 {
  grid-area: title;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.experience-item .period {
  grid-area: period;
  color: #777;
  font-size: 14px;
  white-space: nowrap;
  align-self: baseline;
}

.experience-item ul {
  grid-area: tasks;
  margin: 0;
  padding-left: 20px;
  padding-right: 30px;
}

ul {
  margin: 0;
}

li {
  margin-bottom: 0px;
  font-size: 13px;
}

@media print {
  .cv-section {
    box-shadow: none;
    page-break-inside: auto;
    margin-top: 1cm;
    margin-left: 1cm;
    margin-right: 1cm;
  }

  h2 {
    margin: 0 0 12px 0;
  }

  .experience-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 15px;
  }
}
</style>
