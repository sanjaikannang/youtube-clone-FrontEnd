import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import NavBar from "./Auth/Navbar";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sanjaikannan-youtube-clone.onrender.com/video/get",
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setError("Invalid data format received from the server.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      {error ? (
        <div className="text-red-500 font-bold text-center mt-4">{error}</div>
      ) : (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-7">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
            {videos.map((video) => (
              <div key={video._id} className="bg-white">
                <div className="p-2">
                  <Link to={`/video/${video.videoId}`}>
                    <img
                      key={`thumbnail-${video._id}`}
                      className="w-full rounded-xl h-40 object-cover mb-4 hover:rounded-none transform hover:scale-105"
                      src={video.thumbnailUrl}
                      alt={`Thumbnail for ${video.title}`}
                    />
                  </Link>
                  <h3
                    className="text-xl font-bold text-gray-800 mt-2"
                    key={`title-${video._id}`}
                  >
                    {video.title}
                  </h3>
                  <br />
                  <div className="flex items-center text-gray-600">
                    <FaUserCircle className="text-xl mr-3" />
                    <p className="text-md">{video.channelName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
