<template>
  <div class="movie-info">
    <div class="movie-info__bg">
      <transition name="fade">
        <img
          v-show="!getLoading"
          class="movie-info__bg-image"
          :src="movie.bg_picture"
          :alt="`${movie.title} banner`"
          loading="lazy"
        />
      </transition>
      <div class="movie-info__bg-gradient"></div>
    </div>

    <div class="movie-info__content">
      <transition name="slide-up">
        <div v-show="!getLoading" class="movie-info__container">
          <div class="movie-info__main-data">
            <MovieRating
              v-if="isLaptop && movie.imdb_rating"
              class="movie-info__rating"
              :rating="movie.imdb_rating"
            />

            <div class="movie-info__box">
              <h2 class="movie-info__title">
                {{ movie.title }}
                <span v-if="movie.release_year" class="movie-info__year">
                  ({{ movie.release_year }})
                </span>
              </h2>
              <WatchButton v-if="!isLaptop" text="Watch trailer" />
            </div>

            <div class="movie-info__box">
              <p class="movie-info__description">
                {{ movie.description }}
              </p>
              <MovieRating
                v-if="!isLaptop && movie.imdb_rating"
                :rating="movie.imdb_rating"
              />
            </div>

            <div class="movie-info__properties">
              <span v-if="getGenres">{{ getGenres }}</span>
              <span v-else>No ganres</span>
              <div class="movie-info__separator"></div>
              <span>{{ movie.mpa_rating }}</span>
              <div class="movie-info__separator"></div>
              <span>{{ getDuration }}</span>
            </div>

            <WatchButton v-if="isLaptop" text="Watch trailer" />
          </div>

          <div class="movie-info__partisipants-list">
            <p>
              <span class="movie-info__partisipant-role">Director: </span>
              <span class="movie-info__partisipants">
                {{ getPartisipants(movie.directors) }}
              </span>
            </p>
            <p>
              <span class="movie-info__partisipant-role">Writers: </span>
              <span class="movie-info__partisipants">
                {{ getPartisipants(movie.writers) }}
              </span>
            </p>
            <p>
              <span class="movie-info__partisipant-role">Stars: </span>
              <span
                v-if="getPartisipants(movie.stars)"
                class="movie-info__partisipants"
              >
                {{ getPartisipants(movie.stars) }}
              </span>
              <span v-else class="movie-info__partisipants">No stars</span>
            </p>
          </div>
        </div>
      </transition>

      <MoviesCarousel class="movie-info__carousel" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { screenSizeMixin } from "@/mixins/screenSize.mixin";
import { convertMinutesToTime } from "@/helpers/convertMinutesToTime.helper";
import MovieRating from "@/components/MovieRating.vue";
import WatchButton from "@/components/buttons/WatchButton.vue";
import MoviesCarousel from "@/components/MoviesCarousel.vue";

export default {
  props: {
    movie: { type: Object, default: () => ({}) },
  },

  mixins: [screenSizeMixin],

  components: { MovieRating, WatchButton, MoviesCarousel },

  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },

  computed: {
    ...mapGetters("movies", ["getLoading"]),

    getGenres() {
      return this.movie.genres?.map((genre) => genre.title).join(", ");
    },

    getDuration() {
      const result = convertMinutesToTime(this.movie.duration);
      return result;
    },

    isLaptop() {
      return this.screenSize.width >= 1152;
    },
  },

  methods: {
    getPartisipants(items) {
      return items
        ? items
            .map((person) => `${person.first_name} ${person.last_name}`)
            .join(", ")
        : "";
    },
  },
};
</script>

<style lang="scss">
.movie-info {
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 100svh;
  width: 100%;
  overflow-y: hidden;

  &__bg {
    position: absolute;
    inset: 0;
  }

  &__bg-image {
    height: 100%;
    width: 100%;
    object-fit: cover;

    @include tablet-landscape {
      height: 65%;
    }
  }

  &__bg-gradient {
    background: $blackGradient;
    position: absolute;
    inset: 0;

    @include tablet-landscape {
      height: 66%;
    }
  }

  &__content {
    position: relative;
    width: 100%;
    padding: 64px;
    z-index: 2;

    @include tablet-landscape {
      padding: 24px;
    }
  }

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 24px;
  }

  &__main-data {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 40%;

    @include tablet-landscape {
      max-width: 100%;
      gap: 24px;
    }
  }

  &__box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 60px;
  }

  &__rating {
    margin-bottom: 20px;
  }

  &__title {
    font-family: $krona;
    font-size: 40px;

    @include tablet-landscape {
      font-size: 32px;
    }
  }

  &__year {
    font-size: 18px;
    font-weight: 700;
    line-height: 140%; /* 25.2px */
  }

  &__description {
    flex: 1;
    font-size: 16px;
    line-height: 140%; /* 22.4px */
  }

  &__properties {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 140%; /* 22.4px */
  }

  &__separator {
    height: 10px;
    border-left: 1px solid $grey1;
  }

  &__partisipants-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 20%;
    padding-bottom: 60px;

    @include tablet-landscape {
      width: 60%;
    }
    @include tablet-portrait {
      padding-bottom: 150px;
    }
  }

  &__partisipant-role {
    color: $grey;
    font-size: 16px;
    line-height: 140%; /* 22.4px */
  }

  &__partisipants {
    font-size: 16px;
    font-weight: 500;
    line-height: 140%;
  }

  &__carousel {
    margin-top: 32px;

    @include tablet-landscape {
      display: none;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.25s ease;
  }

  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(50px);
  }

  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
}
</style>
