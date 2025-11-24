<script setup lang="ts">
import type { Basics } from "../../types/resume.types";
import { defineProps } from "vue";
defineProps<{
  basics: Basics;
}>();
</script>

<template>
  <header class="cv-header">
    <div class="header-content">
      <img v-if="basics.image" :src="basics.image" :alt="basics.name" class="profile-image" />
      <div class="header-text">
        <h1>{{ basics.name }}</h1>
        <p class="location" v-if="basics.location">
          <font-awesome-icon icon="map-marker-alt" />
          {{ basics.location.address }}, {{ basics.location.city }}, {{ basics.location.region }},
          {{ basics.location.countryCode }}
        </p>
        <p class="contact-info">
          <a v-if="basics.phone" :href="`tel:${basics.phone}`">
            <font-awesome-icon icon="phone" />
            {{ basics.phone }}
          </a>
          <span v-if="basics.phone && basics.email">|</span>
          <a v-if="basics.email" :href="`mailto:${basics.email}`">
            <font-awesome-icon icon="envelope" />
            {{ basics.email }}
          </a>
        </p>
        <p class="social-links" v-if="basics.profiles">
          <a
            v-for="profile in basics.profiles"
            :key="profile.network"
            :href="profile.url"
            target="_blank"
          >
            <font-awesome-icon v-if="profile.icon" :icon="['fab', profile.icon]" />
            {{ profile.network }}
          </a>
          <!-- <a v-if="basics.github" :href="basics.github" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
            {{ basics.github.split('/').pop() }}
          </a>
          <span v-if="basics.github && basics.linkedin">|</span>
          <a v-if="basics.linkedin" :href="basics.linkedin" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            LinkedIn
          </a>
          <span v-if="basics.linkedin && basics.website">|</span>
          <a v-if="basics.website" :href="basics.website" target="_blank">
            <font-awesome-icon :icon="['fas', 'globe']" />
            Website
          </a> -->
        </p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cv-header {
  background-color: #0e5091;
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.header-content {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 30px;
  align-items: start;
  max-width: 900px;
  margin: 0 auto;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
}

.header-text {
  text-align: left;
  flex: 1;
  min-width: 0;
  overflow-wrap: break-word;
}

.cv-header h1 {
  margin: 0 0 12px 0;
  font-weight: 500;
  letter-spacing: 1px;
  font-size: 2.3rem;
  line-height: 1.1;
  word-wrap: break-word;
}

.contact-info {
  margin: 12px 0;
  font-size: 13px;
  line-height: 1.4;
}

.contact-info a {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.contact-info a:hover {
  text-decoration: underline;
}

.contact-info span {
  margin: 0 8px;
  display: inline-flex;
  align-items: center;
}

.location {
  margin: 8px 0;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.social-links {
  margin: 10px 0 0 0;
  font-size: 14px;
}

.social-links a {
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.social-links a:hover {
  text-decoration: underline;
}

.social-links span {
  margin: 0 8px;
  display: inline-flex;
  align-items: center;
}

@media print {
  .cv-header {
    background-color: #0e5091 !important;
    color: white !important;
    padding: 20px 1.5cm;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0 !important;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    text-align: center;
    break-after: avoid;
    page-break-after: avoid;
    display: flex;
    justify-content: center;
  }

  .header-content {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 20px;
    align-items: start;
    width: auto;
  }

  .profile-image {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid white;
    float: none;
    margin: 0;
  }

  .header-text {
    display: block;
    margin: 0;
    text-align: left;
    min-width: 0;
    padding-left: 15px;
  }

  .cv-header h1 {
    font-size: 1.8rem;
    line-height: 1.2;
    margin-bottom: 8px;
    word-wrap: break-word;
  }

  .contact-info {
    font-size: 11px;
    line-height: 1.3;
    margin: 6px 0;
  }

  .contact-info a {
    color: white !important;
    text-decoration: none;
  }

  .contact-info span {
    margin: 0 6px;
  }

  .location {
    font-size: 11px;
    margin: 4px 0 8px 0;
  }

  .social-links {
    font-size: 11px;
    margin-top: 6px;
  }

  .social-links a {
    color: white !important;
    margin-right: 10px;
  }
}
</style>
