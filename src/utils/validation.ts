import type { Resume } from "../types/resume.types";

export function isValidResume(data: unknown): data is Resume {
  if (!data || typeof data !== "object") return false;

  const resume = data as Partial<Resume>;

  // Check required structure - basics is required
  if (!resume.basics || typeof resume.basics !== "object") return false;

  // Check that array fields are either arrays or undefined (not other types)
  const arrayFields: (keyof Resume)[] = [
    "work",
    "volunteer",
    "education",
    "awards",
    "certificates",
    "publications",
    "skills",
    "languages",
    "interests",
    "references",
    "projects",
  ];

  // All fields must either be an array or undefined
  const hasValidArrays = arrayFields.every((key) => {
    const value = resume[key];
    return value === undefined || Array.isArray(value);
  });

  return hasValidArrays;
}

export function validateJSON(text: string): { valid: boolean; data?: Resume; error?: string } {
  try {
    const data = JSON.parse(text);
    if (isValidResume(data)) {
      // Fill in missing array fields with empty arrays
      const completeData: Resume = {
        basics: data.basics,
        work: data.work || [],
        volunteer: data.volunteer || [],
        education: data.education || [],
        awards: data.awards || [],
        certificates: data.certificates || [],
        publications: data.publications || [],
        skills: data.skills || [],
        languages: data.languages || [],
        interests: data.interests || [],
        references: data.references || [],
        projects: data.projects || [],
      };
      return { valid: true, data: completeData };
    }
    return { valid: false, error: "Ungültiges Resume-Format: 'basics' ist erforderlich" };
  } catch (error) {
    return { valid: false, error: "Ungültiges JSON-Format: " + (error instanceof Error ? error.message : String(error)) };
  }
}
