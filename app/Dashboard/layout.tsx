"use client";

import { useState } from "react";
import "../globals.css";
import Nav from "../Components/Navbar/Nav";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body>
        <Sidebar isOpen={isSidebarOpen} />
        <Nav onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div
          className={`contentArea min-h-screen bg-[#f2f2f2] transition-all duration-300 pt-22 pe-4 ${
            isSidebarOpen ? "ps-64" : "ps-4"
          }`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
