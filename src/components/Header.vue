<script setup lang="ts">
import type { PersonalInfo } from "../types/cv.types";

defineProps<{
  personalInfo: PersonalInfo;
}>();
</script>

<template>
  <header class="cv-header">
    <div class="header-content">
      <img
        v-if="personalInfo.profileImage"
        :src="personalInfo.profileImage"
        :alt="personalInfo.name"
        class="profile-image"
      />
      <div class="header-text">
        <h1>{{ personalInfo.name }}</h1>
        <p class="contact-info">
          <span>
            <font-awesome-icon icon="map-marker-alt" />
            {{ personalInfo.location }}
          </span>
          <span>
            <font-awesome-icon icon="phone" />
            {{ personalInfo.phone }}
          </span>
          <span>
            <font-awesome-icon icon="envelope" />
            {{ personalInfo.email }}
          </span>
        </p>
        <p class="social-links" v-if="personalInfo.github || personalInfo.linkedin">
          <a v-if="personalInfo.github" :href="personalInfo.github" target="_blank">
            <font-awesome-icon :icon="['fab', 'github']" />
            Github
          </a>
          <span v-if="personalInfo.github && personalInfo.linkedin">|</span>
          <a v-if="personalInfo.linkedin" :href="personalInfo.linkedin" target="_blank">
            <font-awesome-icon :icon="['fab', 'linkedin']" />
            LinkedIn
          </a>
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
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 40px;
  flex-wrap: wrap;
  max-width: 900px;
  margin: 0 auto;
}

.profile-image {
  width: 120px;
  height: 120px;
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

.contact-info span {
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.social-links {
  margin: 10px 0 0 -10px;
  font-size: 14px;
}

.social-links a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.social-links a:hover {
  text-decoration: underline;
}

@media print {
  .cv-header {
    background-color: #0e5091 !important;
    color: white !important;
    padding: 20px 1.5cm;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box;
    text-align: left;
  }

  .header-content {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .profile-image {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    width: 80px;
    height: 80px;
    float: left;
    margin-right: 20px;
    margin-top: 5px;
  }

  .header-text {
    display: block;
    margin-left: 100px;
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

  .contact-info span {
    margin-right: 10px;
    white-space: nowrap;
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

@media (max-width: 750px) {
  .header-content {
    flex-direction: column;
    gap: 25px;
  }

  .header-text {
    text-align: center;
    min-width: 0;
  }
  
  .cv-header h1 {
    font-size: 2.1rem;
  }
}

@media (max-width: 600px) {
  .contact-info span {
    display: block;
    margin: 8px 0;
    justify-content: center;
  }
  
  .cv-header h1 {
    font-size: 1.9rem;
  }
}
</style>
