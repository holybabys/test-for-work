export const state = () => ({
  time: []
})

export const getters = {
  getTimeList: state => state.time
}

export const actions = {
  async getTime({commit}) {
    // Тут мог быть запрос к беку. Но его нет)))
    let response = [
      {id: 1, time: '10:00'},
      {id: 2, time: '11:00'},
      {id: 3, time: '12:00'},
    ]
    commit('SET_TIME', response)

  },

}


export const mutations = {
  SET_TIME(state, data) {
    state.time = data
  }
}
