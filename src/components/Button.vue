<template>
  <div class="button" @click="$emit('click')">
    <fa-icon class="button__icon" :icon="`fa-solid fa-${icon}`"/>
    <span class="button__label">{{ label }}</span>
  </div>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  $light-color: #ef7e7c;
  $dark-color: #e05b59;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;

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

}
</style>