<template>
  <section>
    <h2>Berufserfahrung</h2>
    <div v-for="(job, idx) in modelValue.work" :key="idx" class="array-block">
      <input v-model="job.name" placeholder="Arbeitgeber" />
      <input v-model="job.position" placeholder="Position" />
      <input v-model="job.startDate" placeholder="Start (MM/YYYY)" />
      <input v-model="job.endDate" placeholder="Ende (MM/YYYY oder 'Heute')" />
      <input v-model="job.url" placeholder="URL" />
      <textarea v-model="job.summary" placeholder="Zusammenfassung"></textarea>
      <div v-if="job.highlights">
        <h4>Highlights</h4>
        <div v-for="(_, hidx) in job.highlights" :key="hidx">
          <input v-model="job.highlights[hidx]" placeholder="Highlight" />
          <button @click="$emit('removeWorkHighlight', idx, hidx)">Entfernen</button>
        </div>
        <button @click="$emit('addWorkHighlight', idx)">Highlight hinzufügen</button>
      </div>
      <button @click="$emit('removeWork', idx)">Erfahrung entfernen</button>
    </div>
    <button @click="$emit('addWork')">Erfahrung hinzufügen</button>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/cv.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addWork", "removeWork", "addWorkHighlight", "removeWorkHighlight"]);
</script>
