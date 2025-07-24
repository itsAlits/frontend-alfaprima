"use client";

import { useState } from "react";
import Button from "@/app/Components/Button/Button";
import TextInput from "@/app/Components/Input/text";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Auth() {
  interface InputData {
    label: string;
    type: string;
    placeholder: string;
  }
  interface DataLogin {
    nim_nip: string;
    password: string;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [dataLogin, setDataLogin] = useState<DataLogin>({
    nim_nip: "",
    password: "",
  });

  const dataInput: InputData[] = [
    {
      label: "Username",
      type: "text",
      placeholder: "Enter Your Username",
    },
    {
      label: "Password",
      type: "password",
      placeholder: "Enter Your Password",
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login(dataLogin);
  };

  const handleInputChange = (field: keyof DataLogin, value: string) => {
    setDataLogin((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function Login(params: DataLogin) {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        params
      );
      localStorage.setItem("token", response.data.data.token);
      setDataLogin(response.data);
      toast.success(response.data.message);
      window.location.href = "/Dashboard";
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="grid h-full grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 col-span-12">
          <div className="h-full flex relative items-center justify-center p-8">
            <div className="w-full max-w-lg">
              {/* logo alfaprima */}
              <div id="LogoAlfaprima" className="absolute top-8 left-8">
                <img
                  src="https://www.alfaprima.id/images/logo/logo-alfa-prima-with-text.svg"
                  alt="Logo Alfaprima"
                  className="w-40 h-auto"
                />
              </div>
              {/* Credit alfaprima */}
              <div id="Credit" className="absolute bottom-8 left-8">
                <p className="text-sm text-gray-600">
                  © 2025 Alfaprima all rights reserved
                </p>
              </div>

              <div className="text-center mb-7">
                <h1 className="text-3xl font-semibold text-[#0b59a1] mb-1">
                  Welcome to SiPrima
                </h1>
              </div>

              {/* form */}
              <form className="space-y-3" onSubmit={handleSubmit}>
                <TextInput
                  label={dataInput[0].label}
                  type={dataInput[0].type}
                  placeholder={dataInput[0].placeholder}
                  value={dataLogin.nim_nip}
                  onChange={(value) => handleInputChange("nim_nip", value)}
                />
                <TextInput
                  label={dataInput[1].label}
                  type={dataInput[1].type}
                  placeholder={dataInput[1].placeholder}
                  value={dataLogin.password}
                  onChange={(value) => handleInputChange("password", value)}
                />
                <div className="mt-8">
                  <Button btnText="Login" isLoading={isLoading} />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 border-s border-base-200 h-full hidden lg:block">
          <div className="h-full">
            <img
              src="https://www.alfaprima.id/images/shared/cabang-alfaprima-denpasar.jpg"
              alt="gambar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}
