import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-900">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/50"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 shadow">
          <button
            onClick={() => setOpen(true)}
            className="text-slate-900 font-bold"
          >
            ☰
          </button>
          <span className="font-semibold">
            Savannah Fitness Exchange
          </span>
        </header>

        {/* MAIN BACKGROUND LIVES HERE */}
        <main
          className="
            flex-1
            p-4 md:p-6
            bg-gradient-to-br
            from-orange-50 via-white to-white
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
