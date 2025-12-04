import type { Resume } from "../types/resume.types";

export function getDefaultResume(): Resume {
  return {
    basics: {
      name: "",
      label: "",
      image: "",
      email: "",
      phone: "",
      url: "",
      summary: "",
      location: { address: "", city: "", countryCode: "", postalCode: "", region: "" },
      profiles: [],
    },
    work: [],
    volunteer: [],
    education: [],
    awards: [],
    certificates: [],
    publications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    projects: [],
  };
}
