<template>
  <section>
    <h2>Bildung</h2>
    <div v-for="(edu, idx) in modelValue.education" :key="idx" class="array-block">
      <input v-model="edu.institution" placeholder="Institution" />
      <input v-model="edu.area" placeholder="Fachrichtung" />
      <input v-model="edu.studyType" placeholder="Abschluss" />
      <input v-model="edu.score" placeholder="Note/Score" />
      <input v-model="edu.startDate" placeholder="Start (MM/YYYY)" />
      <input v-model="edu.endDate" placeholder="Ende (MM/YYYY)" />
      <button @click="$emit('removeEducation', idx)">Bildung entfernen</button>
    </div>
    <button @click="$emit('addEducation')">Bildung hinzufügen</button>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addEducation", "removeEducation"]);
</script>
