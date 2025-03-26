"use client";

export default function TestPage() {
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      <h1 style={{ color: "#333" }}>Prueba de Accesibilidad</h1>

      <div style={{ backgroundColor: "orange", padding: "20px", marginTop: "20px" }}>
        <p>Esto es un test directo</p>
        <button
          onClick={() => alert("¡Desde test/page.tsx!")}
          style={{
            padding: "10px 20px",
            backgroundColor: "red",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "18px",
            border: "none",
            borderRadius: "6px",
          }}
        >
          TEST DIRECTO
        </button>
      </div>
    </div>
  );
}
