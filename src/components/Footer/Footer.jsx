import React from 'react'
import logo from '../../assets/movieslogo.png'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
    

<footer className="bg-zinc-800 text-white shadow py-3 absolute left-0 right-0 bottom-0">
  <div className="w-full max-w-screen-xl mx-auto p-2 ">
    <div className="sm:flex sm:items-center sm:justify-between">
      <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-8" alt=" Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Movies App</span>
      </Link>
      <ul className="flex flex-wrap items-center mb-6 text-sm cursor-pointer font-medium  sm:mb-0 ">
        <li>
          <Link to='/' className="hover:underline me-4 md:me-6">Home</Link>
        </li>
        <li>
          <Link to='/moviepopular' className="hover:underline me-4 md:me-6">Movies</Link>
        </li>
        <li>
          <Link to='/tvpopular' className="hover:underline me-4 md:me-6">Tv</Link>
        </li>
        <li>
          <Link to='watchlist' className="hover:underline">WatchList</Link>
        </li>
      </ul>
    </div>
    <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 my-5" />
    <span className="block text-sm  sm:text-center dark:text-gray-400">© 2024 <a className="hover:underline">Movies App</a>. All Rights Reserved.</span>
  </div>
</footer>



    </>
  )
}
