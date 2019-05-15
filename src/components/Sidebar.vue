<template>
  <div class="Sidebar">
    <Heading title="Directives"></Heading>
    <div>
      <draggable :list="directives" :group="{ name: 'directives', pull: 'clone', put: false }">
        <div class="directive" v-for="element in directives" :key="element.name" @click="addDirective(element)">
          <div class="directive-name">{{ element.name }}</div>
          <a
            v-if="element.type !== 'middleware'"
            class="directive-info"
            :href="'https://caddyserver.com/docs/' + element.name"
            target="_blank"
          >?</a>
          <a
            v-else
            class="directive-info"
            :href="'https://caddyserver.com/docs/http.' + element.name"
            target="_blank"
          >?</a>
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
  @Prop() private directives: any;
  @Prop() private addDirective: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Sidebar {
  background: #f2f2f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  overflow-y: scroll;

  .directive-info {
    display: inline-block;
    right: 5px;
    position: absolute;
  }
}

@media only screen and (max-width: 750px) {
  .Sidebar {
    box-shadow: none;
  }
}
</style>
