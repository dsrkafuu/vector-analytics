<script>
import { h, resolveComponent } from 'vue';

export default {
  name: 'AButton',

  props: {
    type: {
      type: String,
      validator: (val) => {
        return ['full-width', 'full-height', 'default'].includes(val);
      },
      default: 'default', // common button by default
    },
    href: { type: String, default: '' },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    external: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  emits: ['click'],
  computed: {
    buttonClasses() {
      return [
        'a-button',
        `a-button-${this.type}`,
        {
          'a-button-disabled': this.disabled,
          'a-button-active': this.active,
          'a-button-loading': this.loading,
        },
      ];
    },
  },

  methods: {
    handleClick(e) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', e);
      }
    },
  },

  render() {
    // init tag
    const tag = this.href ? 'a' : 'div';

    // apply classes and dom props
    const props = {
      class: this.buttonClasses,
      href: this.href,
      onClick: this.handleClick,
      // inherit all non-prop attributes
      ...this.$attrs,
    };

    // if external
    if (this.external) {
      props.target = '_blank';
      props.rel = 'noopener';
    }

    return h(
      tag,
      props,
      this.loading
        ? [h(resolveComponent('AIcon'), { name: 'circle', spin: true })]
        : this.$slots.default
    );
  },
};
</script>

<style lang="scss">
.a-button {
  color: var(--color-font);
  background-color: transparent;
  text-align: center;
  user-select: none;

  // icon support
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: var(--color-hover);
  }

  &-default {
    display: inline-flex;
    border-radius: $radius;
    height: $button-height;
    line-height: $button-height;
    padding: 0 $space-base;
  }

  &-full-width {
    display: flex;
    width: 100%;
    height: $button-height;
    line-height: $button-height;
  }

  &-full-height {
    display: inline-flex;
    height: 100%;
    padding: 0 $space-base;
  }

  &-active {
    color: var(--color-primary);
  }

  &-disabled:hover {
    cursor: not-allowed;
    background-color: transparent;
  }
}
</style>
