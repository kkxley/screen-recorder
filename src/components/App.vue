<template>
  <div id="root">
    <div class="app">
      <Button label="cut" icon="vector-square"/>
      <Button label="screen" icon="image"/>
      <Button label="start" icon="play"/>
      <Button label="exit" icon="door-open" @click="closeApp"/>
    </div>
  </div>
</template>

<script>
import Button from "./Button";

export default {
  name: "App",
  components: {
    Button
  },
  methods: {
    closeApp() {
      window.close();
    }
  }
}
</script>

<style lang="scss" scoped>
#root {
  width: 100%;
  height: 100%;
  display: flex;
}
.app {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: #2f3d49;

  &::v-deep {
    .button + .button {
      border-left: 2px solid #ef7e7c;
    }
  }
}
</style>