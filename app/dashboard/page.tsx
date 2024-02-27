"use client";
import React, { useState } from "react";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
export default function Article() {
  const [id, setId] = useState(1);
  const [Post, setPost] = useState({
    id: 1,
    title: "",
    description: "",
  });
  function fetcher(url: string) {
    return axios
      .get(url, {
        headers: {
          //optional
          "Content-Type": "application/json",
          username: "admin",
          password: "admin",
        },
      })
      .then((res) => {
        console.log(res);
        setPost({
          id: res.data.id,
          title: res.data.title,
          description: res.data.body,
        });
        return res;
      });
  }
  const { isLoading, data, isValidating } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true, //revalidate on reconnecting internet
      keepPreviousData: true,
      // refreshInterval: 1000,
    }
  );

  return (
    <div className="m-4">
      <p className="text-xl">You have reached me</p>
      {/* //try this when you are not changing the state to which swr is dependent i.e i{id state var in this case} */}
      {/* {isValidating ? (  
        <div className="flex m-12 text-xl text-gray-700 "> Validating...</div>
      ): null } */}
      {isLoading ? (
        <div className="flex m-12 text-xl text-gray-700 "> Loading...</div>
      ) : (
        <div>
          <button
            className="rounded-md bg-blue-400 p-2 m-4 mt-12 text-gray-700"
            onClick={() => setId((prev) => prev + 1)}
          >
            Next Post
          </button>
          <button
            className={`rounded-md bg-blue-400 p-2 m-4 mt-12 text-gray-700  ${
              id <= 1 ? "cursor-not-allowed" : ""
            }`}
            onClick={() => setId((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            Prev Post
          </button>
          <div className="m-4 bg-gray-200 rounded-xl p-6 overflow-scroll md:max-w-72">
            <h1 className="text-gray-500 my-2">
              Current Post: <span className="text-blue-600">{Post.id}</span>
            </h1>
            <h2 className="text-gray-500 ">
              Title: <span className="text-blue-600">{Post.title}</span>
            </h2>
            <h2 className="text-gray-500 my-2">Description:</h2>{" "}
            <p className="text-blue-600">{Post.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
