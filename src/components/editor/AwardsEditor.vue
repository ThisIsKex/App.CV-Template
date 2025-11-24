<template>
  <section>
    <h2>Auszeichnungen</h2>
    <div v-for="(award, idx) in modelValue.awards" :key="idx" class="array-block">
      <input v-model="award.title" placeholder="Titel" />
      <input v-model="award.awarder" placeholder="Verleiher" />
      <input v-model="award.date" placeholder="Datum (MM/YYYY)" />
      <input v-model="award.summary" placeholder="Zusammenfassung" />
      <button @click="$emit('removeAward', idx)">Auszeichnung entfernen</button>
    </div>
    <button @click="$emit('addAward')">Auszeichnung hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addAward", "removeAward"]);
</script>
