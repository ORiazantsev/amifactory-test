<template>
  <button class="add-button">
    <img
      src="@/assets/img/icons/plus-icon.svg"
      width="24"
      height="24"
      alt="Plus icon"
    />
    <p v-if="text" class="add-button__text">{{ text }}</p>
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
.add-button {
  border: none;
  border-radius: 50%;
  background: transparent;
  transition: all 0.5s ease;
  cursor: pointer;

  &:hover {
    filter: brightness(70%);
  }

  &__text {
    color: $white;
    font-size: 14px;
    line-height: 17px;
  }
}
</style>
