<template>
  <section>
    <h2>Persönliche Daten</h2>
    <input v-model="resume.basics.name" placeholder="Name" />
    <input v-model="resume.basics.label" placeholder="Berufsbezeichnung" />
    <input v-model="resume.basics.email" placeholder="E-Mail" />
    <input v-model="resume.basics.phone" placeholder="Telefon" />
    <input v-model="resume.basics.url" placeholder="Website" />
    <input v-model="resume.basics.image" placeholder="Profilbild-URL" />
    <textarea v-model="resume.basics.summary" placeholder="Kurzprofil"></textarea>
    <div v-if="resume.basics.location">
      <input v-model="resume.basics.location.address" placeholder="Adresse" />
      <input v-model="resume.basics.location.city" placeholder="Stadt" />
      <input v-model="resume.basics.location.region" placeholder="Region/Bundesland" />
      <input v-model="resume.basics.location.postalCode" placeholder="PLZ" />
      <input v-model="resume.basics.location.countryCode" placeholder="Ländercode (DE)" />
    </div>
    <div>
      <h3>Profile/Social Links</h3>
      <template v-if="resume.basics.profiles">
        <div v-for="(profile, idx) in resume.basics.profiles" :key="idx">
          <input v-model="profile.network" placeholder="Netzwerk (z.B. GitHub)" />
          <input v-model="profile.username" placeholder="Username" />
          <input v-model="profile.url" placeholder="URL" />
          <button @click="$emit('removeProfile', idx)">Entfernen</button>
        </div>
      </template>
      <button @click="$emit('addProfile')">Profil hinzufügen</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Resume } from "../../types/resume.types";

const props = defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["update:modelValue", "addProfile", "removeProfile"]);

const resume = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
