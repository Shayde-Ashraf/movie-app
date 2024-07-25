import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../pages/Loading/Loading";
import { format } from "date-fns";
import Slider from "react-slick";
import imageHolder from "../../assets/imageHolder.jpg"
export default function MovieDetails({ id }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  };
  
  async function getMovieDetails() {
    const options = {
      url: `https://api.themoviedb.org/3/movie/${id}`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTQ5NDEwMC43MzE2Miwic3ViIjoiNjY1Yjc1OWRkNDkzYWZiNTY4NTkzNGRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r1Haq9nWLhJs2m8e3WI-uRb9FHkoqOArHgV_bUe_0Ls",
      },
    };
    return await axios.request(options);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["moviedetails"],
    queryFn: getMovieDetails,
  });
  async function getMovieCast() {
    const options = {
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTQ5NDEwMC43MzE2Miwic3ViIjoiNjY1Yjc1OWRkNDkzYWZiNTY4NTkzNGRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r1Haq9nWLhJs2m8e3WI-uRb9FHkoqOArHgV_bUe_0Ls",
      },
    };
    return await axios.request(options);
  }
  const castData = useQuery({
    queryKey: ["moviecast"],
    queryFn: getMovieCast,
  });
  console.log(castData?.data?.data);
  console.log(data);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="md:max-w-6xl p-3 md:p-0 mb-5 mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="md:w-4/12">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.data.poster_path}`}
              className="w-full"
              alt=""
            />
          </div>
          <div className="md:w-8/12 text-center md:text-start text-white">
            <h2 className="text-2xl font-semibold ">
              {data.data?.title}
              <span className="pl-2 text-[20px] text-amber-400">
                ({" "}
                {data.data?.origin_country
                  .map((country) => country)
                  .join(" - ")}{" "}
                )
              </span>
            </h2>
            <p className="pt-3 text-lg">
              {data.data?.genres.map((category) => category.name).join(" , ")}
            </p>
            <p className="pt-4 text-lg">
              Release-Date :{" "}
              <span className="text-neutral-300">
                {data.data?.release_date &&
                  format(new Date(data.data.release_date), "dd - MMMM - yyyy")}
              </span>
            </p>
            <div className="flex md:justify-start justify-center items-center gap-10 pt-4">
              <div className="flex items-center gap-1 ">
                <span className=" text-lg font-semibold  rounded dark:bg-blue-200 ">
                  Rate :{" "}
                  <span className="font-normal text-[14px]">
                    {Math.floor(data.data?.vote_average * 10) / 10}
                  </span>
                </span>
                <svg
                  className="w-4 h-4   text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
              <p className="text-[18px] font-semibold">
                Rated by :{" "}
                <span className="font-normal text-[18px]">
                  {data.data?.vote_count}
                </span>
              </p>
            </div>
            <div>
              <div className="flex justify-center md:justify-start items-center pt-5 gap-5 cursor-pointer">
                <i className="fa-solid fa-list bg-yellow-400 p-3 rounded-lg"></i>
                <i className="fa-regular fa-heart bg-yellow-400 p-3 rounded-lg"></i>
                <i className="fa-regular fa-bookmark bg-yellow-400 p-3 rounded-lg"></i>
              </div>
            </div>
            <p className="pt-5 pb-3 text-lg text-neutral-500">
              {data?.data.tagline}
            </p>
            <p className="font-semibold text-2xl ">Overview :</p>
            <p className="pt-2 text-lg text-gray-500">{data?.data.overview}</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto md:pb-0 pb-12">
        <h2 className="text-amber-400 pl-5 text-2xl font-semibold pb-3">Movie Cast</h2>
        <Slider {...settings}>
          {castData?.data?.data?.cast.map((actor) => (
            <div key={actor.id} className="w-3/12 px-2 ">
              {actor?.profile_path == null ? (
                <img
                  src={imageHolder}
                  className="w-full object-cover h-64"
                />
              ) : (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  className="w-full h-64 object-cover"
                />
              )}
              <h2 className="text-white text-center truncate">{actor.name}</h2>
              <p className="text-white text-center">{actor.known_for_department} </p>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
