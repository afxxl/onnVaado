import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request, onHelpClick }) => {
  const navigate = useNavigate();
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isHelpLoading, setIsHelpLoading] = useState(false);
  const [hasHelped, setHasHelped] = useState(false);

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

  const getCompensationColor = (compensation) => {
    return compensation === "Free"
      ? "text-green-600"
      : "text-orange-600 font-semibold";
  };

  const getUrgencyBorder = (timePosted) => {
    const minutes = parseInt(timePosted.split(" ")[0]);
    if (minutes <= 10) return "border-l-2 sm:border-l-4 border-red-500";
    if (minutes <= 30) return "border-l-2 sm:border-l-4 border-orange-500";
    return "border-l-2 sm:border-l-4 border-blue-500";
  };

  const handleCardClick = () => {
    navigate(`/request/${request.id}`);
  };

  const handleHelpButtonClick = (e) => {
    e.stopPropagation();
    setShowHelpModal(true);
  };

  const handleConfirmHelp = async () => {
    setIsHelpLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsHelpLoading(false);
    setHasHelped(true);
    setShowHelpModal(false);

    // Optional: Call the parent callback
    if (onHelpClick) {
      onHelpClick(request);
    }

    // Navigate to chat after helping
    setTimeout(() => {
      navigate(`/chat/${request.id}`);
    }, 1000);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-4 sm:p-6 border border-gray-100 cursor-pointer hover:border-gray-200 transform hover:-translate-y-1 ${getUrgencyBorder(request.timePosted)}`}
        onClick={handleCardClick}
      >
        {/* Header - Responsive */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">
              {getCategoryIcon(request.category)}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(request.category)}`}
            >
              <span className="hidden sm:inline">{request.category}</span>
              <span className="sm:hidden">{request.category.slice(0, 4)}</span>
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {request.timePosted}
          </span>
        </div>

        {/* Title & Description - Responsive */}
        <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
          {request.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
          {request.description}
        </p>

        {/* Location & Distance - Responsive */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <span className="text-gray-400 text-sm">📍</span>
          <span className="text-xs sm:text-sm text-gray-600 flex-1 truncate">
            {request.location.address}
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-600 whitespace-nowrap">
            • {request.distance}
          </span>
        </div>

        {/* Stats - Responsive */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-xs sm:text-sm">
              <span className="text-gray-500">Need: </span>
              <span className="font-medium text-gray-900">
                {request.spotsNeeded - request.spotsJoined} more
              </span>
            </div>
            <div className="text-xs sm:text-sm">
              <span className="text-gray-500">Total: </span>
              <span className="font-medium text-gray-900">
                {request.spotsNeeded}
              </span>
            </div>
          </div>
          <span
            className={`text-xs sm:text-sm font-medium ${getCompensationColor(request.compensation)}`}
          >
            {request.compensation}
          </span>
        </div>

        {/* Author & Action - Responsive */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={request.author.avatar}
              alt={request.author.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
            />
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                {request.author.name}
              </p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">⭐</span>
                <span className="text-xs text-gray-500">
                  {request.author.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Help Button - Responsive */}
          {hasHelped ? (
            <div className="bg-green-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1">
              <span>✅</span>
              <span className="hidden sm:inline">Joined!</span>
              <span className="sm:hidden">✓</span>
            </div>
          ) : (
            <button
              onClick={handleHelpButtonClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 hover:shadow-md transform hover:-translate-y-0.5 flex items-center gap-1"
            >
              <span className="hidden sm:inline">I can help!</span>
              <span className="sm:hidden">Help</span>
              <span>🚀</span>
            </button>
          )}
        </div>
      </div>

      {/* Help Confirmation Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 transform transition-all">
            <div className="text-center">
              {/* Category Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">
                  {getCategoryIcon(request.category)}
                </span>
              </div>

              {/* Modal Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Join this request?
              </h3>
              <h4 className="text-lg font-semibold text-blue-600 mb-3 line-clamp-1">
                {request.title}
              </h4>
              <p className="text-gray-600 text-sm mb-6">
                By joining, you'll be able to chat with{" "}
                <strong>{request.author.name}</strong> and coordinate the
                details. Are you sure you want to help?
              </p>

              {/* Request Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">📍</span>
                  <span className="text-sm text-gray-700">
                    {request.location.address}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-400">💰</span>
                  <span
                    className={`text-sm font-medium ${getCompensationColor(request.compensation)}`}
                  >
                    {request.compensation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">👥</span>
                  <span className="text-sm text-gray-700">
                    {request.spotsNeeded - request.spotsJoined} more people
                    needed
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowHelpModal(false)}
                  disabled={isHelpLoading}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmHelp}
                  disabled={isHelpLoading}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {isHelpLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Joining...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <span>🚀</span>
                      Yes, I'll help!
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;
