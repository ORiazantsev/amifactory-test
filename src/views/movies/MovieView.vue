<template>
  <div class="movie-view">
    <router-link to="/">
      <GoBackButton class="movie-view__back-button" />
    </router-link>
    <MovieInfo :movie="getSelectedMovie" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MovieInfo from "@/components/MovieInfo.vue";
import GoBackButton from "@/components/buttons/GoBackButton.vue";

export default {
  name: "MovieView",
  components: { MovieInfo, GoBackButton },

  computed: {
    ...mapGetters("movies", ["getMovies", "getSelectedMovie"]),
  },

  methods: {
    ...mapActions("movies", ["getMoviesList"]),
  },

  created() {
    if (!this.getMovies) this.getMoviesList(1, +this.$route.params.slug);
  },
};
</script>

<style lang="scss">
.movie-view {
  min-height: 100svh;
  background-color: $black;

  &__back-button {
    position: absolute;
    top: 40px;
    left: 24px;
    z-index: 2;
  }
}
</style>
