<template>
  <section>
    <h2>Projekte</h2>
    <div v-for="(proj, idx) in modelValue.projects" :key="idx" class="array-block">
      <input v-model="proj.name" placeholder="Projektname" />
      <input v-model="proj.url" placeholder="Projekt-URL" />
      <input v-model="proj.startDate" placeholder="Start (MM/YYYY)" />
      <input v-model="proj.endDate" placeholder="Ende (MM/YYYY)" />
      <textarea v-model="proj.description" placeholder="Beschreibung"></textarea>
      <div v-if="proj.highlights">
        <h4>Highlights</h4>
        <div v-for="(_, hidx) in proj.highlights" :key="hidx">
          <input v-model="proj.highlights[hidx]" placeholder="Highlight" />
          <button @click="$emit('removeProjectHighlight', idx, hidx)">Entfernen</button>
        </div>
        <button @click="$emit('addProjectHighlight', idx)">Highlight hinzufügen</button>
      </div>
      <div v-if="proj.keywords">
        <h4>Stichworte</h4>
        <div v-for="(_, kidx) in proj.keywords" :key="kidx">
          <input v-model="proj.keywords[kidx]" placeholder="Stichwort" />
          <button @click="$emit('removeProjectKeyword', idx, kidx)">Entfernen</button>
        </div>
        <button @click="$emit('addProjectKeyword', idx)">Stichwort hinzufügen</button>
      </div>
      <button @click="$emit('removeProject', idx)">Projekt entfernen</button>
    </div>
    <button @click="$emit('addProject')">Projekt hinzufügen</button>
  </section>
</template>

<script setup lang="ts">
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
defineEmits([
  "addProject",
  "removeProject",
  "addProjectHighlight",
  "removeProjectHighlight",
  "addProjectKeyword",
  "removeProjectKeyword",
]);
</script>
