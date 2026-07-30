function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 px-8 py-6 rounded-lg flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-slate-600 border-t-amber-400 rounded-full animate-spin"></div>

        <p className="text-white font-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
