const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token,
  userId: (state) => state.user.profile.userId,
  avatar: (state) => state.user.profile.staffPhoto,
  name: (state) => state.user.profile.username,
};
export default getters;
