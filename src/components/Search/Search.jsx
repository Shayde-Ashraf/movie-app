import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function Search() {
  async function search(query) {
    console.log(query);
    if (query) {
      const options = {
        url: `https://api.themoviedb.org/3/search/multi?query=${query}`,
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTczNjE1OC43MjEyNTcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sf03HB6S9lIs8ta7gMfpB9BfgiPBEEg3UuJmHYTCE8Y",
        },
      };
      return await axios.request(options);
    }
  }
  const { data, isLoading } = useQuery({
    queryKey: ["search"],
    queryFn: search,
  });
  console.log(data);
  return (
    <>
      <input
        onKeyDown={(e) => search(e.target.value)}
        type="text"
        id="search-navbar"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
    </>
  );
}
