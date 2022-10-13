<template>
  <div id="root">
    <div class="app">
      <Button label="cut" icon="vector-square" :is-disable="isRecording"/>
      <Button label="screen" icon="image" :is-disable="isRecording"/>
      <Button v-if="recorder === null" label="start" icon="play" @click="startRecord"/>
      <Button v-else label="stop" icon="square" @click="stopRecord"/>
      <Button label="exit" icon="door-open" @click="closeApp" :is-disable="isRecording"/>
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
  data() {
    return {
      recorder: null
    };
  },
  methods: {
    startRecord() {
      window.recorder.start()
          .then(recorder => {
            this.recorder = recorder;
          });
    },
    stopRecord() {
      if (this.recorder) {
        this.recorder();
        this.recorder = null;
      }
    },
    closeApp() {
      window.close();
    },
  },
  computed: {
    isRecording() {
      return this.recorder !== null;
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