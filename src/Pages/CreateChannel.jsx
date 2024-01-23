import React, { useState } from "react";

const CreateChannel = () => {
  const [channelTitle, setChannelTitle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [error, setError] = useState(null);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);

  const handleCreateChannel = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://sanjaikannan-youtube-clone.onrender.com/channel/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: channelTitle, // Make sure to include the name property
            description: channelDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const newChannel = await response.json();
      // console.log("Channel created successfully:", newChannel);

      // Close the modal or handle success accordingly
      setIsCreateChannelModalOpen(false);
    } catch (error) {
      console.error("Error creating channel:", error);
      setError(`Error creating channel: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-8 text-red-500 flex justify-center">
        My Profile
      </div>
      <h3 className="mt-2 mb-16 text-2xl tracking-tight md:text-2xl xl:text-4xl flex items-center justify-center">
        Upload Your Own Videos in
        <span className="text-red-500 font-semibold"> You Tube</span>
      </h3>
      <h5 className="mt-2 mb-16 text-md tracking-tight md:text-md xl:text-2xl flex items-center justify-center">
        You Need to Create a New Channel To Upload Your Own Videos!
      </h5>
      <div className="flex flex-col items-center justify-center">
        <div className="absolute flex justify-center">
          <button
            className="bg-red-500 border-2 border-red-500 text-white py-2 px-4 rounded-md text-sm md:text-sm transition duration-300 inline-block hover:bg-transparent hover:text-red-500"
            onClick={() => setIsCreateChannelModalOpen(true)}
          >
            Create Channel
          </button>
        </div>
      </div>

      {/* Create Channel Modal */}
      {isCreateChannelModalOpen && (
        <div
          id="create-channel-modal"
          className="fixed z-10 inset-0 overflow-y-auto"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="border border-b-4 border-red-500  inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <form onSubmit={handleCreateChannel}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="text-2xl font-bold mb-8 text-red-500 flex justify-center">
                    Create a Channel To Upload Your Own Videos !
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="channelTitle"
                      className="block text-gray-700 text-sm font-bold mb-2"
                      required
                    >
                      Channel Title
                    </label>
                    <input
                      type="text"
                      id="channelTitle"
                      value={channelTitle}
                      onChange={(e) => setChannelTitle(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter Channel Title"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="channelDescription"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Channel Description
                    </label>
                    <textarea
                      id="channelDescription"
                      value={channelDescription}
                      onChange={(e) => setChannelDescription(e.target.value)}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      placeholder="Enter Channel Description"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCreateChannelModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateChannel;
