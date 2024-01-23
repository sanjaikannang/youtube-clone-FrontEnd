import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Auth/Navbar";

const UploadVideo = () => {
  const navigate = useNavigate();

  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setVideoThumbnail(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("thumbnail", videoThumbnail);
    formData.append("video", videoFile);

    try {
      setUploading(true);

      const response = await fetch(
        "https://sanjaikannan-youtube-clone.onrender.com/video/upload",
        {
          method: "POST",
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Handle success
      //   console.log("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
      navigate("/homepage"); // Redirect to the homepage after upload
    }
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <div className="flex items-center justify-center h-screen">
        <div className="border border-b-4 border-red-500 bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
          <form onSubmit={handleUpload}>
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="text-2xl font-bold mb-8 text-red-500 flex justify-center">
                Upload Your Own Videos!
              </div>
              <div className="mb-4">
                <label
                  htmlFor="videoTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Video Title
                </label>
                <input
                  type="text"
                  id="videoTitle"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter Video Title"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="videoDescription"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Video Description
                </label>
                <textarea
                  id="videoDescription"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="3"
                  placeholder="Enter Video Description"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="videoThumbnail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Video Thumbnail (1 Image)
                </label>
                <input
                  type="file"
                  id="videoThumbnail"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="videoFile"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Video File (1 Video Max 100 MB )
                </label>
                <input
                  type="file"
                  id="videoFile"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-center">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:w-auto sm:text-sm"
                disabled={uploading}
              >
                {uploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    <span>Uploading...</span>
                  </div>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </form>
          <br />
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default UploadVideo;
