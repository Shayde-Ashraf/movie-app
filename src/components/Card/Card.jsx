import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Card({ details ,type}) {
  const[watchlist,setWatchlist]=useState(null)
  const {
    id,
    title,
    poster_path,
    vote_average,
    release_date,
    vote_count,
    name,
    first_air_date,
    media_type,
  } = details;
  
async function addToWatchlist({id,type}){
  let toastId
  try {
      const options = {
    url:'https://api.themoviedb.org/3/account/21302787/watchlist',
    method: 'POST',
    data:JSON.stringify({
      media_type:type,
      media_id:id,
      watchlist:true
    }),
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTczNjE1OC43MjEyNTcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sf03HB6S9lIs8ta7gMfpB9BfgiPBEEg3UuJmHYTCE8Y'
    }
  };
  toast.loading('waiting....')
  const {data}=await axios.request(options)
  console.log(data);
  setWatchlist(data)
  toast.dismiss(toastId)
  toast.success('Added To Watchlist')
  } catch (error) {
    console.log(error);
  }

}

  return (
    <>
      <div className="w-5/12 md:w-2/12 mx-auto min-h-fit bg-white border hover:shadow-lg hover:shadow-amber-300 border-gray-200 rounded-lg">
        <Link to={`/details/${type}/${id}`}>
          <div>
            <img
              className="md:w-full md:h-80 rounded-t-lg"
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt="product image"
            />
          </div>
        </Link>
        <div className="px-5 pb-1">
          <h5 className="text-lg text-center truncate font-semibold tracking-tight text-gray-900 dark:text-white">
            <Link to={`/details/${id}`}>{title || name}</Link>
          </h5>
          <div className="flex items-center justify-center">
            {media_type ? (
              <p className="text-center text-xs uppercase bg-gray-200 text-gray-700 rounded-full max-w-max px-3 py-1">
                {media_type}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <span className="text-xs font-semibold rounded dark:bg-blue-200">
                {vote_average}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span>{vote_count}</span>
              <i className="fa-solid fa-user-large"></i>
            </div>
          </div>
          <p className="text-sm font-semibold text-neutral-600">
          {release_date|| first_air_date&&
                  format(new Date(release_date||first_air_date), "MMMM,yyyy")}
              
          </p>
        </div>
        <div className="flex items-center justify-center py-3">
          <button onClick={()=>addToWatchlist({id,type})} className="flex text-sm bg-slate-800 rounded-lg text-white items-center justify-center gap-1 px-8 py-2">
            Watch Later
            <i className="fa-solid text-md text-white pt-1 fa-clock"></i>
          </button>
        </div>
      </div>
    </>
  );
}
