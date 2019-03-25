<template>
  <div class="Heading">{{ title }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Heading extends Vue {
  @Prop() private title!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Heading {
  background: #dbdbdb;
  padding: 8px 10px;
}
</style>
