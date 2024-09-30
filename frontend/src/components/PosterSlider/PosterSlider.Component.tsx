import React from "react";
import Slider, { Settings } from "react-slick";
import Poster from "../Poster/Poster.Component";

interface PosterType {
  id: string;
  title: string;
  image: string;
  // Add other relevant fields here
}

interface PosterSliderProps {
  title: string;
  subtitle: string;
  posters: PosterType[];
  isDark?: boolean;
  config?: Settings; // Optional: Allows overriding default slider settings
}

const PosterSlider: React.FC<PosterSliderProps> = ({
  title,
  subtitle,
  posters,
  isDark = false,
  config,
}) => {
  const defaultSettings: Settings = {
    infinite: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,
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

  const settings: Settings = config ? { ...defaultSettings, ...config } : defaultSettings;

  return (
    <>
      <div className="flex flex-col items-start sm:ml-3 my-2">
        <h3
          className={`text-2xl font-bold ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h3>
        <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
          {subtitle}
        </p>
      </div>
      <Slider {...settings}>
        {posters.map((each, index) => (
          // @ts-ignore
          <Poster {...each} isDark={isDark} key={index} />
        ))}
      </Slider>
    </>
  );
};

export default PosterSlider;
