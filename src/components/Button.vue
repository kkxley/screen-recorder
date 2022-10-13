<template>
  <button :class="['button', {'button_disabled': isDisable}]" @click="$emit('click')" :disabled="isDisable">
    <fa-icon class="button__icon" :icon="`fa-solid fa-${icon}`"/>
    <span class="button__label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  $light-color: #ef7e7c;
  $dark-color: #e05b59;
  $disabled-color: #646464;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  background: none;
  border: none;

  &__label {
    color: $light-color;
    font-size: 18px;
  }

  &__icon {
    color: $light-color;
    font-size: 26px;
  }

  &:hover &__label, &:hover &__icon {
    color: $dark-color;
  }

  &_disabled &__label, &_disabled &__icon {
    color: $disabled-color !important;
  }

}
</style>