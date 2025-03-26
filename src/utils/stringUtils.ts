export const shouldEnableOtherInput = (text: string): boolean => {
  if (!text) return false;

  // Normalizar texto: convertir a minúsculas y eliminar tildes
  const normalizedText = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  // Evitar que se active para "No sé"
  if (normalizedText.includes("no se")) {
    return false;
  }

  // Permitir el input solo en casos de "Otro, ¿cuál?" o variantes
  return (
    normalizedText.includes("otro, cual") ||
    normalizedText.includes("otros motivos, cuales") ||
    normalizedText.includes("otro, ¿cual?")
  );
};
