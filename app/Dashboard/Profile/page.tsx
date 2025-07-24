"use client";
import EditProfile from "@/app/Section/Dashboard-Profile/EditProfile";
import Profile from "@/app/Section/Dashboard-Profile/Profile";

export default function page() {
  return (
    <main>
      <div className=" bg-white p-4 border-t-3 rounded border-[#084279]">
        <h1 className="text-lg ">Informasi Data User</h1>
        <Profile />
        <EditProfile />
      </div>
    </main>
  );
}
