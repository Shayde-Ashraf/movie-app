import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import TvDetails from "../../components/TvDetails/TvDetails";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

export default function Details() {
  const { id , type} = useParams();

  return (
    <>
      {type === "tv" && <TvDetails id={id} />}
      {type === "movie" && <MovieDetails id={id} />}
    </>
  );
}
