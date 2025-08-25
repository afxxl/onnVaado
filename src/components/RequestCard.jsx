import React from "react";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request, onHelpClick }) => {
  const navigate = useNavigate();

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
    if (minutes <= 10) return "border-l-4 border-red-500";
    if (minutes <= 30) return "border-l-4 border-orange-500";
    return "border-l-4 border-blue-500";
  };

  const handleCardClick = () => {
    navigate(`/request/${request.id}`);
  };

  const handleHelpButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click navigation
    onHelpClick(request);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-100 cursor-pointer hover:border-gray-200 transform hover:-translate-y-1 ${getUrgencyBorder(request.timePosted)}`}
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getCategoryIcon(request.category)}</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(request.category)}`}
          >
            {request.category}
          </span>
        </div>
        <span className="text-sm text-gray-500">{request.timePosted}</span>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
        {request.title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {request.description}
      </p>

      {/* Location & Distance */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400">📍</span>
        <span className="text-sm text-gray-600 flex-1 truncate">
          {request.location.address}
        </span>
        <span className="text-sm font-medium text-blue-600">
          • {request.distance}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-500">Need: </span>
            <span className="font-medium text-gray-900">
              {request.spotsNeeded - request.spotsJoined} more
            </span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Total: </span>
            <span className="font-medium text-gray-900">
              {request.spotsNeeded}
            </span>
          </div>
        </div>
        <span
          className={`text-sm font-medium ${getCompensationColor(request.compensation)}`}
        >
          {request.compensation}
        </span>
      </div>

      {/* Author & Action */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <img
            src={request.author.avatar}
            alt={request.author.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">
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
        <button
          onClick={handleHelpButtonClick}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:shadow-md transform hover:-translate-y-0.5"
        >
          I can help!
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
