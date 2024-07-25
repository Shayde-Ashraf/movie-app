import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  async function getWatchlist() {
    setIsLoading(true);
    try {
      const movieOptions = {
        url: "https://api.themoviedb.org/3/account/21302787/watchlist/movies",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTczNjE1OC43MjEyNTcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sf03HB6S9lIs8ta7gMfpB9BfgiPBEEg3UuJmHYTCE8Y'
        },
      };

      const tvOptions = {
        url: "https://api.themoviedb.org/3/account/21302787/watchlist/tv",
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTczNjE1OC43MjEyNTcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sf03HB6S9lIs8ta7gMfpB9BfgiPBEEg3UuJmHYTCE8Y'
        },
      };

      const [movies, tvShows] = await Promise.all([
        axios.request(movieOptions),
        axios.request(tvOptions),
      ]);

      // Combine movies and TV shows into one array with media_type
      const combinedWatchlist = [
        ...movies.data.results.map((item) => ({ ...item, media_type: "movie" })),
        ...tvShows.data.results.map((item) => ({ ...item, media_type: "tv" })),
      ];

      setWatchlist(combinedWatchlist);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromWatchlist({ id, media_type }) {
    try {
      const options = {
        url: "https://api.themoviedb.org/3/account/21302787/watchlist",
        method: "POST",
        data: JSON.stringify({
          media_type,
          media_id: id,
          watchlist: false,
        }),
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjY5NGI0NTYxMmU0ZjgwNTAzODQyNDY0MGI5NmJjZSIsIm5iZiI6MTcyMTczNjE1OC43MjEyNTcsInN1YiI6IjY2NWI3NTlkZDQ5M2FmYjU2ODU5MzRkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sf03HB6S9lIs8ta7gMfpB9BfgiPBEEg3UuJmHYTCE8Y'
        },
      };

      const toastId = toast.loading("Waiting...");
      const { data } = await axios.request(options);
      getWatchlist();
      toast.dismiss(toastId);
      toast.success("Removed from watchlist");
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Failed to remove from watchlist");
    }
  }

  useEffect(() => {
    getWatchlist();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      {watchlist.length === 0 ? (
        <div className="text-white flex items-center justify-center flex-col p-8 bg-slate-600">
          <h2 className="text-2xl pb-8">No items in watchlist</h2>
          <Link
            to="/"
            className="p-3 bg-amber-300 rounded-xl text-slate-800 text-lg"
          >
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white pb-5 text-xl font-semibold">Watchlist</h2>
          <div className="flex flex-wrap  items-center md:justify-start justify-center gap-x-3 gap-y-5 md:max-w-7xl md:mx-auto">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="md:w-2/12 w-5/12  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg w-full"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-lg truncate text-center font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title || item.name}
                  </h5>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => removeFromWatchlist({ id: item.id, media_type: item.media_type })}
                      className="items-center w-3/4 px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
