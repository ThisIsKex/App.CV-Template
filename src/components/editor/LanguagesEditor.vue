<template>
  <section>
    <h2>Sprachen</h2>
    <div v-for="(lang, idx) in modelValue.languages" :key="idx" class="array-block">
      <input v-model="lang.language" placeholder="Sprache" />
      <input v-model="lang.fluency" placeholder="Niveau (z.B. Muttersprache)" />
      <button @click="$emit('removeLanguage', idx)">Sprache entfernen</button>
    </div>
    <button @click="$emit('addLanguage')">Sprache hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/cv.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addLanguage", "removeLanguage"]);
</script>
