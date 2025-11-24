<template>
  <section>
    <h2>Zertifikate</h2>
    <div v-for="(cert, idx) in modelValue.certificates" :key="idx" class="array-block">
      <input v-model="cert.name" placeholder="Zertifikat" />
      <input v-model="cert.issuer" placeholder="Aussteller" />
      <input v-model="cert.date" placeholder="Datum (MM/YYYY)" />
      <input v-model="cert.url" placeholder="URL" />
      <button @click="$emit('removeCertificate', idx)">Zertifikat entfernen</button>
    </div>
    <button @click="$emit('addCertificate')">Zertifikat hinzufügen</button>
  </section>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/cv.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addCertificate", "removeCertificate"]);
</script>
