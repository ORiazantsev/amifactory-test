<template>
  <div class="rating-score">
    <img
      class="rating-score__icon"
      src="@/assets/img/icons/rating-icon.svg"
      height="20"
      width="20"
      loading="lazy"
      alt="Rating score icon"
    />
    <div>
      <span class="rating-score__value">{{ rating }}</span>
      <span class="rating-score__max-value">/10</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rating: { type: [Number, String], default: 0 },
  },
};
</script>

<style lang="scss">
.rating-score {
  display: flex;
  align-items: center;

  &__icon {
    margin-right: 6px;
  }

  &__value {
    font-size: 28px;
    font-weight: 500;
    margin-right: 5px;
  }

  &__max-value {
    color: $grey;
    font-size: 16px;
  }

  &--small {
    .rating-score__icon {
      width: 16px;
      margin-right: 4px;
    }
    .rating-score__value {
      font-size: 14px;
      margin-right: 2px;
    }
    .rating-score__max-value {
      font-size: 12px;
    }
  }
}
</style>
