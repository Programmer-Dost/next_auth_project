"use client";
import React, { ChangeEvent } from "react";
import { useState } from "react";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
function page() {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/api/auth/signin?callbackUrl=/dashboard");
    },
    
  });
  if(status==="authenticated") {
console.log(data, "sign up")
  }
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    console.log(formData);

    axios
      .post("/api/signup", {
        body: formData,
      })
      .then((res) => {
        console.log(res);
        signIn("credentials", {
          username: formData.username,
          password: formData.password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
        localStorage.setItem("ProjectToken", res.data.token);
      });
  };
const GithubLogin= ()=>{
  signIn("github",{
    callbackUrl: '/dashboard',
  });
}
  return (
    <div className="m-4">
      Login {data?.user?.email}
      <div className="flex flex-col w-fit p-6 ">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => handleChange(e)}
          className="my-4 p-2 rounded-md"
        />
        <input
          type="text"
          name="password"
          placeholder="Enter your Password"
          value={formData.password}
          className=" p-2 rounded-md"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`rounded-md bg-blue-400 p-2 m-4 text-gray-700`}
      >
        Sign In
      </button>
      <button
        className={`rounded-md bg-blue-400 p-2 m-4  text-gray-700`}
        onClick={() => signOut()}
      >
        Signout
      </button>
      <button
        className={`rounded-md bg-blue-400 p-2 m-4  text-gray-700`}
        onClick={()=>GithubLogin()}
      >
        Github
      </button>
    </div>
  );
}

export default page;
