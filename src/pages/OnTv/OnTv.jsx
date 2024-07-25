import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Loading from '../Loading/Loading';
import Card from '../../components/Card/Card';

export default function OnTv() {
  async function getOnTv() {
    const options = {
      url: "https://api.themoviedb.org/3/tv/on_the_air?language=all",
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
    queryKey: ["topRatedMovies"],
    queryFn: getOnTv,
  });
  console.log(data);
  if (isLoading) return <Loading />;
  return (
    <>
    <div className="flex flex-wrap gap-x-2 gap-y-5 max-w-7xl mx-auto">
      {data?.data?.results.map((tv) => (
        <Card type="tv" key={tv.id} details={tv} />
      ))}
    </div>
  </>
  )
}
