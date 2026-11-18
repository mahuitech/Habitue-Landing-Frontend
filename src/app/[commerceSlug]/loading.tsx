export default function Loading() {
  return <main className="loading-screen" aria-busy="true" aria-label="Cargando el club">
    <div className="loading-hero" /><div className="loading-circle" /><div className="loading-line" /><div className="loading-line" /><p role="status">Cargando tu club…</p>
  </main>;
}
