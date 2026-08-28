export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl shadow-soft">
      <iframe
        title="Abu Salem Real Estate location — Al Sarouj, Al Ain"
        src="https://www.google.com/maps?q=Abu+Salem+Real+Estate,+Al+Sarouj,+Al+Ain,+UAE&output=embed"
        width="100%"
        height="420"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[320px] w-full sm:h-[420px]"
      />
    </div>
  );
}
