import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const Navigate = useNavigate();

  const handleLogin = () => {
    Navigate("/login");
  };
  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-xl text-grey font-semibold">
          <span className=" text-red-500 font-bold">You </span>
          Tube
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogin}
            className="text-white font-medium px-4 py-2 rounded-md bg-red-500"
          >
            Login
          </button>
          <button
            onClick={handleLogin}
            className="text-red-500 font-medium px-4 py-2 rounded-md border border-red-500 bg-white"
          >
            Signup
          </button>
        </div>
      </nav>
      {/* hero section */}
      <section
        id="intro"
        className="flex flex-col md:flex-row items-center md:justify-between p-8 md:py-12 bg-gray-100"
      >
        <div id="intro-info" className="md:w-1/2 mb-8 md:mb-0">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Live Streaming is Popular for Events, Gaming, Q&A Sessions & More
            </h1>
            <br />
            <div id="intro-tag-btn">
              <span className="text-gray-600 block text-2xl md:text-2xl font-bold mb-4">
                Over 100M Users & across 1500+ Videos.
              </span>
              <br />
              <a
                onClick={handleLogin}
                className="brand-btn bg-red-500 border-2 border-red-500 text-white py-2 px-4 rounded-md text-lg md:text-xl transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
              >
                Start Your Experience
              </a>
            </div>
          </div>
        </div>

        <div id="development-img" className="md:w-1/2 text-right">
          <img
            src="https://www.dropbox.com/s/7hwnjccu15vt90e/mobileDevlopment.svg?raw=1"
            className="w-full h-auto md:h-100 object-cover"
          />
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <section id="delivery" className="bg-white">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="text-gray sec-heading text-center md:text-center lg:text-left text-2xl md:text-4xl font-semibold my-8 md:my-12">
            <span className="text-red-500 font-semibold"> YouTube </span>
            Provides User-Generated Content, Including Video Clips
          </div>
          <br />
          <br />
          <div className="flex flex-col md:flex-row items-center">
            <div className="col-5 md:w-1/2 delivery-img">
              <img
                src="https://www.dropbox.com/s/ipx91osglyczpdt/delivery_experience.svg?raw=1"
                className="w-100 h-72 md:h-100 object-cover"
              />
            </div>
            <br />
            <div className="col-7 md:w-1/2 text-center md:text-left">
              <h2 className="font-semibold text-2xl md:text-3xl mb-4">
                <span className="text-red-500 font-semibold"> YouTube </span>is
                a popular video-sharing platform where users can upload, share,
                and view videos.
              </h2>

              <p className="mb-6">
                YouTube primarily hosts user-generated content, including video
                clips, music videos, educational content, and more. Users can
                create channels to upload and organize their videos.
                <br />
                <br />
                YouTube features a wide range of content, including vlogs,
                tutorials, music videos, movie trailers, gaming videos, and
                more. The platform caters to diverse interests and serves as a
                source of entertainment, education, and information.
                <br />
                <br />
                YouTube allows users to live stream content, enabling real-time
                interaction with viewers. Live streaming is popular for events,
                gaming, Q&A sessions, and more.
              </p>

              <div className="btn-footer">
                <a
                  onClick={handleLogin}
                  className="bg-red-500 border-2 border-red-500 text-white py-2 px-4 rounded-md text-lg md:text-xl transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
                >
                  Explore
                </a>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
      </section>

      {/* Pricing section */}
      <section className="box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24">
        <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
          <div className="flex flex-col items-center leading-7 text-center text-gray-900">
            <h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
              Pricing Options
            </h2>
            <p className="box-border mt-4 text-2xl leading-normal text-gray-900 border-solid">
              We've got a plan for Users of any size
            </p>
          </div>
          <div className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-red-500 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3">
            <div className="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Basic
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The basic plan is a good fit for small Users
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  $19
                </p>
                <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                  per user <span className="block">per month</span>
                </p>
              </div>

              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-red-500 no-underline bg-transparent border border-b-2 border-red-500 rounded-md cursor-pointer hover:bg-red-500 hover:border-red-500 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Select Plan
              </button>
            </div>
            <div className="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Plus
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The plus plan is a good fit for Medium Level Users
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  $39
                </p>
                <p className="box-border my-0 ml-4 mr-0 text-xs text-left border-0 border-gray-200">
                  per user <span className="block">per month</span>
                </p>
              </div>
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-white no-underline bg-red-500 border-b-4 border-red-500 rounded cursor-pointer hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Select Plan
              </button>
            </div>
            <div className="box-border px-4 py-8 text-center bg-white border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                Pro
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                The pro plan is a good fit for larger and enterprise Users
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  $59
                </p>
                <p className="box-border my-0 ml-4 mr-0 text-xs text-center border-0 border-gray-200">
                  per user <span className="block">per month</span>
                </p>
              </div>
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center w-full py-3 mt-6 font-sans text-sm leading-none text-center text-red-500 no-underline bg-transparent border border-b-2 border-red-600 rounded cursor-pointer hover:bg-red-500 hover:border-red-600 hover:text-white sm:text-base sm:mt-8 md:text-lg"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="box-border py-8 leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid sm:py-12 md:py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="leading-none font-gray font-semibold text-5xl flex flex-col items-center">
            Features
          </h3>
          <br />
          <br />
          <div className="flex flex-wrap justify-around lg:justify-between">
            <div className="w-full max-w-sm mt-5 lg:w-1/3 lg:mt-0 bg-gray-100 rounded-md border border-red-500 shadow-lg p-12 lg:p-8 xl:p-12">
              <div className="mt-4 font-semibold text-2xl tracking-wide">
                Video Upload and Sharing
              </div>
              <br />
              <div className="text-sm">
                YouTube allows users to upload and share videos easily. Creators
                can upload videos on various topics, ranging from educational
                content and entertainment to vlogs and tutorials.
              </div>
            </div>

            <div className="w-full max-w-sm mt-5 lg:w-1/3 lg:mt-0 bg-white rounded-md border border-red-500 shadow-lg p-12 lg:p-8 xl:p-12">
              <div className="mt-4 font-semibold text-2xl tracking-wide">
                Content Discovery and Recommendation Algorithm
              </div>
              <br />
              <div className="text-sm">
                YouTube's recommendation algorithm plays a crucial role in
                keeping users engaged. The platform suggests videos based on a
                user's watch history, preferences, and trending topics.
              </div>
            </div>

            <div className="w-full max-w-sm mt-5 lg:w-1/3 lg:mt-0 bg-gray-100 rounded-md border border-red-500 shadow-lg p-12 lg:p-8 xl:p-12">
              <div className="mt-4 font-semibold text-2xl tracking-wide">
                YouTube Partner Program (YPP)
              </div>
              <br />
              <div className="text-sm">
                YouTube provides a platform for content creators to monetize
                their videos through various means, such as ads, channel
                memberships, Super Chat, and the merchandise shelf.
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section  */}
      <footer className="bg-red-500">
        <div className="container mx-auto px-4 lg:px-0 py-8">
          <div className="flex flex-col md:flex-col items-center">
            <div className="md:w-1/4 md:text-center mb-4 md:mb-0">
              <span className="logo text-white text-3xl font-semibold">
                YOU TUBE
              </span>
            </div>
          </div>
          <br />
          <br />
          <div id="copyright" className="text-center text-white">
            &copy; All Rights Reserved 2019-2023
          </div>

          <div id="owner" className="text-center text-white">
            <span>
              Designed by{""}
              <a className="text-white">Sanjai Kannan G</a>
            </span>
          </div>
        </div>
        <br />
      </footer>
    </>
  );
};

export default LandingPage;
