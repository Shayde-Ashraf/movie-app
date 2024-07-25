import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Loading from '../Loading/Loading';
import { useFormik } from 'formik';

export default function Search() {
    const formik=useFormik({
        initialValues:{
            query:''
        }
    })
    function getSearch(){
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTQ5NDEwMC43MzE2Miwic3ViIjoiNjY1Yjc1OWRkNDkzYWZiNTY4NTkzNGRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r1Haq9nWLhJs2m8e3WI-uRb9FHkoqOArHgV_bUe_0Ls'
            }
          };
          return await axios.request(options)
    }
    const{data,isLoading}=useQuery({
        queryKey:['search'],
        queryFn:getSearch
    })
    console.log(data);
    if(isLoading) return <Loading/>
  return (
    <div>Search</div>
  )
}
