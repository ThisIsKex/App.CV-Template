<template>
  <section>
    <h2>Skills</h2>
    <div v-for="(skill, idx) in modelValue.skills" :key="idx" class="array-block">
      <input v-model="skill.name" placeholder="Skill-Gruppe (z.B. Programmiersprachen)" />
      <input v-model="skill.level" placeholder="Level (optional)" />
      <div v-if="skill.keywords">
        <h4>Stichworte</h4>
        <div v-for="(_, kidx) in skill.keywords" :key="kidx">
          <input v-model="skill.keywords[kidx]" placeholder="Stichwort" />
          <button @click="$emit('removeSkillKeyword', idx, kidx)">Entfernen</button>
        </div>
        <button @click="$emit('addSkillKeyword', idx)">Stichwort hinzufügen</button>
      </div>
      <button @click="$emit('removeSkill', idx)">Skill-Gruppe entfernen</button>
    </div>
    <button @click="$emit('addSkill')">Skill-Gruppe hinzufügen</button>
  </section>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { Resume } from "../../types/cv.types";
defineProps<{ modelValue: Resume }>();
const emit = defineEmits(["addSkill", "removeSkill", "addSkillKeyword", "removeSkillKeyword"]);
</script>
