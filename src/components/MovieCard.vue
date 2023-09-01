<template>
  <div class="movie-card">
    <img
      class="movie-card__image"
      :class="{ 'movie-card__image--selected': selected }"
      :src="movie.poster"
      :alt="`${movie.title} poster`"
      loading="lazy"
    />

    <div class="movie-card__info">
      <RatingScore
        class="movie-card__rating rating-score--small"
        :rating="movie.imdb_rating"
      />
      <span class="movie-card__title">{{ movie.title }}</span>
    </div>
  </div>
</template>

<script>
import RatingScore from "@/components/RatingScore.vue";

export default {
  props: {
    movie: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
  },

  components: { RatingScore },
};
</script>

<style lang="scss">
.movie-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;

  &:hover {
    & > :first-child {
      filter: brightness(70%);
    }
  }

  &__image {
    width: 100%;
    max-height: 260px;
    flex-grow: 1;
    padding: 1rem 1rem 0;
    margin-bottom: 8px;
    object-fit: cover;
    transition: all 0.5s ease;
    cursor: pointer;

    @include tablet-landscape {
      max-height: none;
      padding: 0;
    }

    &--selected {
      padding: 0;
      max-height: 280px;
    }
  }

  &__info {
    height: 6.8rem;
  }

  &__rating {
    margin-bottom: 4px;
  }

  &__title {
    display: block;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
  }
}
</style>
