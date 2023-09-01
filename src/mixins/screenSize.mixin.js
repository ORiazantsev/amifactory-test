export const screenSizeMixin = {
  data() {
    return {
      previousWidth: window.innerWidth,

      screenSize: { width: window.innerWidth },
    };
  },

  created() {
    window.addEventListener("resize", this.resizeHandler);
  },

  destroyed() {
    window.removeEventListener("resize", this.resizeHandler);
  },

  methods: {
    resizeHandler() {
      if (this.previousWidth !== window.innerWidth) {
        this.screenSize = {
          width: window.innerWidth,
        };
      }
    },
  },
};
