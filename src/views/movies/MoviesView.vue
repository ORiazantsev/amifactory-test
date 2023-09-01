<template>
  <div class="movies-view">
    <MoviesList class="movies-view__list" />
    <MovieInfo class="movies-view__info" :movie="getSelectedMovie" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MoviesList from "@/components/MoviesList.vue";
import MovieInfo from "@/components/MovieInfo.vue";

export default {
  name: "MoviesView",
  components: { MoviesList, MovieInfo },

  computed: {
    ...mapGetters("movies", ["getMovies", "getSelectedMovie"]),
  },

  methods: {
    ...mapActions("movies", ["getMoviesList"]),
  },

  created() {
    if (this.getMovies.length === 0)
      this.getMoviesList({ page: 1, selected: 1 });
  },
};
</script>

<style lang="scss">
.movies-view {
  display: flex;
  min-height: 100svh;
  background-color: $black;

  @include tablet-landscape {
    padding: 24px 0;
  }

  &__list {
    display: none;
    max-width: 40%;
    padding: 0 24px;

    @include tablet-landscape {
      display: block;
    }
    @include tablet-portrait {
      max-width: 100%;
    }
  }

  &__info {
    position: sticky;
    top: 24px;

    @include tablet-portrait {
      display: none;
    }
  }
}
</style>
