import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin";
import TopbarAdmin from "../components/admin/TopbarAdmin";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen flex bg-[#F7F8FA] overflow-hidden">

            {/* ─── Sidebar ────────────────────────────── */}
            {/* En desktop: estático. En móvil: drawer overlay */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-40 w-[248px]
                    transform transition-transform duration-200 ease-in-out
                    lg:relative lg:translate-x-0 lg:shrink-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <SidebarAdmin onCloseMobile={() => setSidebarOpen(false)} />
            </aside>

            {/* ─── Overlay oscuro para móvil ──────────── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ─── Zona principal ─────────────────────── */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0 lg:ml-0">

                <TopbarAdmin onToggleSidebar={() => setSidebarOpen(prev => !prev)} />

                {/* min-h-0 es CLAVE: sin esto, en flex column el overflow no funciona */}
                <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6 lg:p-7">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}