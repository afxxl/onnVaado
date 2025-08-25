import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  // Mock admin data
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalUsers: 1247,
      activeRequests: 89,
      completedRequests: 342,
      onlineUsers: 156,
      totalChats: 567,
      reportedContent: 12,
      verifiedUsers: 892,
    },
    recentActivity: [
      {
        id: 1,
        type: "user_registered",
        message: 'New user "Alex Johnson" registered',
        timestamp: "2025-08-25T10:30:00Z",
        user: {
          name: "Alex Johnson",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
      },
      {
        id: 2,
        type: "request_created",
        message: 'Request "Need help with moving" created',
        timestamp: "2025-08-25T09:15:00Z",
        user: {
          name: "Sarah Wilson",
          avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        },
      },
      {
        id: 3,
        type: "report_submitted",
        message: "Content reported by user",
        timestamp: "2025-08-25T08:45:00Z",
        user: {
          name: "Mike Davis",
          avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        },
      },
      {
        id: 4,
        type: "request_completed",
        message: 'Request "Football match help" completed',
        timestamp: "2025-08-25T08:00:00Z",
        user: {
          name: "John Doe",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      },
    ],
    topRequests: [
      {
        id: 1,
        title: "Need 3 players for football",
        category: "sports",
        responses: 12,
        status: "active",
      },
      {
        id: 2,
        title: "Help with moving furniture",
        category: "tasks",
        responses: 8,
        status: "active",
      },
      {
        id: 3,
        title: "Emergency roadside assistance",
        category: "emergency",
        responses: 15,
        status: "completed",
      },
      {
        id: 4,
        title: "Looking for study partners",
        category: "social",
        responses: 6,
        status: "active",
      },
    ],
    pendingReports: [
      {
        id: 1,
        type: "inappropriate_content",
        reportedUser: "John Smith",
        reportedBy: "Jane Doe",
        content: "Inappropriate message in chat",
        timestamp: "2025-08-25T07:30:00Z",
        status: "pending",
      },
      {
        id: 2,
        type: "spam",
        reportedUser: "Bob Wilson",
        reportedBy: "Alice Brown",
        content: "Spamming multiple requests",
        timestamp: "2025-08-24T18:20:00Z",
        status: "pending",
      },
    ],
  });

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      user_registered: "👤",
      request_created: "📝",
      report_submitted: "⚠️",
      request_completed: "✅",
    };
    return icons[type] || "📍";
  };

  const getActivityColor = (type) => {
    const colors = {
      user_registered: "text-green-600",
      request_created: "text-blue-600",
      report_submitted: "text-red-600",
      request_completed: "text-purple-600",
    };
    return colors[type] || "text-gray-600";
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 animate-pulse"
              >
                <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-16 h-8 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Back to App
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">A</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">Admin Panel</h1>
                <p className="text-xs text-gray-500">onnVaado Management</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-gray-600">
            Monitor and manage your community platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Users
                </h3>
                <p className="text-3xl font-bold text-blue-600">
                  {dashboardData.stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+12%</span>
              <span className="text-gray-500 text-sm ml-2">
                from last month
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Active Requests
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  {dashboardData.stats.activeRequests}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">+8%</span>
              <span className="text-gray-500 text-sm ml-2">from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Online Users
                </h3>
                <p className="text-3xl font-bold text-purple-600">
                  {dashboardData.stats.onlineUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🟢</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 text-sm font-medium">Live</span>
              <span className="text-gray-500 text-sm ml-2">
                currently active
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reports</h3>
                <p className="text-3xl font-bold text-red-600">
                  {dashboardData.stats.reportedContent}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-red-600 text-sm font-medium">
                Needs attention
              </span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {dashboardData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">
                          {getActivityIcon(activity.type)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <img
                          src={activity.user.avatar}
                          alt={activity.user.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-xs text-gray-500">
                          {activity.user.name}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">
                          {getTimeAgo(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Top Requests */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Popular Requests
              </h3>
              <div className="space-y-3">
                {dashboardData.topRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {request.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {request.responses} responses
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reports */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Pending Reports
              </h3>
              <div className="space-y-3">
                {dashboardData.pendingReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-red-900">
                        {report.type.replace("_", " ")}
                      </p>
                      <span className="text-xs text-red-600">
                        {getTimeAgo(report.timestamp)}
                      </span>
                    </div>
                    <p className="text-xs text-red-700 mb-2">
                      {report.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-red-600">
                        {report.reportedUser} reported by {report.reportedBy}
                      </p>
                      <button className="text-xs text-red-700 hover:text-red-900 font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                  View All Users
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                  Manage Requests
                </button>
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                  Review Reports
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                  System Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
