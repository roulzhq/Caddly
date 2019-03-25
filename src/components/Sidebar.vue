<template>
  <div class="Sidebar">
    <Heading title="Directives"></Heading>
    <div>
      <draggable :list="directives" :group="{ name: 'directives', pull: 'clone', put: false }">
        <div class="directive" v-for="element in directives" :key="element.name">
          <div class="directive-name">{{ element.name }}</div>
          <a class="directive-info" :href="'https://caddyserver.com/docs/' + element.name" target="_blank">?</a>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import draggable from "vuedraggable";

import Heading from "./Heading.vue";

@Component({
  components: {
    Heading,
    draggable
  }
})
export default class Sidebar extends Vue {
  @Prop() private msg!: string;
  private directives: any = [
    { name: "root", arguments: [{ name: "path", value: "" }] },
    {
      name: "proxy",
      arguments: [{ name: "from", value: "" }, { name: "to", value: "" }],
      properties: [
        { name: "policy", value: "" },
        { name: "fail_timeout", value: "" },
        { name: "max_fails", value: "" }
      ]
    },
    {
      name: "gzip",
      properties: [
        { name: "ext", value: "" },
        { name: "not", value: "" },
        { name: "level", value: "" },
        { name: "min_length", value: "" }
      ]
    }
  ];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Sidebar {
  background: #f2f2f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  .directive-info {
      display: inline-block;
      right: 5px;
      position: absolute;
    }
}
</style>
