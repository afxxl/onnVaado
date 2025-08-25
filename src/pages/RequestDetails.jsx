import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestById } from "../services/mockAPI";

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [userJoined, setUserJoined] = useState(false);

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    setLoading(true);
    try {
      const response = await getRequestById(id);
      if (response.success) {
        setRequest(response.data);
      } else {
        // Handle request not found
        alert("Request not found");
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching request:", error);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      sports: "⚽",
      emergency: "🚨",
      social: "👥",
      tasks: "📝",
    };
    return icons[category] || "📍";
  };

  const getCategoryColor = (category) => {
    const colors = {
      sports: "bg-green-100 text-green-800",
      emergency: "bg-red-100 text-red-800",
      social: "bg-blue-100 text-blue-800",
      tasks: "bg-purple-100 text-purple-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getUrgencyBorder = (timePosted) => {
    const minutes = parseInt(timePosted.split(" ")[0]);
    if (minutes <= 10) return "border-l-4 border-red-500";
    if (minutes <= 30) return "border-l-4 border-orange-500";
    return "border-l-4 border-blue-500";
  };

  const handleJoinRequest = () => {
    setUserJoined(true);
    setShowContactModal(true);
    // Here you would typically make an API call to join the request
  };

  const handleChatClick = () => {
    navigate(`/chat/${request.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Loading Header */}
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <div className="w-8 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 animate-pulse">
                <div className="space-y-4">
                  <div className="w-32 h-6 bg-gray-200 rounded"></div>
                  <div className="w-full h-8 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 animate-pulse">
                <div className="space-y-4">
                  <div className="w-24 h-6 bg-gray-200 rounded"></div>
                  <div className="w-full h-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Request Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The request you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Home
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">OV</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">onnVaado</h1>
                <p className="text-xs text-gray-500">Community First</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-8 ${getUrgencyBorder(request.timePosted)}`}
            >
              {/* Request Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${getCategoryColor(request.category)}`}
                  >
                    {getCategoryIcon(request.category)}
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getCategoryColor(request.category)}`}
                    >
                      {request.category}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      Posted {request.timePosted}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>

              {/* Title and Description */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {request.title}
              </h1>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {request.description}
              </p>

              {/* Location */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  📍 Location & Distance
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.location.address}
                    </p>
                    <p className="text-sm text-gray-600">Delhi, India</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      {request.distance}
                    </p>
                    <p className="text-sm text-gray-500">from you</p>
                  </div>
                </div>

                {/* Mock Map */}
                <div className="mt-4 bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-3xl mb-2">🗺️</div>
                    <p className="text-sm">Interactive map would appear here</p>
                  </div>
                </div>
              </div>

              {/* Request Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">
                    {request.spotsNeeded - request.spotsJoined}
                  </div>
                  <p className="text-sm text-gray-600">Still needed</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">
                    {request.spotsJoined}
                  </div>
                  <p className="text-sm text-gray-600">Already joined</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">
                    {request.spotsNeeded}
                  </div>
                  <p className="text-sm text-gray-600">Total spots</p>
                </div>
              </div>

              {/* Interested People */}
              {request.spotsJoined > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    People who joined
                  </h3>
                  <div className="flex items-center gap-4">
                    {Array.from({ length: request.spotsJoined }, (_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 bg-gray-50 rounded-lg p-3"
                      >
                        <img
                          src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                          alt="User"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-sm">User {i + 1}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-xs text-gray-500">
                              4.{i + 5}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Posted by</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={request.author.avatar}
                    alt={request.author.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {request.author.name}
                  </h4>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-gray-700">
                      {request.author.rating}
                    </span>
                    <span className="text-xs text-gray-500">(24 reviews)</span>
                  </div>
                  <p className="text-xs text-gray-500">Member since 2023</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>✅</span>
                  <span>Phone verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>✅</span>
                  <span>Email verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🎯</span>
                  <span>Helped 15+ people</span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Compensation</h3>
              <div
                className={`text-center p-4 rounded-xl mb-6 ${
                  request.compensation === "Free"
                    ? "bg-green-50 border border-green-200"
                    : "bg-orange-50 border border-orange-200"
                }`}
              >
                <div
                  className={`text-2xl font-bold ${
                    request.compensation === "Free"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {request.compensation}
                </div>
                <p className="text-sm text-gray-600">
                  {request.compensation === "Free"
                    ? "Community help"
                    : "Per person"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {!userJoined ? (
                  <button
                    onClick={handleJoinRequest}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    🚀 I can help!
                  </button>
                ) : (
                  <div className="w-full bg-green-500 text-white py-3 px-4 rounded-xl font-semibold text-center">
                    ✅ You joined this request!
                  </div>
                )}

                <button
                  onClick={handleChatClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors"
                >
                  💬 Chat with {request.author.name}
                </button>

                <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                  🔗 Share Request
                </button>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                🛡️ Safety Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Meet in public places</li>
                <li>• Verify identity before meeting</li>
                <li>• Inform someone about your plans</li>
                <li>• Trust your instincts</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              🎉 Request Joined Successfully!
            </h3>
            <p className="text-gray-600 mb-6">
              You've successfully joined this request. The requester will be
              notified and you can now chat with them to coordinate.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowContactModal(false);
                  handleChatClick();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Start Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
