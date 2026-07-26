function FixtureCard({ day, format, white, black }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-slate-400">{day}</p>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${format === "Rapid" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"}`}
        >
          {format.toUpperCase()}
        </span>
      </div>
      <h3 className="text-xl font-semibold">{white}</h3>
      <p className="text-center py-2 text-slate-400">vs</p>
      <h3 className="text-xl font-semibold">{black}</h3>
    </div>
  );
}

export default FixtureCard;
