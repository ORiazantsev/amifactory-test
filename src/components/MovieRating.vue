<template>
  <div class="movie-rating">
    <p class="movie-rating__text">IBDb rating</p>
    <RatingScore :rating="rating" />
  </div>
</template>

<script>
import RatingScore from "@/components/RatingScore.vue";

export default {
  props: {
    rating: { type: [Number, String], default: 0 },
  },

  components: { RatingScore },
};
</script>

<style lang="scss">
.movie-rating {
  &__text {
    color: $grey;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
  }
}
</style>
