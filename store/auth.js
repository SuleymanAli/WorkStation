export const state = () => ({
  user: {
    token: null
  }
})

export const getters = {
  getUserToken(state) {
    return state.user.token
  }
}

export const mutations = {
  setToken(state, token) {
    state.user.token = token
  }
}

export const actions = {}
