<script setup lang="ts">
import { Interest } from "../../types/cv.types";
import { defineProps } from "vue";
defineProps<{
  interests: Interest[];
}>();
</script>

<template>
  <section class="cv-section">
    <h2>
      <font-awesome-icon icon="heart" class="section-icon" />
      Interessen
    </h2>
    <p>{{ interests.map((x) => x.name).join(" - ") }}</p>
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
