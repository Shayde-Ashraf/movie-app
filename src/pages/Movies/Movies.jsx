// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import Card from '../../components/Card/Card';
// import Loading from '../Loading/Loading';
// import Slider from "react-slick";
// import imageHolder from "../../assets/imageHolder.jpg"


// export default function Movies() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 4,
//   };
//   async function getMovies(){
    
//           const options = {
//       url:'https://api.themoviedb.org/3/discover/movie',
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTM5Mjk3NS4zMjA1MzcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Uwx6N_4jcKNekDDqBShlO3RLPzFhuuC-TdyCcKDjFmw'
//       }
//     };
//     return await axios.request(options)
//   }
// const {data,isLoading}=useQuery({
//   queryKey:["movies"],
//   queryFn:getMovies
// })
// async function getTopRated(){
//   const options = {
//     url:'https://api.themoviedb.org/3/movie/top_rated',
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTQ5NDEwMC43MzE2Miwic3ViIjoiNjY1Yjc1OWRkNDkzYWZiNTY4NTkzNGRjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r1Haq9nWLhJs2m8e3WI-uRb9FHkoqOArHgV_bUe_0Ls'
//     }
//   };
//   return await axios.request(options)
// }
// const topRated=useQuery({
//   queryFn:['topRatedMovies'],
//   queryFn:getTopRated
// })
// console.log(topRated?.data?.data?.results);
// console.log(data?.data?.results);
// if(isLoading)return <Loading/>
//   return (
//     <>
//          <div className="max-w-4xl mx-auto">
//         <Slider {...settings}>
//           {topRated?.data?.data?.results?.map((movie) => (
//             <div key={movie.id} className="w-3/12 px-2 ">
//               {movie?.poster_path == null ? (
//                 <img
//                   src={imageHolder}
//                   className="w-full object-cover h-64"
//                 />
//               ) : (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   className="w-full h-64 object-cover"
//                 />
//               )}
//               <h2 className="text-white text-center truncate">{movie.title}</h2>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     <div className='flex flex-wrap gap-x-2 gap-y-5 max-w-7xl mx-auto'>
//     {data?.data?.results.map((movie)=><Card type='movie' key={movie.id} details={movie}/>)}  
//     </div>
    
//     </>
//   )
// }
