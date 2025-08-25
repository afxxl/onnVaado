import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    spotsNeeded: 1,
    compensation: "free",
    compensationAmount: "",
    duration: "1",
    urgency: "normal",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    {
      id: "sports",
      name: "Sports",
      icon: "⚽",
      desc: "Team sports, fitness, outdoor activities",
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: "🚨",
      desc: "Urgent help needed immediately",
    },
    {
      id: "social",
      name: "Social",
      icon: "👥",
      desc: "Meetups, hangouts, social events",
    },
    {
      id: "tasks",
      name: "Tasks",
      icon: "📝",
      desc: "Moving, errands, quick help",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.spotsNeeded < 1)
      newErrors.spotsNeeded = "At least 1 person needed";
    if (formData.compensation === "paid" && !formData.compensationAmount) {
      newErrors.compensationAmount = "Please specify amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Request posted successfully! 🎉");
      navigate("/");
    } catch (error) {
      alert("Error posting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Responsive Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                <span className="text-sm sm:text-base">Back</span>
                <span className="hidden sm:inline">to Home</span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm sm:text-base">
                  OV
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-gray-900">onnVaado</h1>
                <p className="text-xs text-gray-500">Community First</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2 sm:mb-3">
            Post a Request
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Get help from your community in just a few steps
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          {/* Category Selection - Responsive */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              What type of help do you need?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`relative flex items-start p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.category === category.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={formData.category === category.id}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-2 sm:gap-3 w-full">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-xl sm:text-2xl ${
                        formData.category === category.id
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                        {category.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {category.desc}
                      </p>
                    </div>
                  </div>
                  {formData.category === category.id && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
            {errors.category && (
              <p className="text-red-500 text-xs sm:text-sm mt-2">
                {errors.category}
              </p>
            )}
          </div>

          {/* Request Details - Responsive */}
          <div className="p-4 sm:p-6 lg:p-8 border-b border-gray-100 space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Tell us more about your request
            </h3>

            {/* Title */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Request Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Need 2 more players for football"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                  errors.title ? "border-red-300" : "border-gray-300"
                }`}
                maxLength={100}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.title && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.title}
                  </p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.title.length}/100
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide more details about what you need help with..."
                rows={4}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm sm:text-base ${
                  errors.description ? "border-red-300" : "border-gray-300"
                }`}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-red-500 text-xs sm:text-sm">
                    {errors.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  📍
                </span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Central Park, Delhi"
                  className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base ${
                    errors.location ? "border-red-300" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.location}
                </p>
              )}
            </div>
          </div>

          {/* Settings - Responsive */}
          <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              Request Settings
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* People Needed - Responsive */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  How many people do you need?
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      formData.spotsNeeded > 1 &&
                      setFormData((prev) => ({
                        ...prev,
                        spotsNeeded: prev.spotsNeeded - 1,
                      }))
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors text-sm sm:text-base"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="spotsNeeded"
                    value={formData.spotsNeeded}
                    onChange={handleInputChange}
                    min="1"
                    max="20"
                    className="w-16 sm:w-20 text-center py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      formData.spotsNeeded < 20 &&
                      setFormData((prev) => ({
                        ...prev,
                        spotsNeeded: prev.spotsNeeded + 1,
                      }))
                    }
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors text-sm sm:text-base"
                  >
                    +
                  </button>
                  <span className="text-xs sm:text-sm text-gray-600">
                    people
                  </span>
                </div>
                {errors.spotsNeeded && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.spotsNeeded}
                  </p>
                )}
              </div>

              {/* Duration - Responsive */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  How long will this take?
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="0.5">30 minutes</option>
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="4">Half day</option>
                  <option value="8">Full day</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Compensation - Responsive */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                Compensation
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="compensation"
                    value="free"
                    checked={formData.compensation === "free"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-xs sm:text-sm">
                    Free (Community help)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="compensation"
                    value="paid"
                    checked={formData.compensation === "paid"}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-xs sm:text-sm">Paid</span>
                </label>
              </div>

              {formData.compensation === "paid" && (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="compensationAmount"
                    value={formData.compensationAmount}
                    onChange={handleInputChange}
                    placeholder="Amount to offer"
                    className={`w-full pl-8 sm:pl-8 pr-3 sm:pr-4 py-2 sm:py-3 border rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                      errors.compensationAmount
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                  />
                </div>
              )}
              {errors.compensationAmount && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.compensationAmount}
                </p>
              )}
            </div>
          </div>

          {/* Submit - Responsive */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-gray-50 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </div>
                ) : (
                  "Post Request ✨"
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3">
              By posting, you agree to our community guidelines and terms of
              service
            </p>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostRequest;
