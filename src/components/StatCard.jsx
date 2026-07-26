function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <p className="text-slate-400 text-sm">{title}</p>

      <h3 className="text-3xl font-bold mt-2">{value}</h3>
    </div>
  );
}

export default StatCard;
