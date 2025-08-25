import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestById } from "../services/mockAPI";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Mock current user data
  const currentUser = {
    id: "current-user",
    name: "You",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  };

  useEffect(() => {
    fetchRequestDetails();
    loadMockMessages();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchRequestDetails = async () => {
    setLoading(true);
    try {
      const response = await getRequestById(id);
      if (response.success) {
        setRequest(response.data);
      } else {
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

  const loadMockMessages = () => {
    const mockMessages = [
      {
        id: 1,
        senderId: "author",
        senderName: "John Doe",
        senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Hey! Thanks for joining my football request! 🏈",
        timestamp: "2:30 PM",
        isCurrentUser: false,
      },
      {
        id: 2,
        senderId: "current-user",
        senderName: "You",
        senderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "No problem! I love playing football. What time are we starting?",
        timestamp: "2:31 PM",
        isCurrentUser: true,
      },
      {
        id: 3,
        senderId: "author",
        senderName: "John Doe",
        senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "We start at 6 PM sharp. The turf is already booked. Do you have your own cleats?",
        timestamp: "2:32 PM",
        isCurrentUser: false,
      },
      {
        id: 4,
        senderId: "current-user",
        senderName: "You",
        senderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
        text: "Yes, I have my gear ready! Should I bring anything else?",
        timestamp: "2:35 PM",
        isCurrentUser: true,
      },
      {
        id: 5,
        senderId: "author",
        senderName: "John Doe",
        senderAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Just bring water and energy! We have the ball and everything else covered. See you at Central Park turf! 🎯",
        timestamp: "2:37 PM",
        isCurrentUser: false,
      },
    ];
    setMessages(mockMessages);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      senderId: "current-user",
      senderName: "You",
      senderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");

    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      const autoResponse = {
        id: messages.length + 2,
        senderId: "author",
        senderName: request?.author?.name || "John Doe",
        senderAvatar:
          request?.author?.avatar ||
          "https://randomuser.me/api/portraits/men/1.jpg",
        text: "Got it! Looking forward to playing with you! 👍",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isCurrentUser: false,
      };
      setMessages((prev) => [...prev, autoResponse]);
    }, 3000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col">
      {/* Responsive Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate(`/request/${id}`)}
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
              </button>
            </div>

            {/* Chat Header Info - Responsive */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <img
                  src={request?.author?.avatar}
                  alt={request?.author?.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
                  {request?.author?.name}
                </h3>
                <p className="text-xs text-green-600">Online now</p>
              </div>
            </div>

            {/* Action Icons - Responsive */}
            <div className="flex items-center gap-1 sm:gap-3">
              <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </button>
              <button className="p-1.5 sm:p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Request Info Banner - Responsive */}
      <div className="bg-blue-50 border-b border-blue-200 px-3 sm:px-4 py-2 sm:py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
              ⚽
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-blue-900 text-sm sm:text-base truncate">
                {request?.title}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 truncate">
                📍 {request?.location?.address} • {request?.distance}
              </p>
            </div>
          </div>
          <div className="text-right ml-2">
            <p className="text-xs sm:text-sm font-medium text-blue-900 whitespace-nowrap">
              {request?.spotsNeeded - request?.spotsJoined} spots left
            </p>
            <p className="text-xs text-blue-600">{request?.compensation}</p>
          </div>
        </div>
      </div>

      {/* Messages Container - Responsive */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {/* Messages List - Responsive */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-xs lg:max-w-md ${msg.isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                  />
                  <div
                    className={`${msg.isCurrentUser ? "text-right" : "text-left"}`}
                  >
                    <div
                      className={`inline-block px-3 sm:px-4 py-2 rounded-2xl ${
                        msg.isCurrentUser
                          ? "bg-blue-500 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <p className="text-sm sm:text-base break-words">
                        {msg.text}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator - Responsive */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 sm:gap-3 max-w-xs">
                  <img
                    src={request?.author?.avatar}
                    alt={request?.author?.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                  />
                  <div className="bg-white border border-gray-200 rounded-2xl px-3 sm:px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input - Responsive */}
          <div className="border-t border-gray-200 bg-white p-3 sm:p-4">
            <form
              onSubmit={handleSendMessage}
              className="flex items-end gap-2 sm:gap-4"
            >
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    rows="1"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32 text-sm sm:text-base"
                    style={{ minHeight: "40px" }}
                  />

                  {/* Emoji and Attachment Buttons - Responsive */}
                  <div className="absolute right-2 sm:right-3 bottom-2 sm:bottom-3 flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
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
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-600 transition-colors text-sm sm:text-base"
                    >
                      😊
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!message.trim()}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors disabled:cursor-not-allowed"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-2 text-center hidden sm:block">
              Press Enter to send • Shift + Enter for new line
            </p>
            <p className="text-xs text-gray-500 mt-2 text-center sm:hidden">
              Tap to send
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
