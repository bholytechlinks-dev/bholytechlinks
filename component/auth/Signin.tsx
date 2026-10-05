"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import AddToast from "../heroui/AddToast";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { email, password } = formData;
      if (!email || !password) {
        return AddToast("All fields are required", "danger");
      }
      const request = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const response = await request.json();
      if (response.success) {
        AddToast(response.message as string, "success");
        return router.push("/admin");
      } else {
        return AddToast(response.message as string, "danger");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-row h-screen">
      <div className="w-[40%] bg-darkBlue rounded-tr-[4rem] rounded-br-[4rem] hidden md:flex flex-col justify-center items-center text-white gap-5">
        <h1 className="text-4xl font-bold">Welcome Back</h1>
        <div className="w-max flex flex-col">
          <p className="">To keep track of activities onsite</p>
          <p className="">login with your personal info</p>
        </div>
        <Link href={"/signup"} className="w-[40%] cursor-pointer rounded-full">
          <button className="w-full mx-auto h-12 mt-5 rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-darkBlue transition-all duration-500 ease-in-out cursor-pointer">
            SIGN UP
          </button>
        </Link>
      </div>
      <div className="md:w-[60%] w-full h-screen bg-white text-darkBlue flex flex-col gap-14 md:gap-8 md:justify-center justify-start items-center md:pt-0 pt-20">
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <div className="bg-darkBlue p-2  flex flex-col justify-center items-center rounded-md">
            <FaUser className="text-white text-6xl" />
          </div>
          <h1 className="text-2xl font-bold text-darkBlue">Login Account</h1>
          <p className="md:w-[50%] w-[95%] text-center">
            Use Your email to login an account, Note this page is strictly for
            admin
          </p>
        </div>

        <form
          onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => handleSubmit(e)}
          className="md:w-[70%] w-[95%] flex flex-col gap-5 justify-center items-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full h-12 rounded-md border-none bg-darkBlue/5 px-5"
            required
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 rounded-md border-none bg-darkBlue/5 pl-5 pr-12"
              required
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
            <div className="w-max h-max p-1.5 rounded-md absolute top-2.5 right-3">
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setShowPassword(false)}
                  className="text-darkBlue text-lg cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShowPassword(true)}
                  className="text-darkBlue text-lg cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col justify-center md:items-center items-end gap-2">
            {loading ? (
              <button
                type="button"
                className="md:w-[40%] w-full h-14 rounded-full bg-darkBlue/65 text-white mt-10 cursor-not-allowed"
              >
                PROCESSING...
              </button>
            ) : (
              <button
                type="submit"
                className="md:w-[40%] w-full h-14 rounded-full bg-darkBlue text-white mt-10 cursor-pointer"
              >
                SIGN IN
              </button>
            )}
            <p className="text-darkBlue text-sm md:hidden block mr-5">
              Dont have an account?{" "}
              <Link
                className="italic font-semibold underline underline-offset-2 text-blue-800"
                href={"/signup"}
              >
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
