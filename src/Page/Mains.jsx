import React from "react";
import { useMusicContext } from "../Context/MusicContext";
import { usePlayerContext } from "../Context/PlayerContext";

import {
  LoadingSpinner,
  TrendingAlbums,
  Albums,
  SearchBar,
  TopCharts,
  TopPlaylists,
} from "../components";

const Mains = () => {
  const { homeData_loading: loading } = useMusicContext();
  const { side_menu_show } = usePlayerContext();
  if (loading) {
    return (
      <div className="text-2xl font-bold fixed inset-0 w-full h-full flex place-items-center justify-center bg-darkBlue -z-20 pr-32 max-md:pr-0 ">
        <LoadingSpinner size={80} />
      </div>
    );
  }
  return (
    <div
      className={
        "bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden " +
        (side_menu_show ? "mr-96 transition-all duration-300 ease-in" : "mr-0")
      }
    >
      <div className="pt-5 w-3/5 max-md:w-11/12">
        <SearchBar />
      </div>

      <section className="w-full mt-14 my-6 ">
        <h1 className="font-medium text-xl w-fit text-darkTitle my-4">
          Trending
        </h1>
        <TrendingAlbums />
      </section>
      <section className="w-full my-6">
        <h1 className="font-medium text-xl w-fit text-darkTitle my-4">
          Albums
        </h1>
        <Albums />
      </section>
      <section>
        <h1 className="font-medium text-xl w-fit text-darkTitle my-4">
          Top Charts
        </h1>
        <TopCharts />
      </section>
      <section>
        <h1 className="font-medium text-xl w-fit text-darkTitle my-4">
          Top Playlist
        </h1>
        <TopPlaylists />
      </section>
    </div>
  );
};

export default Mains;
