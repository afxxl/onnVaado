import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+91 98765 43210",
    bio: "Community enthusiast who loves helping others.",
    location: "Delhi, India",
    availability: "available",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newRequests: true,
    messages: true,
    requestUpdates: true,
    emailDigest: false,
    smsAlerts: true,
    pushNotifications: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showOnlineStatus: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacySettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (section) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`${section} settings saved successfully!`);
    setLoading(false);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion
    alert("Account deletion functionality would be implemented here");
    setShowDeleteModal(false);
  };

  const sections = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "account", name: "Account", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
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
                Back to Profile
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">OV</span>
              </div>
              <div>
                <h1 className="font-bold text-gray-900">onnVaado</h1>
                <p className="text-xs text-gray-500">Settings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              {/* Profile Settings */}
              {activeSection === "profile" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Profile Information
                  </h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Availability Status
                      </label>
                      <select
                        name="availability"
                        value={profileData.availability}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="away">Away</option>
                      </select>
                    </div>

                    <button
                      onClick={() => handleSave("Profile")}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeSection === "notifications" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Notification Preferences
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        App Notifications
                      </h4>
                      <div className="space-y-3">
                        {Object.entries({
                          newRequests: "New requests in your area",
                          messages: "New messages",
                          requestUpdates: "Updates on your requests",
                        }).map(([key, label]) => (
                          <label
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-700">{label}</span>
                            <input
                              type="checkbox"
                              name={key}
                              checked={notificationSettings[key]}
                              onChange={handleNotificationChange}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Communication Channels
                      </h4>
                      <div className="space-y-3">
                        {Object.entries({
                          emailDigest: "Weekly email digest",
                          smsAlerts: "SMS alerts for urgent requests",
                          pushNotifications: "Push notifications",
                        }).map(([key, label]) => (
                          <label
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-700">{label}</span>
                            <input
                              type="checkbox"
                              name={key}
                              checked={notificationSettings[key]}
                              onChange={handleNotificationChange}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave("Notification")}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Notifications"}
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === "privacy" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Privacy & Security
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        name="profileVisibility"
                        value={privacySettings.profileVisibility}
                        onChange={handlePrivacyChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="public">Public - Anyone can see</option>
                        <option value="community">
                          Community - Only verified users
                        </option>
                        <option value="private">
                          Private - Only people I help
                        </option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        {Object.entries({
                          showEmail: "Show email address on profile",
                          showPhone: "Show phone number on profile",
                          allowMessages: "Allow direct messages",
                          showOnlineStatus: "Show online status",
                        }).map(([key, label]) => (
                          <label
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <span className="text-gray-700">{label}</span>
                            <input
                              type="checkbox"
                              name={key}
                              checked={privacySettings[key]}
                              onChange={handlePrivacyChange}
                              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSave("Privacy")}
                      disabled={loading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Saving..." : "Save Privacy Settings"}
                    </button>
                  </div>
                </div>
              )}

              {/* Account Settings */}
              {activeSection === "account" && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Account Management
                  </h3>
                  <div className="space-y-8">
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Change Password
                      </h4>
                      <p className="text-blue-700 text-sm mb-4">
                        Keep your account secure with a strong password
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Change Password
                      </button>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <h4 className="font-semibold text-green-900 mb-2">
                        Two-Factor Authentication
                      </h4>
                      <p className="text-green-700 text-sm mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Enable 2FA
                      </button>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                      <h4 className="font-semibold text-orange-900 mb-2">
                        Export Your Data
                      </h4>
                      <p className="text-orange-700 text-sm mb-4">
                        Download a copy of all your data
                      </p>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Request Export
                      </button>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h4 className="font-semibold text-red-900 mb-2">
                        Delete Account
                      </h4>
                      <p className="text-red-700 text-sm mb-4">
                        Permanently delete your account and all data
                      </p>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-red-900 mb-4">
              Delete Account
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone and you will lose all your data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
