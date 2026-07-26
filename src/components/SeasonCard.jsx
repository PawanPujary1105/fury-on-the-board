function SeasonCard({ value }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <h3 className="text-xl font-semibold mb-3">Current Season</h3>
      <p className="text-2xl font-bold text-amber-400">{value}</p>
    </div>
  );
}

export default SeasonCard;
