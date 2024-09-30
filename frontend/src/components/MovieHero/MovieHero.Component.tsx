import { Link } from "@tanstack/react-router";
import React, { useEffect } from "react";

const MovieHero: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const cinemaPath: string = `/cinema/50`

  return (
    <>
      <div>
        {/* Mobile or tablet screen size */}
        <div className="lg:hidden w-full">
          <img
            src={`https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/joker-folie-a-deux-et00352820-1727168074.jpg`}
            alt="Cover Pic"
            className="rounded responsive-img my-2 py-2"
            style={{ width: "calc(100% - 2rem)" }}
          />
        </div>
        <div className="flex flex-col gap-3 lg:hidden">
          <div className="flex flex-col-reverse gap-3 px-4 my-3">
            <div className="text-black flex flex-col gap-2 md:px-4">
              <h4>4.2k rating</h4>
              <h4>Kannada, English, Hindi, Telugu, Tamil</h4>
              <h4>50 min | 20</h4>
            </div>
          </div>
          <div className="flex items-center gap-3 md:px-4 md:w-screen text-xl px-4">
            <button className="bg-red-500 w-full py-3 text-white font-semibold rounded-lg px-4">
              Rent ₹149
            </button>
            <button className="bg-red-600 w-full py-3 text-white font-semibold rounded-lg">
              Buy ₹599
            </button>
          </div>
        </div>

        {/* Large Screen Device */}
        <div
          className="relative hidden w-full lg:block"
          style={{ height: "30rem" }}
        >
          <div
            className="absolute z-10 w-full h-full"
            style={{ background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(72,16,16,1) 0%, rgba(13,59,44,0.9977) 49%, rgba(0,0,0,0.0005) 100%)" }}
          >
            <div className="absolute z-30 left-24 top-10 flex items-center gap-10">
              <div className="w-64 h-96">
                <img
                  src={`https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg`}
                  alt="Movie Poster"
                  className="w-full h-full rounded-lg"
                />
              </div>
              <div>
                <div className="flex flex-col gap-3 px-4 my-3">
                  <h1 className="text-5xl font-bold text-white font-poppins">Movie title</h1>
                  <div className="text-black flex flex-col gap-2 md:px-4">
                    <h4 className="font-semibold text-white font-poppins">4.2k rating</h4>
                    <h4 className="font-semibold text-white font-poppins">
                      Kannada, English, Hindi, Telegu, Tamil
                    </h4>
                    <h4 className="font-semibold text-white font-poppins">
                      142 min | Gerne
                    </h4>
                  </div>
                  <Link to={cinemaPath}>
                    <div className="flex items-center gap-3 ">
                      <div className="flex justify-center items-center p-4">
                        <div id="page-cta-container" className="w-full max-w-xs">
                          <button className="bg-red-600 hover:bg-red-700 focus:outline-none rounded-lg py-3 px-6 w-full flex justify-center items-center">
                            <span className="font-medium text-lg text-white">Book tickets</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <img
              src={`https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/joker-folie-a-deux-et00352820-1727168074.jpg`}
              alt="Backdrop Poster"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieHero;
