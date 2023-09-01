<template>
  <div class="movies-carousel">
    <NavigationButton
      ref="prevButton"
      class="movies-carousel__navigation"
      :disabled="isPrevButtonDisabled"
      @click="goToSlide('prev')"
    />

    <Swiper
      ref="carousel"
      class="movies-carousel__carousel"
      v-bind="carouselSettings"
      @slideChange="onSlideChange"
    >
      <SwiperSlide
        v-for="slide in getMovies"
        :key="`slide-${slide.id}`"
        class="movies-carousel__slide"
        :class="{ 'movies-carousel__slide--selected': selected === slide.id }"
      >
        <MovieCard
          ref="card"
          class="movies-carousel__card"
          :movie="slide"
          :selected="selected === slide.id"
          @click="selectMovie(slide.id)"
        />
      </SwiperSlide>
      <SwiperSlide v-if="getHasMorePages" class="movies-carousel__slide">
        <AddButton text="View more" @click="viewMore" />
      </SwiperSlide>
    </Swiper>

    <NavigationButton
      ref="nextButton"
      class="movies-carousel__navigation navigation-button--reversed"
      :disabled="isNextButtonDisabled"
      @click="goToSlide('next')"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import MovieCard from "@/components/MovieCard.vue";
import AddButton from "@/components/buttons/AddButton.vue";
import NavigationButton from "@/components/buttons/NavigationButton.vue";

export default {
  components: {
    MovieCard,
    Swiper,
    SwiperSlide,
    AddButton,
    NavigationButton,
  },

  data() {
    return {
      page: 1,
      selected: 1,
      isPrevButtonDisabled: true,
      isNextButtonDisabled: false,

      carouselSettings: {
        allowTouchMove: false,
        spaceBetween: 10,
        breakpoints: {
          320: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 6,
          },
          1280: {
            slidesPerView: 6,
          },
          1400: {
            slidesPerView: 7,
          },
          1600: {
            slidesPerView: 8,
          },
        },
      },
    };
  },

  computed: {
    ...mapGetters("movies", [
      "getMovies",
      "getHasMorePages",
      "getSelectedMovie",
    ]),
  },

  methods: {
    ...mapActions("movies", ["getMoviesList", "setSelectedMovie"]),

    selectMovie(id) {
      if (this.selected !== id) {
        this.selected = id;
        this.setSelectedMovie(id);
      }
    },

    goToSlide(direction) {
      const swiper = this.$refs.carousel.$el.swiper;

      switch (direction) {
        case "prev":
          swiper.slidePrev();
          break;
        case "next":
          swiper.slideNext();
          break;
      }
    },

    viewMore() {
      this.page = this.page + 1;
      this.getMoviesList({ page: this.page, selected: this.selected });
      this.isNextButtonDisabled = false;
    },

    onSlideChange(swiper) {
      this.isPrevButtonDisabled = swiper.isBeginning;
      this.isNextButtonDisabled = swiper.isEnd;
    },
  },
};
</script>

<style lang="scss">
.movies-carousel {
  display: flex;

  &__navigation {
    margin: auto 0;
  }

  &__carousel {
    max-width: 90%;
  }

  &__slide {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 130px;
  }
}
</style>
