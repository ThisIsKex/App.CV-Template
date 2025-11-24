<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #fafafa;
  color: #333;
  line-height: 1.6;
}

.cv-app {
  min-height: 100vh;
  padding-bottom: 60px;
}

.cv-footer {
  text-align: center;
  color: #777;
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
