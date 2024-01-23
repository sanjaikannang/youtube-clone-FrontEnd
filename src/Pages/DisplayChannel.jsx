import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Auth/Navbar";

const DisplayChannel = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const [channelDetails, setChannelDetails] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChannelDetails = async () => {
      try {
        if (!channelId) {
          throw new Error("Channel ID is undefined");
        }

        const response = await fetch(
          `https://sanjaikannan-youtube-clone.onrender.com/channel/get/${channelId}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setChannelDetails(data);

        // Check subscription status
        await checkSubscriptionStatus();
      } catch (error) {
        console.error("Error fetching channel details:", error);
        setError(`Error fetching channel details: ${error.message}`);
      }
    };

    fetchChannelDetails();
  }, [channelId]);

  const checkSubscriptionStatus = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/channel/check-subscription/${channelId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setIsSubscribed(data.subscribed);
    } catch (error) {
      console.error("Error checking subscription status:", error);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/channel/subscribe/${channelId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ channelId }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      setIsSubscribed(true);
    } catch (error) {
      console.error("Error subscribing to the channel:", error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/channel/unsubscribe/${channelId}`,
        {
          method: "POST",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      setIsSubscribed(false);
    } catch (error) {
      console.error("Error unsubscribing from the channel:", error);
    }
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  if (!channelId) {
    return (
      <div className="text-red-500 font-bold text-center mt-4">
        Channel ID is undefined
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <br />
      {error ? (
        <div className="text-red-500 font-bold text-center mt-4">{error}</div>
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <h2 className="text-3xl font-bold mb-4">{channelDetails.name}</h2>
          </div>

          <div className="text-lg flex justify-center">
            <p className="text-lg mb-4">{channelDetails.description}</p>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-lg">
              Subscribers: {channelDetails.subscribersCount}
            </p>
          </div>

          <div className="flex justify-center items-center mt-4">
            {isSubscribed ? (
              <button
                className="bg-red-500 border border-red-500 text-white py-2 px-4 rounded-full text-sm md:text-md transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
                onClick={handleUnsubscribe}
              >
                Unsubscribe
              </button>
            ) : (
              <button
                className="bg-green-500 border border-green-500 text-white py-2 px-4 rounded-full text-sm md:text-md transition duration-300 inline-block hover:bg-transparent hover:text-green-500"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            )}
          </div>
          <br />
          <br />
          <div className="section-line bg-red-500 h-1 mx-auto mb-6"></div>
          <br />

          {/* Display videos if available */}
          {channelDetails.videos && (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-3">
                {channelDetails.videos.map((video) => (
                  <div
                    key={video.id}
                    className="cursor-pointer"
                    onClick={() => handleVideoClick(video.id)}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full rounded-xl h-40 object-cover mb-4 hover:rounded-none transform hover:scale-105 cursor-pointer"
                    />
                    <h3 className="text-xl font-bold text-gray-800">
                      {video.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      <br />
      <br />
    </>
  );
};

export default DisplayChannel;
