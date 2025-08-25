import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostRequest from "./pages/PostRequest";
import RequestDetails from "./pages/RequestDetails";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post-request" element={<PostRequest />} />
          <Route path="/request/:id" element={<RequestDetails />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/profile/:userId?" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
