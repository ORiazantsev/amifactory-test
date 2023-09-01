import moviesApi from "@/api/movies.api";

export default {
  namespaced: true,

  state: {
    loading: false,
    movies: [],
    hasMorePages: false,
    selectedMovieId: null,
  },

  getters: {
    getLoading(state) {
      return state.loading;
    },

    getMovies(state) {
      return state.movies;
    },

    getHasMorePages(state) {
      return state.hasMorePages;
    },

    getSelectedMovie(state) {
      return state.movies?.find((movie) => movie.id === state.selectedMovieId);
    },
  },

  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },

    UPDATE_MOVIES_LIST(state, payload) {
      state.movies = state.movies.concat(payload);
    },

    SET_HAS_MORE_PAGES(state, payload) {
      state.hasMorePages = payload;
    },

    UPDATE_SELECTED_MOVIE_ID(state, id) {
      state.selectedMovieId = id;
    },
  },

  actions: {
    async getMoviesList({ state, commit }, { page, selected }) {
      if (!state.selectedMovieId) commit("SET_LOADING", true);
      const movies = await moviesApi.getMovies(page - 1);

      commit("UPDATE_MOVIES_LIST", movies.results ?? []);
      commit("SET_HAS_MORE_PAGES", movies.pages > page);
      commit("UPDATE_SELECTED_MOVIE_ID", selected);
      commit("SET_LOADING", false);
    },

    setSelectedMovie({ commit }, id) {
      commit("SET_LOADING", true);

      setTimeout(() => {
        commit("UPDATE_SELECTED_MOVIE_ID", id);
        commit("SET_LOADING", false);
      }, 400);
    },
  },
};
