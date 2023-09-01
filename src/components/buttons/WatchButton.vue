<template>
  <button class="watch-button">
    <img
      src="@/assets/img/icons/play-icon.svg"
      width="10"
      height="12"
      alt="Play icon"
    />
    <span class="watch-button__text">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: { type: String, default: "" },
  },
};
</script>

<style lang="scss">
.watch-button {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 160px;
  max-width: max-content;
  padding: 12px 14px;
  border: none;
  border-radius: 2px;
  background: $red;
  box-shadow: 2px 2px 4px 0px rgba(61, 61, 61, 0.05);
  cursor: pointer;

  @include tablet-landscape {
    min-width: 180px;
    padding: 16px 24px;
  }

  &__text {
    color: $white;
    font-family: $rubik;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
