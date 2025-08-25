const mockRequests = [
  {
    id: 1,
    category: "sports",
    title: "Need 3 more players for football",
    description:
      "We're playing at Central Park turf this evening. Looking for skilled players who can join us for a friendly match. Please bring your own water bottle.",
    location: { lat: 28.6139, lng: 77.209, address: "Central Park, Delhi" },
    distance: "0.5 km",
    timePosted: "5 min ago",
    spotsNeeded: 3,
    spotsJoined: 1,
    compensation: "Free",
    status: "active",
    author: {
      id: 1,
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 4.8,
      joinedDate: "2023-01-15",
      helpCount: 23,
    },
  },
  {
    id: 2,
    category: "emergency",
    title: "Need Petrol on Road - Urgent!",
    description:
      "My bike ran out of fuel near the highway. I'm willing to pay extra for someone who can bring a small amount of petrol. Very urgent!",
    location: { lat: 28.7041, lng: 77.1025, address: "NH-24, Ghaziabad" },
    distance: "2.3 km",
    timePosted: "10 min ago",
    spotsNeeded: 1,
    spotsJoined: 0,
    compensation: "₹200",
    status: "active",
    author: {
      id: 2,
      name: "Priya Sharma",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4.5,
      joinedDate: "2023-01-18",
      helpCount: 21,
    },
  },
  {
    id: 3,
    category: "social",
    title: "Looking for friends to hang out",
    description:
      "Anyone free to meet at the new cafe in Connaught Place? Let's grab coffee and chat!",
    location: { lat: 28.5355, lng: 77.391, address: "Connaught Place, Delhi" },
    distance: "1.1 km",
    timePosted: "20 min ago",
    spotsNeeded: 4,
    spotsJoined: 2,
    compensation: "Free",
    status: "active",
    author: {
      id: 3,
      name: "Mike Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 4.7,
      joinedDate: "2023-01-19",
      helpCount: 21,
    },
  },
  {
    id: 4,
    category: "tasks",
    title: "Help moving furniture",
    description:
      "Need 2 strong people to help me move some furniture from my apartment to a nearby storage. Will take about 2 hours.",
    location: { lat: 28.4595, lng: 77.0266, address: "Sector 29, Gurgaon" },
    distance: "5.2 km",
    timePosted: "45 min ago",
    spotsNeeded: 2,
    spotsJoined: 0,
    compensation: "₹500 each",
    status: "active",
    author: {
      id: 4,
      name: "Sarah Wilson",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 4.9,
      joinedDate: "2023-01-10",
      helpCount: 19,
    },
  },
  {
    id: 5,
    category: "sports",
    title: "Cricket team needs batsmen",
    description:
      "Our cricket team is looking for 2 good batsmen for tomorrow's match. Experience preferred but not mandatory.",
    location: { lat: 28.6692, lng: 77.4538, address: "Sports Complex, Noida" },
    distance: "8.7 km",
    timePosted: "1 hr ago",
    spotsNeeded: 2,
    spotsJoined: 1,
    compensation: "Free",
    status: "active",
    author: {
      id: 5,
      name: "Rahul Kumar",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 4.6,
      joinedDate: "2023-01-11",
      helpCount: 13,
    },
  },
];

export const getRequests = async (filters = {}) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredRequests = [...mockRequests];

  if (filters.category && filters.category !== "all") {
    filteredRequests = filteredRequests.filter(
      (req) => req.category === filters.category,
    );
  }

  return {
    success: true,
    data: filteredRequests,
    total: filteredRequests.length,
  };
};

export const getRequestById = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const request = mockRequests.find((req) => req.id === parseInt(id));
  return {
    success: !!request,
    data: request,
  };
};

export default mockRequests;
