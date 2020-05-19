import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: ""
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost;
      },
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get("/posts.json")
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({
                ...data[key],
                id: key
              });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        };
        this.$axios
          .$post(
            "https://blog-nuxt-716d7.firebaseio.com/posts.json?auth=" +
              vuexContext.state.token,
            createdPost
          )
          .then(data => {
            vuexContext.commit("addPost", { ...createdPost, id: data.name });
          })
          .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        this.$axios
          .$put(
            "https://blog-nuxt-716d7.firebaseio.com/posts/" +
              editedPost.id +
              ".json?auth=" +
              vuexContext.state.token,
            {
              ...editedPost,
              updatedDate: new Date()
            }
          )
          .then(() => {
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => console.log(e));
      },
      authenticateUser(vuexContext, authData) {
        console.log("authData", authData);
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fbAPIKey;

        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.fbAPIKey;
        }

        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            console.log(result);
            vuexContext.commit("setToken", result.idToken);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            Cookie.set("token", result.idToken);
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );
            return this.$axios.$post("http://localhost:3000/api/track-data", {
              data: "Authenticated"
            });
          })
          .catch(e => {
            console.log(e);
          });
      },
      initAuth(vuexContext, req) {
        let token, expirationDate;

        if (req) {
          // Server Side
          if (!req.headers.cookie) {
            return;
          }

          console.log("READ SERVER");

          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("token="));

          if (!jwtCookie) {
            return;
          }

          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
        } else {
          // Client
          console.log("READ CLIENT");
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
        }

        if (new Date().getTime() > +expirationDate || !token) {
          console.log("NO TOKEN");
          vuexContext.dispatch("logout");
          return;
        }

        vuexContext.commit("setToken", token);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        Cookie.remove("token");
        Cookie.remove("expirationDate");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationDate");
        }
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
      isAuthenticated(state) {
        return state.token != null && state.token != "";
      },
      token(state) {
        return state.token;
      }
    }
  });
};

export default createStore;
