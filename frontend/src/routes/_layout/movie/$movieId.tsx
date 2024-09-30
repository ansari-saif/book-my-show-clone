import { createFileRoute, useParams } from "@tanstack/react-router";
// @ts-ignore
import Loader from "../../../components/Loader/Loader";
import axios from "axios";
// @ts-ignore
import MovieHero from "../../../components/MovieHero/MovieHero.Component";
import { FaCcApplePay, FaCcVisa } from "react-icons/fa";
import Slider from "react-slick";
// @ts-ignore
import Cast from "../../../components/Cast/Cast.Component";
// @ts-ignore
import PosterSlider from "../../../components/PosterSlider/PosterSlider.Component";
import { useEffect, useState } from "react";


export const Route = createFileRoute("/_layout/movie/$movieId")({
  component: MovieDetail,
});

function MovieDetail() {
  const { movieId } = useParams({
    from: "/_layout/movie/$movieId",
  });
  const id = movieId;
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [
          castResponse,
          similarResponse,
          recommendedResponse,
          movieResponse,
        ] = await Promise.all([
          axios.get(`/movie/${id}/credits`),
          axios.get(`/movie/${id}/similar`),
          axios.get(`/movie/${id}/recommendations`),
          axios.get(`/movie/${id}`),
        ]);

        setCast(castResponse.data.cast);
        setSimilarMovies(similarResponse.data.results);
        setRecommendedMovies(recommendedResponse.data.results);

        // Simulate a minimum loading duration of 2 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    fetchData();
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
  }, [id]);


  const settingsCast = {
    arrows: true,
    slidesToShow: 4,
    infinite: true,
    dots: false,
    // speed: 500,
    slidesToScroll: 1,

    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settings = {
    arrows: true,
    slidesToShow: 3,
    infinite: true,
    dots: true,
    // speed: 500,
    slidesToScroll: 1,

    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieHero />
          <div className="my-12 container px-4 lg:ml-20 lg:w-2/1">
            <div className="flex flex-col items-start gap-3">
              <h1 className="text-gray-800 font-bold text-2xl">
                About the movie
              </h1>
              <p>test</p>
            </div>

            <div className="my-8">
              <hr />
            </div>

            <div className="my-8">
              <h2 className="text-gray-800 font-bold text-2xl mb-3">
                Applicable Offers
              </h2>
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md">
                  <div className="w-8 h-8">
                    <FaCcVisa className="w-full h-full" />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-gray-700 text-xl font-bold">
                      Visa Stream Offer
                    </h3>
                    <p className="text-gray-600">
                      Get 50% off up to INR 150 on all RuPay card* on BookMyShow
                      Stream.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md">
                  <div className="w-8 h-8">
                    <FaCcApplePay className="w-full h-full" />
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="text-gray-700 text-xl font-bold">
                      Film Pass
                    </h3>
                    <p className="text-gray-600">
                      Get 50% off up to INR 150 on all RuPay card* on BookMyShow
                      Stream.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8">
              <hr />
            </div>

            {/* Cast & Crew */}
            <div className="my-8">
              <h2 className="text-gray-800 font-bold text-2xl mb-4">
                Cast and Crew
              </h2>
              <Slider {...settingsCast}>
                {cast.map((castData) => (
                  <Cast
                  // @ts-ignore
                    key={castData.id}
                  // @ts-ignore
                    image={castData.profile_path}
                  // @ts-ignore
                    castName={castData.original_name}
                  // @ts-ignore
                    role={castData.character}
                  />
                ))}
              </Slider>
            </div>

            <div className="my-8">
              <hr />
            </div>

            <div className="my-8">
              <PosterSlider
                config={settings}
                title="Recommended Movies"
                posters={recommendedMovies}
                isDark={false}
              />
            </div>

            <div className="my-8">
              <hr />
            </div>

            {/* Movies */}
            <div className="my-8">
              <PosterSlider
                config={settings}
                title="BMS XCLUSICE"
                posters={similarMovies}
                isDark={false}
              />
            </div>

            <div className="my-8">
              <hr />
            </div>
          </div>
        </>
      )}
    </>
  );
}
