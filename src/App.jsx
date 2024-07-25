import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Notfound from "./pages/Notfound/Notfound";
import Watchlist from "./pages/Watchlist/Watchlist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./pages/Details/Details";
import Popular from "./pages/MoviePopular/MoviePopular";
import NowPlaying from "./pages/NowPlaying/NowPlaying";
import UpComing from "./pages/UpComing/UpComing";
import TopRated from "./pages/MovieTopRated/MovieTopRated";
import TvPopular from "./pages/TvPopular/TvPopular";
import AiringToday from "./pages/AiringToday/AiringToday";
import OnTv from "./pages/OnTv/OnTv";
import TvTopRated from "./pages/TvTopRated/TvTopRated";
import MoviePopular from "./pages/MoviePopular/MoviePopular";
import { Toaster } from "react-hot-toast";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  const query = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/moviepopular", element: <MoviePopular /> },
        { path: "/nowplaying", element: <NowPlaying /> },
        { path: "/upcoming", element: <UpComing /> },
        { path: "/movietoprated", element: <TopRated /> },
        { path: "/tvpopular", element: <TvPopular /> },
        { path: "/airingtoday", element: <AiringToday /> },
        { path: "/ontv", element: <OnTv /> },
        { path: "/tvtoprated", element: <TvTopRated /> },
        { path: "/watchlist", element: <Watchlist /> },
        { path: "*", element: <Notfound /> },
        { path: "/details/:type/:id", element: <Details /> },
        { path: "/search", element: <SearchResult /> },
        {path:'/movie-app',element:<Home/>}
      ],
    },
  ]);
  return (
    <>
      <QueryClientProvider client={query}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster position="bottom-center" />
      </QueryClientProvider>
    </>
  );
}

export default App;
