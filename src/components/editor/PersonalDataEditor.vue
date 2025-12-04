<template>
  <section>
    <h2>Persönliche Daten</h2>
    <input v-model="modelValue.basics.name" placeholder="Name" />
    <input v-model="modelValue.basics.label" placeholder="Berufsbezeichnung" />
    <input v-model="modelValue.basics.email" placeholder="E-Mail" />
    <input v-model="modelValue.basics.phone" placeholder="Telefon" />
    <input v-model="modelValue.basics.url" placeholder="Website" />
    <input v-model="modelValue.basics.image" placeholder="Profilbild-URL" />
    <textarea v-model="modelValue.basics.summary" placeholder="Kurzprofil"></textarea>
    <div v-if="modelValue.basics.location">
      <input v-model="modelValue.basics.location.address" placeholder="Adresse" />
      <input v-model="modelValue.basics.location.city" placeholder="Stadt" />
      <input v-model="modelValue.basics.location.region" placeholder="Region/Bundesland" />
      <input v-model="modelValue.basics.location.postalCode" placeholder="PLZ" />
      <input v-model="modelValue.basics.location.countryCode" placeholder="Ländercode (DE)" />
    </div>
    <div>
      <h3>Profile/Social Links</h3>
      <div
        v-if="modelValue.basics.profiles"
        v-for="(profile, idx) in modelValue.basics.profiles"
        :key="idx"
      >
        <input v-model="profile.network" placeholder="Netzwerk (z.B. GitHub)" />
        <input v-model="profile.username" placeholder="Username" />
        <input v-model="profile.url" placeholder="URL" />
        <button @click="$emit('removeProfile', idx)">Entfernen</button>
      </div>
      <button @click="$emit('addProfile')">Profil hinzufügen</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Resume } from "../../types/resume.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addProfile", "removeProfile"]);
</script>
