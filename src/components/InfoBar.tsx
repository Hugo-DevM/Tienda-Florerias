export default function InfoBar() {
  return (
    <div
      style={{
        background: "#1A1614",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 py-2.5 flex items-center justify-center gap-6 flex-wrap"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <span className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          <ClockSvg />
          Lun–Sáb 9:00–19:00 · Dom 10:00–15:00
        </span>
        <span
          className="hidden sm:block w-px h-3"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />
        <span className="hidden sm:flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          <TruckSvg />
          Entrega el mismo día · pedidos antes de las 14:00
        </span>
        <span
          className="hidden md:block w-px h-3"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />
        <span className="hidden md:flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
          <LeafSvg />
          Frescura garantizada 5 días
        </span>
      </div>
    </div>
  );
}

function ClockSvg() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
  );
}

function TruckSvg() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  );
}

function LeafSvg() {
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5a4 4 0 014 4M12 6.5a4 4 0 00-4 4M12 6.5V3M8 10.5a4 4 0 004 4M8 10.5H4.5M16 10.5a4 4 0 01-4 4M16 10.5H19.5M12 14.5v3.5" />
    </svg>
  );
}
