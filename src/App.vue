<script setup lang="ts">
import ToastContainer from "./components/ToastContainer.vue";
</script>

<template>
  <ToastContainer />
  <RouterView />
</template>

<style>
:root {
  --color-primary: #0e5091;
  --color-primary-dark: #0a3a6e;
  --color-success: #28a745;
  --color-success-dark: #218838;
  --color-text-light: #777;
  --color-text-dark: #333;
  --color-background: #fafafa;
  --color-white: #ffffff;
  --color-error: #dc3545;
  --color-warning: #ffc107;

  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 3px 10px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 4px 12px rgba(0, 0, 0, 0.15);

  --border-radius: 8px;
  --border-radius-lg: 12px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: var(--color-background);
  color: var(--color-text-dark);
  line-height: 1.6;
}

.cv-app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.cv-footer {
  text-align: center;
  color: var(--color-text-light);
  padding: 20px;
  font-size: 13px;
  margin-top: 40px;
}

strong {
  font-weight: 600;
}

@media print {
  body {
    background: white;
    margin: 0 !important;
    padding: 0 !important;
  }

  .cv-app {
    padding-bottom: 0;
    margin: 0;
    padding: 0;
  }

  .cv-footer {
    margin-top: 20px;
  }
}

@page {
  margin: 0;
  size: A4;
}

/* Print-spezifische Styles */
@media print {
  .cv-section {
    page-break-inside: auto;
    margin-left: 1.5cm;
    margin-right: 1.5cm;
    margin-top: 0.5cm;
    margin-bottom: 0.5cm;
  }

  .experience-item,
  .education-item,
  .development-item,
  .project-item {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .experience-header,
  h3,
  h2 {
    page-break-after: avoid;
    break-after: avoid;
  }

  .cv-footer {
    margin-left: 1.5cm;
    margin-right: 1.5cm;
  }
}
</style>
