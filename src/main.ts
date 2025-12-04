import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

// Paged.js für Print
import "pagedjs";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faBriefcase,
  faGraduationCap,
  faCode,
  faGlobe,
  faLightbulb,
  faHeart,
  faPrint,
  faPen,
  faArrowLeft,
  faSave,
  faUpload,
  faDownload,
  faFileImport,
  faUser,
  faPlus,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Icons zur Library hinzufügen
library.add(
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faGithub,
  faLinkedin,
  faBriefcase,
  faGraduationCap,
  faCode,
  faGlobe,
  faLightbulb,
  faHeart,
  faPrint,
  faPen,
  faArrowLeft,
  faSave,
  faUpload,
  faDownload,
  faFileImport,
  faUser,
  faPlus,
  faTrash,
  faTimes,
);

const app = createApp(App);
const pinia = createPinia();

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.use(router);
app.mount("#app");
