<template>
  <button class="navigation-button" :disabled="disabled">
    <img
      class="navigation-button__icon"
      src="@/assets/img/icons/arrow-left-icon.svg"
      alt="Navigation icon"
    />
  </button>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.navigation-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  border: none;
  border-radius: 50%;
  background: $grey2;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover:not([disabled]) {
    transform: scale(1.2);
  }

  &--reversed {
    .navigation-button__icon {
      transform: rotate(180deg);
    }
  }

  &:disabled {
    opacity: 0.5;
    cursor: unset;
  }
}
</style>
