<template>
  <div class="Modal">
    <div class="Modal-background" @click="onClose(null)"></div>
    <div class="Modal-center">
      <div class="Modal-close" @click="onClose(null)">x</div>
      <Heading :title="title"></Heading>
      <div class="Modal-center-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Heading from "./Heading.vue";

@Component({
  components: {
    Heading
  }
})
export default class Modal extends Vue {
  @Prop() private title!: string;
  @Prop() private type!: string;
  @Prop() private onClose!: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Modal {
  width: 100vw;
  height: 100vh;
  background: #00000040;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .Modal-background {
    width: 100vw;
    height: 100vh;
    background: #00000040;
    position: fixed;
    top: 0;
    left: 0;
  }

  .Modal-close {
    position: absolute;
    top: 0;
    right: 0;
    height: 35px;
    line-height: 32px;
    padding: 0 15px;
    cursor: pointer;
    color: #D22500;
    font-weight: bold;
  }

  .Modal-center {
    width: 500px;
    background: #f2f2f2;
    margin-bottom: 100px;
    -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
      0 6px 6px rgba(0, 0, 0, 0.23);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    z-index: 101;
    position: relative;

    .Modal-center-content {
      padding: 20px;
      width: 100%;
      height: calc(100% - 35px);
    }
  }
}
</style>
