import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Card from '../../components/Card/Card';
import Loading from '../Loading/Loading';

export default function Home() {
 async function getAll(){
    const options = {
      url:'https://api.themoviedb.org/3/trending/all/day',
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTM5Mjk3NS4zMjA1MzcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uwx6N_4jcKNekDDqBShlO3RLPzFhuuC-TdyCcKDjFmw'
      }
    };
    return await axios.request(options)
  }
  const {data,isLoading}=useQuery({
    queryKey:['home'],
    queryFn:getAll
  })
  console.log(data?.data?.results);
  if(isLoading) return <Loading/>
  return (
    <>
     <div className='flex  flex-wrap gap-x-2 gap-y-5 max-w-7xl mx-auto'>
    {data?.data?.results.map((movie)=><Card type={movie.media_type} key={movie.id} details={movie}/>)}  
    </div>
    </>
  )
}

