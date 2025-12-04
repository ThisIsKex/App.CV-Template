<script setup lang="ts">
import type { Skill } from "../../types/resume.types";
defineProps<{
  skills: Skill[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="code" class="section-icon" />
      Kenntnisse
    </h2>
    <div class="skills-container">
      <template v-for="skill in skills">
        <span v-for="(keyword, index) in skill.keywords" :key="index" class="skill-chip">
          {{ keyword }}
        </span>
      </template>
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

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-chip {
  display: inline-block;
  background-color: #e0e0e0;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 14px;
  color: #333;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
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
}
</style>
