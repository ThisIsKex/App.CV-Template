<template>
  <section>
    <h2>Interessen</h2>
    <div v-for="(interest, idx) in modelValue.interests" :key="idx" class="array-block">
      <input v-model="interest.name" placeholder="Interesse" />
      <div v-if="interest.keywords">
        <h4>Stichworte</h4>
        <div v-for="(_, kidx) in interest.keywords" :key="kidx">
          <input v-model="interest.keywords[kidx]" placeholder="Stichwort" />
          <button @click="$emit('removeInterestKeyword', idx, kidx)">Entfernen</button>
        </div>
        <button @click="$emit('addInterestKeyword', idx)">Stichwort hinzufügen</button>
      </div>
      <button @click="$emit('removeInterest', idx)">Interesse entfernen</button>
    </div>
    <button @click="$emit('addInterest')">Interesse hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits([
  "addInterest",
  "removeInterest",
  "addInterestKeyword",
  "removeInterestKeyword",
]);
</script>
