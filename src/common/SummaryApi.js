const summaryApi = {
  loginRider: {
    url: "/api/riders/login",
    method: "post"
  },
  loginDriver: {
    url: "/api/drivers/login",
    method: "post"
  },
  registerRider: {
    url: "/api/riders/register",
    method: "post"
  },
  registerDriver: {
    url: "/api/drivers/register",
    method: "post"
  },
  requestRide: {
    url: "/api/rides/request",
    method: "post"
  },
  getRide: (rideId) => ({
    url: `/api/rides/${rideId}`,
    method: "get"
  }),
  requestRide: {
    url: "/api/rides/request",
    method: "POST"
  },

  getRide: (rideId) => ({
    url: `/api/rides/${rideId}`,
    method: "GET"
  }),

  acceptRide: (rideId) => ({
    url: `/api/rides/${rideId}/accept`,
    method: "POST"
  }),
  getMyActiveRide: {
    url: "/api/rides/my-active",
    method: "GET"
  },
  
};

export default summaryApi;
