import React from "react";
import { motion } from "framer-motion";

interface SurveyProgressBarProps {
  currentChapter: number;
  totalChapters: number;
  isFinalQuestionAnswered?: boolean;
  averageMinutesPerChapter?: number;
}

const SurveyProgressBar: React.FC<SurveyProgressBarProps> = ({
  currentChapter,
  totalChapters,
  isFinalQuestionAnswered = false,
  averageMinutesPerChapter = 2,
}) => {
  const effectiveChapter = isFinalQuestionAnswered
    ? totalChapters
    : currentChapter === totalChapters
    ? currentChapter - 1
    : currentChapter;

  const percentage = Math.floor((effectiveChapter / totalChapters) * 100);
  const remainingChapters = totalChapters - effectiveChapter;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4">
      <div className="mb-1 text-sm text-gray-700">
        Capítulo {Math.min(currentChapter, totalChapters)} de {totalChapters} – {percentage}% completado
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      <div className="mt-1 text-xs text-gray-500">
        {percentage === 100 ? (
          <span className="text-green-600 font-medium">
            ¡Último paso completado! Haz clic en <strong>Enviar y Finalizar</strong>.
          </span>
        ) : (
          `Aprox. ${remainingChapters * averageMinutesPerChapter} ${
            remainingChapters * averageMinutesPerChapter === 1 ? "minuto" : "minutos"
          } restantes`
        )}
      </div>
    </div>
  );
};

export default SurveyProgressBar;
