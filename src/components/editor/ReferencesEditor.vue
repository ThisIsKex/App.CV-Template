<template>
  <section>
    <h2>Referenzen</h2>
    <div v-for="(ref, idx) in modelValue.references" :key="idx" class="array-block">
      <input v-model="ref.name" placeholder="Name" />
      <input v-model="ref.reference" placeholder="Referenztext" />
      <button @click="$emit('removeReference', idx)">Referenz entfernen</button>
    </div>
    <button @click="$emit('addReference')">Referenz hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/cv.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addReference", "removeReference"]);
</script>
