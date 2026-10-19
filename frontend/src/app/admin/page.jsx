export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Dashboard Statistik
      </h1>
      <p className="text-slate-500 mb-8">
        Selamat datang di Panel Admin MNCo Juara Sukoharjo.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-600">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            Total Layanan
          </h3>
          <p className="text-4xl font-extrabold text-slate-900">4</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-green-500">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            Portofolio
          </h3>
          <p className="text-4xl font-extrabold text-slate-900">0</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">
            Insight Artikel
          </h3>
          <p className="text-4xl font-extrabold text-slate-900">0</p>
        </div>
      </div>
    </div>
  );
}
