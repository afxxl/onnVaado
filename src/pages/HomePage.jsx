import React, { useState, useEffect } from "react";
import RequestCard from "../components/RequestCard";
import { getRequests } from "../services/mockAPI";
import { useNavigate } from "react-router-dom";

// Enhanced Shimmer Component
const ShimmerCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
    <div className="animate-pulse">
      {/* Header shimmer */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          <div className="w-20 h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="w-16 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      </div>

      {/* Content shimmer */}
      <div className="space-y-3 mb-4">
        <div className="w-full h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        <div className="w-4/5 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        <div className="w-3/4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      </div>

      {/* Location shimmer */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        <div className="w-32 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        <div className="w-16 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      </div>

      {/* Stats shimmer */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          <div className="w-20 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="w-12 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      </div>

      {/* Footer shimmer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
          <div className="w-24 h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
        </div>
        <div className="w-20 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]"></div>
      </div>
    </div>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentLocation, setCurrentLocation] = useState("Delhi, India");

  const categories = [
    { id: "all", name: "All", icon: "🌟", color: "bg-purple-500" },
    { id: "sports", name: "Sports", icon: "⚽", color: "bg-green-500" },
    { id: "emergency", name: "Emergency", icon: "🚨", color: "bg-red-500" },
    { id: "social", name: "Social", icon: "👥", color: "bg-blue-500" },
    { id: "tasks", name: "Tasks", icon: "📝", color: "bg-orange-500" },
  ];

  useEffect(() => {
    fetchRequests();
  }, [activeCategory]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await getRequests({ category: activeCategory });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleHelpClick = (request) => {
    alert(`You clicked to help with: ${request.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Mobile-First Responsive Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo Section - Compact on mobile */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-lg">
                    OV
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Onn Vaado
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Community First
                </p>
              </div>
              {/* Mobile-only compact title */}
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">Onn Vaado</h1>
              </div>
            </div>

            {/* Right Section - Mobile Optimized */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Location Picker - Hidden on small mobile */}
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer">
                <span className="text-blue-500">📍</span>
                <span className="text-sm font-medium text-gray-700">
                  {currentLocation}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Post Request Button - Responsive */}
              <button
                onClick={() => navigate("/post-request")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-lg">✨</span>
                <span className="hidden sm:inline">Post Request</span>
                <span className="sm:hidden">Post</span>
              </button>

              {/* Notifications & Profile - Mobile Optimized */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => navigate("/notifications")}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-5-5V9a5 5 0 00-10 0v3L0 17h5m5 0a3 3 0 01-6 0"
                      />
                    </svg>
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                      3
                    </span>
                  </button>
                </div>

                {/* Profile Avatar */}
                <div className="relative">
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full cursor-pointer hover:shadow-md transition-all duration-200"
                    onClick={() => navigate("/profile")}
                  ></div>
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full border border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-50 border border-blue-200 rounded-full mb-4 sm:mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-blue-700">
              Live Community • {requests.length} active requests
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3 sm:mb-4">
            Find help nearby
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
            Connect with your community for instant assistance. Whether it's
            sports, emergencies, or social meetups - help is just a tap away! 🚀
          </p>
        </div>

        {/* Enhanced Category Filters - Mobile Scrollable */}
        <div className="mb-8 sm:mb-10">
          <div className="flex justify-center">
            <div className="inline-flex gap-2 p-1.5 bg-white rounded-xl shadow-lg border border-gray-200 max-w-full overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.id
                      ? `${category.color} text-white shadow-md transform scale-105`
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm sm:text-base">{category.icon}</span>
                  <span>{category.name}</span>
                  {activeCategory === category.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {requests.map((request, index) => (
              <div
                key={request.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RequestCard request={request} onHelpClick={handleHelpClick} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-20 px-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <span className="text-4xl sm:text-5xl">🔍</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              No requests found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Be the first to post a request in your area and start building
              community connections!
            </p>
            <button
              onClick={() => navigate("/post-request")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Post First Request ✨
            </button>
          </div>
        )}
      </main>

      {/* Enhanced Mobile FAB */}
      <div className="fixed bottom-6 right-4 sm:right-6 md:hidden">
        <button
          onClick={() => navigate("/post-request")}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          <span className="text-xl sm:text-2xl">✨</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
