import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaTrashAlt, FaPen } from "react-icons/fa"; // Import FontAwesome icons
import CreateChannel from "./CreateChannel";
import Navbar from "./Auth/Navbar";

const MyProfile = () => {
  const [channelData, setChannelData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchChannelData = async () => {
    try {
      const response = await fetch(
        "https://sanjaikannan-youtube-clone.onrender.com/channel/current-user",
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 404) {
        // User doesn't have a channel, set channelData to an empty object
        setChannelData({});
      } else if (!response.ok) {
        // Handle other errors
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      } else {
        const data = await response.json();
        setChannelData(data);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
      setError(`Error fetching channel data: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchChannelData();
  }, []);

  const handleUploadVideo = () => {
    navigate("/upload-video");
  };

  const handleUpdateVideo = (videoId) => {
    navigate(`/update-video/${videoId}`);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/video/delete/${videoId}`,
        {
          method: "DELETE",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Video deleted successfully, update the state or re-fetch channel data
      // For simplicity, you can re-fetch the entire channel data
      fetchChannelData();
    } catch (error) {
      console.error("Error deleting video:", error);
      // Handle error, display an error message, etc.
    }
  };

  if (error) {
    return (
      <div className="text-red-500 font-bold text-center mt-4">{error}</div>
    );
  }

  if (
    !channelData ||
    (Object.keys(channelData).length === 0 &&
      channelData.constructor === Object)
  ) {
    return (
      <div>
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-7">
          <CreateChannel />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h3 className="flex text-4xl justify-center font-bold text-red-500">
          {channelData.name || "Channel Name"}
        </h3>
        <br />
        <p className="text-lg flex justify-center">
          {channelData.description || "Channel Description"}
        </p>
        <br />
        <p className="text-2xl font-semibold flex justify-center">
          Subscriber Count : {channelData.subscribersCount || 0}
        </p>
      </div>
      <br />
      <div className="flex flex-col items-center justify-center ">
        <div className="absolute flex justify-center">
          <button
            onClick={handleUploadVideo}
            className="bg-red-500 border-2 border-red-500 text-white py-2 px-4 rounded-md text-sm md:text-sm transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
          >
            Upload Video
          </button>
        </div>
      </div>
      <br />
      <br />
      <div className="section-line bg-red-500 h-1 mx-auto mb-6"></div>
      <br />
      <div className="text-xl font-bold mb-8 text-black flex justify-center">
        Your Uploaded Videos !
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
          {channelData.videos &&
            channelData.videos.map((video) => (
              <div key={video._id} className="bg-white ">
                <div className="p-2">
                  <img
                    className="w-full rounded-xl h-40 object-cover mb-4 hover:rounded-none transform hover:scale-105 cursor-pointer"
                    src={video.thumbnailUrl}
                    alt={video.title}
                    onClick={() => navigate(`/video/${video._id}`)}
                  />
                  <h3 className="text-xl font-bold text-gray-800">
                    {video.title}
                  </h3>
                  <br />
                  <div className="flex justify-end">
                    <div className="mr-4">
                      <FaTrashAlt
                        className="text-xl cursor-pointer text-red-500"
                        onClick={() => handleDeleteVideo(video._id)}
                      />
                    </div>
                    <div>
                      <FaPen
                        className="text-xl cursor-pointer text-blue-500"
                        onClick={() => handleUpdateVideo(video._id)}
                      />
                    </div>
                  </div>
                </div>
                <br />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
