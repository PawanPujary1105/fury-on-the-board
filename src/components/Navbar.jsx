import { NavLink } from "react-router-dom";

function Navbar() {
  const menuClass = "px-3 py-2 rounded-md transition";
  const activeClass = "bg-amber-500 text-black";
  const inactiveClass = "text-white hover:bg-slate-800";
  return (
    <nav className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-amber-400">
            ♟️ Fury On The Board
          </h1>
          <p className="text-xs text-slate-500 text-right"> Chess Rampage </p>
        </div>

        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/players"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Players
          </NavLink>
          <NavLink
            to="/fixtures"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Fixtures
          </NavLink>
          <NavLink
            to="/results"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Results
          </NavLink>
          <NavLink
            to="/leaderboard"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            Leaderboard
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `${menuClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
