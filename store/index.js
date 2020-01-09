import Vuex from 'vuex';
import axios from 'axios';

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get('https://blog-nuxt-716d7.firebaseio.com/posts.json')
          .then(({data}) => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ... data[key], id: key});
            }
            vuexContext.commit('setPosts', postsArray);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts);
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  })
};

export default createStore;