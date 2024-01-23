import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link
import Navbar from "./Auth/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faUser,
  faUserCircle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

const DisplayVideo = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState({});
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        if (!videoId) {
          throw new Error("Video ID is undefined");
        }

        const response = await fetch(
          `https://sanjaikannan-youtube-clone.onrender.com/video/get/${videoId}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setVideoDetails(data);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setError(`Error fetching video details: ${error.message}`);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const fetchVideoDetailsHandler = async () => {
    // Separate function to fetch video details
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/video/get/${videoId}`,
        {
          method: "GET",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setVideoDetails(data);
    } catch (error) {
      console.error("Error fetching video details:", error);
      setError(`Error fetching video details: ${error.message}`);
    }
  };

  const handleLike = async () => {
    try {
      if (!likeClicked) {
        setLikeClicked(true);
        const response = await fetch(
          `https://sanjaikannan-youtube-clone.onrender.com/video/like/${videoId}`,
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

        // Fetch updated video details after the like action
        fetchVideoDetailsHandler();
      }
    } catch (error) {
      console.error("Error liking the video:", error);
    }
  };

  const handleDislike = async () => {
    try {
      if (!dislikeClicked) {
        setDislikeClicked(true);
        const response = await fetch(
          `https://sanjaikannan-youtube-clone.onrender.com/video/dislike/${videoId}`,
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

        // Fetch updated video details after the dislike action
        fetchVideoDetailsHandler();
      }
    } catch (error) {
      console.error("Error disliking the video:", error);
    }
  };

  const handleComment = async () => {
    try {
      const response = await fetch(
        `https://sanjaikannan-youtube-clone.onrender.com/video/comment/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ text: newComment }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Fetch updated video details after posting a comment
      fetchVideoDetailsHandler();

      // Clear the comment input field
      setNewComment("");
    } catch (error) {
      console.error("Error posting the comment:", error);
    }
  };

  if (!videoId) {
    return (
      <div className="text-red-500 font-bold text-center mt-4">
        Video ID is undefined
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar />
        {error ? (
          <div className="text-red-500 font-bold text-center mt-4">{error}</div>
        ) : (
          <div>
            {videoDetails.url && (
              <div className="flex justify-center items-center h-screen">
                <video
                  style={{ height: "500px", width: "1000px" }}
                  className="rounded-lg border border-b-4 border-red-500"
                  controls
                >
                  <source src={videoDetails.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="flex justify-center items-center">
              <h2 className="text-3xl font-bold mb-4">{videoDetails.title}</h2>
            </div>

            <div className="flex justify-center items-center">
              <div
                style={{ height: "70px", width: "1000px" }}
                className="flex justify-between items-center rounded-full px-4 py-2 bg-gray-100"
              >
                <div className="flex items-center">
                  {/* Use Link to navigate to the channel with the channel ID */}
                  <Link to={`/display-channel/${videoDetails.channelId}`}>
                    <FontAwesomeIcon
                      icon={faUser}
                      size="2x"
                      style={{ color: "#f44336", marginRight: "10px" }}
                    />
                  </Link>
                  <Link to={`/display-channel/${videoDetails.channelId}`}>
                    <p className="text-2xl font-semibold">
                      {videoDetails.channelName}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-semibold">
                    {videoDetails.subscribersCount} Subscribers
                  </p>
                </div>
                <div className="flex items-center">
                  <div
                    className={`flex items-center cursor-pointer ${
                      likeClicked ? "opacity-50" : ""
                    }`}
                    onClick={handleLike}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      size="2x"
                      style={{ color: "#ff4336", marginRight: "10px" }}
                    />
                    <p className="text-xl font-semibold">
                      {videoDetails.likes}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div
                    className={`flex items-center cursor-pointer ${
                      dislikeClicked ? "opacity-50" : ""
                    }`}
                    onClick={handleDislike}
                  >
                    <FontAwesomeIcon
                      icon={faThumbsDown}
                      size="2x"
                      style={{ color: "#f44336", marginRight: "10px" }}
                    />
                    <p className="text-xl font-semibold">
                      {videoDetails.dislikes}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <br />
            <div className="flex justify-center items-center">
              <div
                style={{ height: "100px", width: "1000px" }}
                className="flex justify-center items-center bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <p className="text-lg">
                  Description: {videoDetails.description}
                </p>
              </div>
            </div>
            <br />
            <div className="flex justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Comments</h2>
            </div>
            <div className="flex justify-center items-center">
              <div
                style={{ height: "100px", width: "1000px" }}
                className="flex justify-center items-center"
              >
                <input
                  className="w-full rounded-full p-2 border focus:outline-none focus:border-red-500"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></input>
                <br />
                <button
                  className="bg-red-500 border border-red-500 text-white py-2 px-4 rounded-full text-sm md:text-md transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
                  onClick={handleComment}
                >
                  Comment
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="bg-gray-100 rounded-lg hover:bg-gray-200 p-4 w-full md:w-3/4 lg:w-1/2 xl:w-1/3">
                {videoDetails.comments && videoDetails.comments.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {videoDetails.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-white shadow-md rounded-md p-4"
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-gray-500">
                            <FontAwesomeIcon icon={faUserCircle} size="2x" />
                          </span>
                          <strong className="text-lg md:text-xl">
                            @ {comment.user.name}
                          </strong>
                        </div>
                        <p className="text-gray-900 text-sm md:text-lg">
                          {comment.text}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No comments available.</p>
                )}
              </div>
            </div>
            <br />
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default DisplayVideo;
