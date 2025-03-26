import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-violet-700 border-solid"></div>
      <p className="text-lg text-gray-700 font-medium">Cargando datos, un momento por favor...</p>
    </div>
  );
};

export default Spinner;
