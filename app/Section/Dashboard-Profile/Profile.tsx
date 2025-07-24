"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  interface ProfileData {
    name: string;
    email: string;
    nim_nip: string;
    phone_number: string;
    address: string;
    birth_date: string;
    gender: string;
    religion: string;
    profile_picture: string;
  }

  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setProfileData(response.data.data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
  return (
    <div className="mt-8">
      <div className="block lg:flex gap-4">
        <div className="h-45 mb-4 lg:mb-0 rounded overflow-hidden">
          <img
            src={
              profileData?.profile_picture ||
              "https://floridasnursing.gov/wp-content/plugins/wp-team-pro/src/Frontend/img/Placeholder-Image.png"
            }
            alt="Userprofile"
            className="h-full object-cover"
          />
        </div>
        <div className="border border-t-3 border-t-[#084279] border-base-300 rounded h-fit w-full p-4">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div>
                <h1 className="text-sm font-medium">Nama</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.name || "Nama User"}
                </h2>
              </div>
              <div>
                <h1 className="text-sm font-medium">Nim</h1>
                <h2 className="text-sm text-gray-600">
                  {" "}
                  {profileData?.nim_nip || "NIM/NIP User"}
                </h2>
              </div>
              <div>
                <h1 className="text-sm font-medium">Email</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.email || "Email User"}
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-sm font-medium">Phone Number</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.phone_number || "Phone Number User"}
                </h2>
              </div>
              <div>
                <h1 className="text-sm font-medium">Address</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.address || "Address User"}
                </h2>
              </div>
              <div>
                <h1 className="text-sm font-medium">Birth Date</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.birth_date.slice(0, 10) || "Birth Date User"}
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-sm font-medium">Gender</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.gender || "Gender User"}
                </h2>
              </div>
              <div>
                <h1 className="text-sm font-medium">Religion</h1>
                <h2 className="text-sm text-gray-600">
                  {profileData?.religion || "Religion User"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
