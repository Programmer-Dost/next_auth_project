"use client";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
function page() {
  const [loggedIn, setLoggedIn] = useState("");
  type formData = {
    username: string;
    password: string;
  };
  const formSchema: ZodType<formData> = z.object({
    username: z.string().email(),
    password: z.string().min(5).max(20),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(formSchema) });
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => {  
      redirect("/api/auth/signin?callbackUrl=/dashboard");
    },
  });
  if (status === "authenticated") {
    //do something
    // console.log(data, "sign in");
  }

  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  const login = (data: formData) => {
    axios
      .post("/api/signin", {
        body: data,
      })
      .then((res) => {
        // console.log(res);
        signIn("credentials", {
          username: data.username,
          password: data.password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
        setLoggedIn("Successfully logged in")
      });
  };
  const GithubLogin = () => {
    signIn("github", {
      callbackUrl: "/dashboard",
    });
  };
  return (
    <div className="m-4">
      {data?.user?.email ? `Logged In as ${data.user.email}` : "Log In"}
      <div className="flex flex-col p-6 ">
        <p className="text-gray-500 text-sm">Test Account: username: user@gmail.com, password:password</p>
        <form onSubmit={handleSubmit(login)} className="flex flex-col w-fit">
          <input
            type="email"
            placeholder="Enter your username"
            {...register("username", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                    value
                  ) || "Invalid Email Address",
              },
            })}
            className={`p-2 rounded-md ${
              errors.username?.message ? "mt-4" : "my-4"
            }`}
            // name="username"
            // value={formData.username}
            // onChange={(e) => handleChange(e)}
          />
          {errors.username && (
            <p className="text-red-500 my-1">{errors.username.message}</p>
          )}
          <input
            type="text"
            placeholder="Enter your Password"
            className="p-2 rounded-md"
            {...register("password", {
              required: true,
            })}
            // name="password"
            // value={formData.password}
            // onChange={(e) => handleChange(e)}
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className={`rounded-md bg-blue-400 p-2 my-4 mr-4  w-full text-gray-700 ${
              errors.username?.message ? "cursor-not-allowed " : ""
            }`}
          >
            Sign In
          </button>
          <p>{loggedIn}</p>
        </form>
      </div>
      <button
        className={`rounded-md bg-blue-400 p-2 m-4  text-gray-700`}
        onClick={() => signOut()}
      >
        Signout
      </button>
      <button
        className={`rounded-md bg-blue-400 p-2 m-4  text-gray-700`}
        onClick={() => GithubLogin()}
      >
        Github
      </button>
    </div>
  );
}

export default page;
