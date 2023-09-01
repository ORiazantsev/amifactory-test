import { createStore } from "vuex";
import movies from "@/store/modules/movies.store";

export default createStore({
  modules: {
    movies,
  },
});
