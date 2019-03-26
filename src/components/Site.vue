<template>
  <div class="Site">
    <draggable :list="directives" group="directives" class="directives" @change="clonedDirective">
      <div class="directive" v-for="(element, i) in directives" :key="i">
        <div class="directive-name">{{ element.name }}</div>
        <div class="directive-remove" @click="remove(i)">x</div>
        <div class="directive-arguments">
          <input
            v-for="argument in element.arguments"
            :key="argument.name"
            type="text"
            :placeholder="argument.name"
            v-model="argument.value"
            class="directive-argument"
          >
        </div>

        <div class="directive-properties">
          <div
            v-for="property in element.properties"
            :key="property.name"
            class="directive-property"
          >
            <label>{{ property.name }}</label>
            <input type="text" v-model="property.value" :placeholder="property.placeholder">
          </div>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import draggable from "vuedraggable";

@Component({
  components: {
    draggable
  }
})
export default class Site extends Vue {
  @Prop() private title!: string;

  private labels: any = [];
  private directives: any = [];

  private clonedDirective(e: any) {
    if (e.added) {
      if (
        this.directives.filter((i: any) => i.name === e.added.element.name)
          .length > 1
      ) {
        this.remove(e.added.newIndex);
        alert("You cannot use the same directive twice");
      }
    }
  }

  private remove(i: number) {
    this.directives.splice(i, 1);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Site {
    
}
</style>
