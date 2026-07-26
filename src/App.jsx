import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Fixtures from "./pages/Fixtures";
import Leaderboard from "./pages/Leaderboard";
import History from "./pages/History";
import Results from "./pages/Results";
import PlayerDetails from "./pages/PlayerDetails";
import AdminHome from "./pages/admin/AdminHome";
import AdminPlayers from "./pages/admin/AdminPlayers";
import AdminGames from "./pages/admin/AdminGames";
import AdminSeasons from "./pages/admin/AdminSeasons";
import { db } from "./firebase";

function App() {
  console.log(db);
  return (
    <BrowserRouter basename="/fury-on-the-board">
      <div className="min-h-screen bg-slate-950 text-white">
        <Navbar />

        <main className="max-w-7xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/results" element={<Results />} />
            <Route path="/players/:playerName" element={<PlayerDetails />} />
            <Route path="/admin" element={<AdminHome />} />

            <Route path="/admin/players" element={<AdminPlayers />} />

            <Route path="/admin/games" element={<AdminGames />} />

            <Route path="/admin/seasons" element={<AdminSeasons />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
