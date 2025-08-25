import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "request_accepted",
      title: "Your request was accepted! 🎉",
      message: 'John Doe accepted your request "Need 3 players for football"',
      timestamp: "2025-08-25T08:30:00Z",
      read: false,
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      requestId: 1,
    },
    {
      id: 2,
      type: "new_request",
      title: "New request in your area",
      message: "Someone needs help with moving furniture near you",
      timestamp: "2025-08-24T15:20:00Z",
      read: false,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      requestId: 2,
    },
    {
      id: 3,
      type: "message",
      title: "New message from Sarah",
      message: "Hey! Are you still available for the football match today?",
      timestamp: "2025-08-24T12:15:00Z",
      read: false,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      chatId: 1,
    },
    {
      id: 4,
      type: "request_completed",
      title: "Request completed ✅",
      message:
        'Your help with "Emergency roadside assistance" was marked complete',
      timestamp: "2025-08-23T18:10:00Z",
      read: true,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      requestId: 3,
    },
    {
      id: 5,
      type: "request_reminder",
      title: "Don't forget! ⏰",
      message: "Football match at Central Park starts in 30 minutes",
      timestamp: "2025-08-23T17:30:00Z",
      read: true,
      avatar: null,
      requestId: 1,
    },
    {
      id: 6,
      type: "system",
      title: "Profile verification complete",
      message:
        "Congratulations! Your profile has been verified. You now have a trusted user badge.",
      timestamp: "2025-08-22T09:00:00Z",
      read: true,
      avatar: null,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const getNotificationIcon = (type) => {
    const icons = {
      request_accepted: "🎉",
      new_request: "📍",
      message: "💬",
      request_completed: "✅",
      request_reminder: "⏰",
      system: "🔔",
    };
    return icons[type] || "🔔";
  };

  const getNotificationColor = (type) => {
    const colors = {
      request_accepted: "border-l-green-400",
      new_request: "border-l-blue-400",
      message: "border-l-purple-400",
      request_completed: "border-l-green-400",
      request_reminder: "border-l-orange-400",
      system: "border-l-gray-400",
    };
    return colors[type] || "border-l-gray-400";
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    switch (notification.type) {
      case "request_accepted":
      case "new_request":
      case "request_completed":
      case "request_reminder":
        if (notification.requestId) {
          navigate(`/request/${notification.requestId}`);
        }
        break;
      case "message":
        if (notification.chatId) {
          navigate(`/chat/${notification.chatId}`);
        }
        break;
      default:
        break;
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type === activeFilter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Responsive Loading Header */}
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 h-16 flex items-center justify-between">
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Responsive Loading Content */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 animate-pulse"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-3 sm:h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/2 h-2 sm:h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
                <p className="text-xs text-gray-500">Notifications</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Main Content */}
      <main className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Page Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Notifications
            </h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {unreadCount > 0
                ? `${unreadCount} unread notifications`
                : "All caught up!"}
            </p>
          </div>

          {notifications.length > 0 && (
            <div className="flex gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={clearAll}
                className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Filter Tabs - Responsive */}
        <div className="flex gap-2 mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: "all", name: "All", count: notifications.length },
            { id: "unread", name: "Unread", count: unreadCount },
            {
              id: "request_accepted",
              name: "Accepted",
              count: notifications.filter((n) => n.type === "request_accepted")
                .length,
            },
            {
              id: "new_request",
              name: "New Requests",
              count: notifications.filter((n) => n.type === "new_request")
                .length,
            },
            {
              id: "message",
              name: "Messages",
              count: notifications.filter((n) => n.type === "message").length,
            },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-gray-400"
              }`}
            >
              <span>{filter.name}</span>
              {filter.count > 0 && (
                <span
                  className={`px-1.5 sm:px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List - Responsive */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-3xl sm:text-4xl">🔔</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
              No notifications
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {activeFilter === "all"
                ? "You're all caught up! New notifications will appear here."
                : `No ${activeFilter} notifications found.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg sm:rounded-xl shadow-sm border-l-2 sm:border-l-4 ${getNotificationColor(notification.type)} hover:shadow-md transition-all duration-200 cursor-pointer ${
                  !notification.read
                    ? "border border-blue-200 bg-blue-50/30"
                    : "border border-gray-200"
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Avatar or Icon - Responsive */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg sm:text-xl">
                            {getNotificationIcon(notification.type)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content - Responsive */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 sm:gap-4">
                        <div className="min-w-0 flex-1">
                          <h4
                            className={`font-semibold text-sm sm:text-base ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
                          >
                            {notification.title}
                          </h4>
                          <p
                            className={`mt-1 text-xs sm:text-sm ${!notification.read ? "text-gray-700" : "text-gray-600"} line-clamp-2`}
                          >
                            {notification.message}
                          </p>
                          <p className="mt-2 text-xs text-gray-500">
                            {getTimeAgo(notification.timestamp)}
                          </p>
                        </div>

                        {/* Actions - Responsive */}
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
