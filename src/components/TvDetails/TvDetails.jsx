import { format } from "date-fns";
import seasonImage from "../../assets/season.jpg";
import imageHolder from "../../assets/imageHolder.jpg"
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../pages/Loading/Loading";
import Slider from "react-slick";
export default function TvDetails({ id }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows:false,
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
          slidesToScroll: 1
        }
      }
    ]
  };
  const setting = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows:false,
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
  async function getTvDetails() {
    const options = {
      url: `https://api.themoviedb.org/3/tv/${id}`,
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
    queryKey: ["tvdetails"],
    queryFn: getTvDetails,
  });
  console.log(data);
  async function getTvCast() {
    const options = {
      url: `https://api.themoviedb.org/3/tv/${id}/credits`,
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
    queryKey: ["tvcast"],
    queryFn: getTvCast,
  });
  console.log(castData?.data?.data);
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="max-w-6xl p-3 md:p-0  mx-auto">
        <div className="flex flex-col md:flex-row gap-8 justify-between">
          <div className="md:w-4/12 ">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data?.data.poster_path}`}
              className="w-full"
              alt=""
            />
          </div>
          <div className="md:w-8/12 md:text-start text-center text-white">
            <h2 className="text-2xl font-semibold ">
              {data.data?.name}
              <span className="text-amber-400">
                ( {data.data?.origin_country} )
              </span>
            </h2>
            <p className="pt-3 text-lg">
              {data.data?.genres.map((category) => category.name).join(" , ")}
            </p>
            <p className="pt-2 text-lg">
              Published In :
              <span className="text-neutral-300">
                {data.data?.first_air_date &&
                  format(
                    new Date(data.data.first_air_date),
                    " dd - MMMM - yyyy"
                  )}
              </span>
            </p>
            <p className="pt-2 text-lg">
              Last Updated :
              <span className="text-neutral-300">
                {data.data?.last_air_date &&
                  format(
                    new Date(data.data.last_air_date),
                    " dd - MMMM - yyyy"
                  )}
              </span>
            </p>
            <div className="flex justify-center md:justify-start items-center gap-10 pt-3">
              <div className="flex items-center gap-1 ">
                <span className=" text-lg font-semibold  rounded dark:bg-blue-200 ">
                  Rate :{" "}
                  <span className="font-normal text-[14px]">
                    {" "}
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
            {data?.data?.overview ?<>
              <p className="font-semibold md:text-start text-start text-2xl ">Overview :</p>
              <p className="pt-2 text-lg text-gray-500">{data?.data.overview}</p></>:''}
           
            {data?.data.created_by?.length === 0 ? (
              ""
            ) : (
              <p className=" font-semibold md:text-start text-lg pt-3">
                Creator :
                <span className="pl-2 font-normal text-[16px] text-neutral-500">
                  {data.data?.created_by?.map((create) => create.name)}
                </span>
              </p>
            )}

          </div>
        </div>
        <h3 className="text-amber-400 text-2xl font-semibold  pt-5 pb-5  ">
              Seasons
            </h3>
            <div>
              <Slider {...settings}>
                {data?.data.seasons.map((season) => (
                  <div key={season.id} className="px-2">
                    <div className="bg-white w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <div>
                        {!season.poster_path ? (
                          <img
                            className="w-full h-64 object-contain rounded-t-lg"
                            src={seasonImage}
                            alt={season.name}
                          />
                        ) : (
                          <img
                            className="w-full h-64 object-cover rounded-t-lg"
                            src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                            alt={season.name}
                          />
                        )}
                      </div>
                      <div className="p-2">
                        <h5 className="text-lg font-semibold truncate tracking-tight text-gray-900 dark:text-white">
                          {season.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                          Episode <span className="font-bold">:</span> {season.episode_count}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
        <div className="max-w-7xl mx-auto">
        <h2 className="text-amber-400 pt-5 pb-5 text-2xl font-semibold ">Series Cast</h2>
        <Slider {...setting}>
          {castData?.data?.data?.cast.map((actor) => (
            <div key={actor.id} className="w-3/12 px-2 pb-10 md:pb-0">
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
      </div>
    </>
  );
}
