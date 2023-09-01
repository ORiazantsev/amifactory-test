<template>
  <div class="movies-list">
    <h2 class="movies-list__title">
      <span>Popular</span> <span>serials</span>
    </h2>

    <div class="movies-list__wrapper">
      <MovieCard
        v-for="movie in getMovies"
        :key="`movie-${movie.id}`"
        class="movies-list__card"
        :movie="movie"
        @click="selectMovie(movie.id)"
      />
      <div v-if="getHasMorePages" class="movies-list__view-more-card">
        <AddButton text="View more" @click="viewMore" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { screenSizeMixin } from "@/mixins/screenSize.mixin";
import MovieCard from "@/components/MovieCard.vue";
import AddButton from "@/components/buttons/AddButton.vue";

export default {
  mixins: [screenSizeMixin],

  components: {
    MovieCard,
    AddButton,
  },

  data() {
    return {
      page: 1,
      selected: 1,
    };
  },

  computed: {
    ...mapGetters("movies", ["getMovies", "getHasMorePages"]),
  },

  methods: {
    ...mapActions("movies", ["getMoviesList", "setSelectedMovie"]),

    selectMovie(id) {
      this.selected = id;
      this.setSelectedMovie(id);

      if (this.screenSize.width < 900) {
        this.$router.push({ path: `/movies/${id}` });
      }
    },

    viewMore() {
      this.page = this.page + 1;
      this.getMoviesList({ page: this.page, selected: this.selected });
    },
  },
};
</script>

<style lang="scss">
.movies-list {
  max-height: max-content;

  &__title {
    display: none;
    width: 100%;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 28px;

    @include tablet-portrait {
      display: block;
    }

    :last-child {
      color: $red;
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 24px;
    justify-items: center;

    @include tablet-portrait {
      grid-template-columns: repeat(4, 1fr);
    }
    @include mobile {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__view-more-card {
    display: flex;
    justify-content: center;
    grid-column-start: 1;
    grid-column-end: 3;
    padding: 40px 0;

    @include tablet-portrait {
      grid-column-end: 2;
    }
  }
}
</style>
