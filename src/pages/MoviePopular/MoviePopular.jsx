import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../Loading/Loading";
import Card from "../../components/Card/Card";

export default function MoviePopular() {
  function getPopularMovies() {
    const options = {
      url: "https://api.themoviedb.org/3/movie/popular",
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTQ5NDEwMC43MzE2Miwic3ViIjoiNjY1Yjc1OWRkNDkzYWZiNTY4NTkzNGRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r1Haq9nWLhJs2m8e3WI-uRb9FHkoqOArHgV_bUe_0Ls",
      },
    };
    return axios.request(options);
  }
  const { data, isLoading } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: getPopularMovies,
  });

  console.log(data);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="flex flex-wrap gap-x-1 gap-y-5 max-w-7xl mx-auto">
        {data?.data?.results.map((movie) => (
          <Card type="movie" key={movie.id} details={movie} />
        ))}
      </div>
    </>
  );
}
