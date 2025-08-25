import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isOwnProfile, setIsOwnProfile] = useState(true); // Assuming viewing own profile for demo

  // Mock user data
  const [user, setUser] = useState({
    id: "current-user",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43210",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=300&fit=crop",
    bio: "Community enthusiast who loves helping others. Always ready for sports activities and emergency assistance. Building connections one help at a time! 🚀",
    location: "Delhi, India",
    joinedDate: "2023-06-15",
    verified: true,
    rating: 4.8,
    totalReviews: 47,
    stats: {
      helpsCounted: 23,
      requestsPosted: 8,
      responseRate: 95,
      avgResponseTime: "< 5 min",
    },
    badges: [
      {
        name: "Quick Responder",
        icon: "⚡",
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Sports Enthusiast",
        icon: "⚽",
        color: "bg-green-100 text-green-800",
      },
      {
        name: "Community Helper",
        icon: "🤝",
        color: "bg-blue-100 text-blue-800",
      },
      {
        name: "Verified User",
        icon: "✅",
        color: "bg-purple-100 text-purple-800",
      },
    ],
    skills: ["Football", "Emergency Response", "Event Planning", "Mentoring"],
    availability: "Available",
    languages: ["English", "Hindi", "Spanish"],
  });

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      type: "helped",
      title: "Helped with football game",
      description: "Joined football match at Central Park",
      date: "2 days ago",
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      type: "posted",
      title: "Need help moving furniture",
      description: "Posted request for moving assistance",
      date: "1 week ago",
      status: "completed",
      participants: 2,
    },
    {
      id: 3,
      type: "helped",
      title: "Emergency roadside assistance",
      description: "Helped someone with flat tire",
      date: "2 weeks ago",
      status: "completed",
      rating: 5,
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      comment:
        "Alex was incredibly helpful! Showed up on time and was very friendly. Definitely recommend!",
      date: "3 days ago",
      requestTitle: "Football game assistance",
    },
    {
      id: 2,
      reviewer: "Mike Davis",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      comment:
        "Quick response and very reliable. Great communication throughout the process.",
      date: "1 week ago",
      requestTitle: "Moving help",
    },
    {
      id: 3,
      reviewer: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4,
      comment:
        "Professional and courteous. Would definitely work with Alex again!",
      date: "2 weeks ago",
      requestTitle: "Event planning",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Loading Header */}
        <div className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-2xl"></div>
            <div className="p-8 space-y-4">
              <div className="w-32 h-8 bg-gray-200 rounded"></div>
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
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
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <img
              src={user.coverImage}
              alt="Cover"
              className="w-full h-full object-cover mix-blend-overlay"
            />
            {isOwnProfile && (
              <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                📷 Edit Cover
              </button>
            )}
          </div>

          {/* Profile Info */}
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="relative -mt-16 mb-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-white"
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                <span className="text-white text-lg">✓</span>
              </div>
              {isOwnProfile && (
                <button className="absolute bottom-2 left-24 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left Side - Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      <span>✅</span>
                      Verified
                    </div>
                  )}
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                      user.availability === "Available"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.availability === "Available"
                          ? "bg-green-500 animate-pulse"
                          : "bg-gray-500"
                      }`}
                    ></div>
                    {user.availability}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold text-gray-900">
                      {user.rating}
                    </span>
                    <span className="text-gray-500">
                      ({user.totalReviews} reviews)
                    </span>
                  </div>
                  <div className="text-gray-500">📍 {user.location}</div>
                  <div className="text-gray-500">
                    📅 Joined {new Date(user.joinedDate).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">{user.bio}</p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📧</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📱</span>
                    <span>{user.phone}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Skills & Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Languages
                  </h3>
                  <div className="flex gap-2">
                    {user.languages.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Stats & Actions */}
              <div className="lg:w-80">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                    <div className="text-2xl font-bold text-blue-600">
                      {user.stats.helpsCounted}
                    </div>
                    <div className="text-sm text-gray-600">Helps Given</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                    <div className="text-2xl font-bold text-green-600">
                      {user.stats.requestsPosted}
                    </div>
                    <div className="text-sm text-gray-600">Requests Posted</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                    <div className="text-2xl font-bold text-purple-600">
                      {user.stats.responseRate}%
                    </div>
                    <div className="text-sm text-gray-600">Response Rate</div>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                    <div className="text-lg font-bold text-orange-600">
                      {user.stats.avgResponseTime}
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  {isOwnProfile ? (
                    <>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors">
                        ✏️ Edit Profile
                      </button>
                      <button
                        className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                        onClick={() => navigate("/settings")}
                      >
                        ⚙️ Settings
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition-colors">
                        💬 Send Message
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                        🔗 Share Profile
                      </button>
                    </>
                  )}
                </div>

                {/* Badges */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Achievements
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {user.badges.map((badge, index) => (
                      <div
                        key={index}
                        className={`${badge.color} px-3 py-2 rounded-lg text-center text-sm font-medium`}
                      >
                        <div className="text-lg mb-1">{badge.icon}</div>
                        <div className="text-xs">{badge.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {[
                { id: "overview", name: "Overview", icon: "📊" },
                { id: "activity", name: "Recent Activity", icon: "🕒" },
                { id: "reviews", name: "Reviews", icon: "⭐" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Profile Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Performance Metrics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Response Rate</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 rounded-full">
                            <div
                              className="w-30 h-2 bg-green-500 rounded-full"
                              style={{ width: `${user.stats.responseRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">
                            {user.stats.responseRate}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Community Rating</span>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-lg ${star <= Math.floor(user.rating) ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium">
                            {user.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Activity Summary
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Helps Completed</span>
                        <span className="font-medium">
                          {user.stats.helpsCounted}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Requests Posted</span>
                        <span className="font-medium">
                          {user.stats.requestsPosted}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Average Response Time
                        </span>
                        <span className="font-medium">
                          {user.stats.avgResponseTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${
                          activity.type === "helped"
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                      >
                        {activity.type === "helped" ? "🤝" : "📝"}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {activity.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-gray-500">
                            {activity.date}
                          </span>
                          {activity.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">⭐</span>
                              <span className="text-xs text-gray-600">
                                {activity.rating}/5
                              </span>
                            </div>
                          )}
                          {activity.participants && (
                            <span className="text-xs text-gray-600">
                              {activity.participants} participants
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Community Reviews
                </h3>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.avatar}
                          alt={review.reviewer}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {review.reviewer}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {review.requestTitle}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    className={`text-sm ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                                  >
                                    ⭐
                                  </span>
                                ))}
                              </div>
                              <span className="text-xs text-gray-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
