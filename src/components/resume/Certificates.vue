<script setup lang="ts">
import type { Certificate } from "../../types/cv.types";
import { defineProps } from "vue";

defineProps<{
  certificates: Certificate[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="lightbulb" class="section-icon" />
      Weiterbildung
    </h2>
    <div v-for="(dev, index) in certificates" :key="index" class="development-item">
      <h3>
        <strong>{{ dev.name }}</strong> – {{ dev.issuer }}
      </h3>
      <span class="period">{{ dev.date }}</span>
    </div>
  </section>
</template>

<style scoped>
.cv-section {
  margin: 0px auto;
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
  margin-bottom: 10px;
  page-break-inside: avoid;
  break-inside: avoid;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    "title period"
    "description .";
}

.development-item:last-child {
  margin-bottom: 0;
}

.development-item h3 {
  grid-area: title;
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.development-item .period {
  grid-area: period;
  color: #777;
  font-size: 14px;
  white-space: nowrap;
  align-self: baseline;
}

@media print {
  .cv-section {
    box-shadow: none;
    page-break-inside: avoid;
    margin-top: 0px;
    margin-left: 1cm;
    margin-right: 1cm;
  }

  h2 {
    margin: 0 0 12px 0;
  }

  .development-item {
    page-break-inside: avoid;
    break-inside: avoid;
    margin-bottom: 10px;
  }
}
</style>
