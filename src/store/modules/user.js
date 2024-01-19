import { getToken, setToken, removeToken } from "@/utils/auth";
import { loginApi } from "@/api/user";
const state = {
  token: getToken(),
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  removeToken(state) {
    state.token = "";
    removeToken(token);
  },
};

const actions = {
  async login(context, payload) {
    delete payload.isAgree;
    const token = await loginApi(payload);
    context.commit("setToken", token);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
