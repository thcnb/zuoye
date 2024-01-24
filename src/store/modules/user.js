import { getToken, setToken, removeToken } from "@/utils/auth";
import { loginApi, profileApi } from "@/api/user";
const state = {
  token: getToken(),
  profile: {},
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  profileList(state, uesr) {
    state.profile = uesr;
  },
};

const actions = {
  async login(context, payload) {
    delete payload.isAgree;
    const token = await loginApi(payload);
    context.commit("setToken", token);
  },
  async profiles(context) {
    const res = await profileApi();
    context.commit("profileList", res);
  },
  logout({commit}){
    commit('removeToken')
    commit('profileList',{})
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
