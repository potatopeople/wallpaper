export default {
  state: {
    currenImg: null,
    allImg: [],
    allImg2: null
  },
  mutations: {
    get_curren_img (state, val) {
      state.currenImg = val
    },
    get_all_img (state, val) {
      state.allImg = val
    },
    get_all_img2 (state, val) {
      state.allImg2 = val
    }
  },
  actions: {
    get_curren_imgs (ctx, val) {
      ctx.commit('get_curren_img', val)
    },
    get_all_imgs (ctx, val) {
      ctx.commit('get_all_img', val)
    },
    get_all_imgs2 (ctx, val) {
      ctx.commit('get_all_img2', val)
    }
  },
  getters: {
  }
}
