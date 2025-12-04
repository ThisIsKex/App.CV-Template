<template>
  <section>
    <h2>Publikationen</h2>
    <div v-for="(pub, idx) in modelValue.publications" :key="idx" class="array-block">
      <input v-model="pub.name" placeholder="Titel" />
      <input v-model="pub.publisher" placeholder="Verlag" />
      <input v-model="pub.releaseDate" placeholder="Datum (MM/YYYY)" />
      <input v-model="pub.url" placeholder="URL" />
      <input v-model="pub.summary" placeholder="Zusammenfassung" />
      <button @click="$emit('removePublication', idx)">Publikation entfernen</button>
    </div>
    <button @click="$emit('addPublication')">Publikation hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addPublication", "removePublication"]);
</script>
