import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import DisplayVideo from "./Pages/DisplayVideo";
import MyProfile from "./Pages/MyProfile";
import UploadVideo from "./Pages/UploadVideo";
import UpdateVideo from "./Pages/UpdateVideo";
import DisplayChannel from "./Pages/DisplayChannel";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/video/:videoId" element={<DisplayVideo />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/update-video/:videoId" element={<UpdateVideo />} />
        <Route
          path="/display-channel/:channelId"
          element={<DisplayChannel />}
        />
      </Routes>
    </>
  );
}

export default App;
