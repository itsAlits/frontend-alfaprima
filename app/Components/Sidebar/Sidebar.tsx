"use client";
import {
  Home,
  UserRoundPen,
  BookOpen,
  GraduationCap,
  File,
  CirclePower,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  const [isActive, setIsActive] = useState("Beranda");
  const pathname = usePathname();

  const dataSidebar = [
    {
      title: "Beranda",
      link: "/Dashboard",
      icon: <Home className="size-4" />,
    },
    {
      title: "Profile",
      link: "/Dashboard/Profile",
      icon: <UserRoundPen className="size-4" />,
    },
    {
      title: "KRS",
      link: "/Dashboard/KRS",
      icon: <File className="size-4" />,
    },
    {
      title: "KHS",
      link: "/Dashboard/KHS",
      icon: <File className="size-4" />,
    },
    {
      title: "Daftar Matakuliah",
      link: "/Dashboard/DaftarMatakuliah",
      icon: <BookOpen className="size-4" />,
    },
    {
      title: "Daftar Mahasiswa",
      link: "/Dashboard/DaftarMahasiswa",
      icon: <GraduationCap className="size-4" />,
    },
    {
      title: "Daftar Dosen",
      link: "/Dashboard/DaftarDosen",
      icon: <GraduationCap className="size-4" />,
    },
  ];

  useEffect(() => {
    const pathToTitle: { [key: string]: string } = {
      "/Dashboard": "Beranda",
      "/Dashboard/Profile": "Profile",
      "/Dashboard/KRS": "KRS",
      "/Dashboard/KHS": "KHS",
      "/Dashboard/DaftarMatakuliah": "Daftar Matakuliah",
      "/Dashboard/DaftarMahasiswa": "Daftar Mahasiswa",
      "/Dashboard/DaftarDosen": "Daftar Dosen",
    };

    const activeTitle = pathToTitle[pathname] || "Beranda";
    setIsActive(activeTitle);
  }, [pathname]);

  return (
    <div
      className={`bg-gray-800 text-white w-60 h-dvh fixed left-0 z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div id="sidebar" className="py-4 bg-[#084279] text-center">
        <h1>SI Alfaprima</h1>
      </div>
      <div>
        <ul>
          {dataSidebar.map((item, index) => (
            <a key={index} href={item.link}>
              <li
                className={
                  isActive === item.title
                    ? "py-4 px-1 cursor-pointer border-l-2 bg-[#0b59a1] border-white"
                    : "py-4 px-1 cursor-pointer border-l-2 bg-gray-800 border-gray-800 hover:border-white hover:bg-gray-900"
                }
              >
                <span className="text-xs font-light ms-2 flex items-center gap-3">
                  {item.icon}
                  {item.title}
                </span>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
