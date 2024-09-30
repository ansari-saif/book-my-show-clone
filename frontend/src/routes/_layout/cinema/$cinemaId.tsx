import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import Loader from "../../../components/Loader/Loader";


export const Route = createFileRoute("/_layout/cinema/$cinemaId")({
  component: MovieDetail,
});

function MovieDetail() {
  const { cinemaId } = useParams({
    from: "/_layout/cinema/$cinemaId",
  });
  const isLoading = false
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div aria-label={cinemaId} className="font-roboto antialiased text-base font-normal bg-transparent relative m-0 p-0 border-0">
            <nav
              id="navbar"
              className="navbar _absolute block m-0 p-0 border-0 text-base font-normal bg-transparent"
            >
              <div className="primary-nav bg-gray-100 border-b border-gray-200 p-0.5">
                <div className="header-inner mx-auto max-w-[1240px] p-0">
                  {/* Left Navigation */}
                  <div className="inner-nav left-nav float-left">
                    <ul className="flex list-none m-0 -mx-3">
                      {/* Primary Menu Items */}
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Movies
                        </Link>
                      </li>
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Stream
                        </Link>
                      </li>
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Events
                        </Link>
                      </li>
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Plays
                        </Link>
                      </li>
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Sports
                        </Link>
                      </li>
                      <li className="primary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-sm px-2.5 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Activities
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Right Navigation */}
                  <div className="inner-nav right-nav float-right">
                    <ul className="flex list-none m-0 -mx-3">
                      {/* Secondary Menu Items */}
                      <li className="secondary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-xs px-3 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          ListYourShow
                        </Link>
                      </li>
                      <li className="secondary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-xs px-3 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Corporates
                        </Link>
                      </li>
                      <li className="secondary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-xs px-3 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Offers
                        </Link>
                      </li>
                      <li className="secondary-menu m-0 p-0">
                        <Link
                          to="/"
                          className="nav-link menu-item block relative text-gray-800 text-xs px-3 py-3 transition duration-200 ease-in hover:text-gray-600"
                        >
                          Gift Cards
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
            <section className="movie-details inline-block bg-white text-left w-full box-border text-gray-500 z-30 relative">
              <div className="fix-height-div p-7 px-5 pb-4 border-b border-gray-300 overflow-hidden box-border relative w-full">
                <div className="top-section-container mx-auto p-0 border-0 relative min-w-[320px] max-w-[1280px] h-full">
                  <div className="movie-details-container z-10">
                    <div className="text-details relative box-border">
                      <meta itemProp="name" content="Joker: Folie a Deux - English" />
                      <h1 className="text-3xl font-bold mb-0 mt-2.5 w-full inline-block">
                        <div className="cinema-name-wrapper">
                          <Link
                            to="/"
                            className="text-gray-800 truncate max-w-[70%] float-left whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            Joker: Folie a Deux - English
                          </Link>
                        </div>
                      </h1>
                      <div className="__more-movie-data zoom-100">
                        <span className="__censor mr-4 w-6 h-6 float-left opacity-80">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="w-6 fill-gray-600 relative"
                            aria-hidden="true"
                          >
                            <use xlinkHref="/icons/common-icons.svg#icon-a" />
                          </svg>
                        </span>
                        <span className="heart-rating hidden float-left mt-[-0.75rem]">
                          <span className="heart-icon w-5 h-5 float-left mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 100 100"
                              className="fill-red-600"
                              aria-hidden="true"
                            >
                              <use xlinkHref="/icons/movies-icons.svg#icon-star" />
                            </svg>
                          </span>
                          <span className="__percent text-lg font-bold text-white ml-1.25 mt-0.75"></span>
                          <br />
                          <span className="__votes text-xs text-right"></span>
                        </span>
                        <span className="__tags mr-4 float-left">
                          <span className="__genre-tag px-2 py-0.5 border border-gray-600 text-xs font-normal uppercase rounded-full text-gray-600">
                            Drama
                          </span>
                          <span className="__genre-tag px-2 py-0.5 border border-gray-600 text-xs font-normal uppercase rounded-full text-gray-600 ml-1.25">
                            Suspense
                          </span>
                          <span className="__genre-tag px-2 py-0.5 border border-gray-600 text-xs font-normal uppercase rounded-full text-gray-600 ml-1.25">
                            Thriller
                          </span>
                          <span className="px-2 py-0.5 border border-gray-600 text-xs font-normal uppercase rounded-full text-gray-600 ml-1.25 hidden"></span>
                        </span>
                        <span
                          className="__release-date text-sm font-normal text-white mr-4 mt-1.25 float-left"
                          itemProp="datePublished"
                          content="1970-01-01"
                        >
                          <br />
                          <span className="__selected-language text-xs font-normal uppercase text-white mt-1.75 text-left pr-1.25 hidden">
                            HINDI
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Filter divs */}
              <div className="m-0 p-0 border-0 font-normal bg-white w-full">
                <div className="m-0 p-0 border-0 font-normal bg-white z-10 mt-0">
                  {/* Sticky Filter Title (Hidden) */}
                  <div className="sticky-filtertitle m-0 p-0 border-0 font-normal bg-transparent hidden">
                    {/* You can add content here if needed */}
                  </div>

                  {/* Filters Container */}
                  <div className="showtime-filters struktur mx-auto p-0 border-0 font-normal bg-transparent relative min-w-[320px] max-w-[1280px]">
                    <div className="dates-wrapper mt-[6px] mb-[6px] ml-[30px] inline-block float-left p-0 border-0 font-normal bg-transparent">
                      <ul
                        id="showDates"
                        className="dates-container slick-initialized slick-slider m-0 p-0 border-0 font-normal bg-transparent list-none relative block box-border select-none touch-pan-y tap-highlight-transparent max-w-[300px] w-[calc(100%-15px)]"
                      >
                        {/* Slider Track */}
                        <div
                          aria-live="polite"
                          className="slick-list draggable m-0 p-0 border-0 font-normal bg-transparent relative block overflow-hidden h-full"
                        >
                          <div
                            className="slick-track m-0 p-0 border-0 font-normal bg-transparent relative top-0 left-0 h-full block opacity-100"
                            style={{ transform: 'translate3d(-1px, 0, 0)', width: '25000px' }}
                          >
                            {/* Active Date Item */}
                            <li
                              className="date-details _active slick-slide slick-current slick-active m-0 mr-1 p-1 border-0 font-normal bg-transparent flex float-left h-full min-h-[1px] justify-center cursor-pointer bg-[#f84464] rounded-lg"
                              data-slick-index="0"
                              aria-hidden="false"
                            >
                              <Link
                                className="date-href m-0 p-0 text-base no-underline bg-transparent flex flex-col justify-center items-center w-[40px]"
                                to="/"
                                onClick={() => {
                                  // Handle Click
                                  // Replace with your actual click handler
                                }}
                              >
                                <div className="date-day m-0 p-0 text-xs font-medium uppercase text-white leading-3">
                                  Wed
                                </div>
                                <div className="date-numeric m-0 p-0 text-lg font-medium leading-4 text-white">
                                  02
                                </div>
                                <div className="date-month m-0 p-0 text-xs font-medium uppercase text-white leading-3">
                                  Oct
                                </div>
                              </Link>
                            </li>

                            {/* Inactive Date Items */}
                            <li
                              className="date-details slick-slide m-0 mr-1 p-1 border-0 font-normal bg-transparent flex float-left h-full min-h-[1px] justify-center cursor-pointer"
                              data-slick-index="1"
                              aria-hidden="true"
                            >
                              <Link
                                className="date-href m-0 p-0 text-base no-underline bg-transparent flex flex-col justify-center items-center w-[40px]"
                                to="/"
                                onClick={() => {
                                  // Handle Click
                                  // BMS.Misc.fnBusy(true);
                                }}
                              >
                                <div className="date-day m-0 p-0 text-xs font-normal uppercase text-gray-600 leading-3">
                                  Thu
                                </div>
                                <div className="date-numeric m-0 p-0 text-lg font-medium leading-4 text-gray-800">
                                  03
                                </div>
                                <div className="date-month m-0 p-0 text-xs font-normal uppercase text-gray-600 leading-3">
                                  Oct
                                </div>
                              </Link>
                            </li>

                            {/* Repeat similar <li> elements for additional dates */}
                            {/* Example for another date */}
                            <li
                              className="date-details slick-slide m-0 mr-1 p-1 border-0 font-normal bg-transparent flex float-left h-full min-h-[1px] justify-center cursor-pointer"
                              data-slick-index="2"
                              aria-hidden="true"
                            >
                              <Link
                                to="/"
                                href="https://in.bookmyshow.com/buytickets/joker-folie-a-deux-gurugram-gurgaon/movie-gurg-ET00352820-MT/20241004"
                              >
                                <div className="date-day m-0 p-0 text-xs font-normal uppercase text-gray-600 leading-3">
                                  Fri
                                </div>
                                <div className="date-numeric m-0 p-0 text-lg font-medium leading-4 text-gray-800">
                                  04
                                </div>
                                <div className="date-month m-0 p-0 text-xs font-normal uppercase text-gray-600 leading-3">
                                  Oct
                                </div>
                              </Link>
                            </li>
                          </div>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
}
