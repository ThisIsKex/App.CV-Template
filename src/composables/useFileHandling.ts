import { validateJSON } from "../utils/validation";
import type { Resume } from "../types/resume.types";

export function useFileHandling() {
  const downloadResume = (resume: Resume, filename = "cv-data.json") => {
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uploadResume = (file: File): Promise<Resume> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const validation = validateJSON(result);

        if (validation.valid && validation.data) {
          resolve(validation.data);
        } else {
          reject(new Error(validation.error || "Ungültige Datei"));
        }
      };
      reader.onerror = () => reject(new Error("Fehler beim Lesen der Datei"));
      reader.readAsText(file);
    });
  };

  return {
    downloadResume,
    uploadResume,
  };
}
