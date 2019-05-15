<template>
  <div class="Editor">
    <Heading title="Editor"></Heading>
    <div class="Editor-sites">
      <div class="Editor-sites-header">
        <div
          class="Editor-sites-header-tab"
          v-for="site in sites"
          :key="site.name"
          @click="setActiveSite(site.name)"
          :class="{active: site.active}"
        >{{ site.name }}</div>
        <button class="Editor-sites-header-newSite" @click="showSiteModal()">+</button>
      </div>
      <div class="Editor-sites-container">
        <keep-alive>
          <Site v-for="site in activeSite" :key="site.name" :directives="siteDirective"></Site>
        </keep-alive>
      </div>
    </div>
    <div v-if="showCreateSiteModal">
      <Modal type="input" :onClose="handleCreateSite" title="Create a new Site">
        <div class="Editor-sites-new-modal">
          <form @submit="handleCreateSite(newSiteName)">
            <label style="display: block;">Name</label>
            <input type="text" v-model="newSiteName" placeholder="Space-seperated list">
            <input type="submit" value="Create"/>
          </form>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import Heading from "./Heading.vue";
import Site from "./Site.vue";
import Modal from "./Modal.vue";

@Component({
  components: {
    Heading,
    Site,
    Modal
  }
})
export default class Editor extends Vue {
  @Prop() private setActiveSite: any;
  @Prop() private createSite: any;
  @Prop() private sites: any;
  @Prop() private activeSite: any;
  @Prop() private addDirectiveToSite: any;

  private showCreateSiteModal: boolean = false;
  private newSiteName: string = "";

  public addDirective(directive: any) {
    this.activeSite.directives.push(directive);
  }

  private showSiteModal() {
    this.showCreateSiteModal = true;
  }

  private handleCreateSite(name: string) {
    this.showCreateSiteModal = false;
    this.newSiteName = "";

    this.createSite(name);
  }

  get siteDirective() {
    return this.activeSite.directives;
  }

  set siteDirective(directive: any) {
    this.addDirectiveToSite(this.activeSite.name, directive);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Editor {
  background: #f2f2f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  position: relative;

  .Editor-sites {
    .Editor-sites-header {
      border-bottom: 4px solid #f2f2f2;
      height: 35px;
      line-height: 35px;
      background: #ffffff;

      .Editor-sites-header-tab {
        display: inline;
        padding: 10px;
        cursor: pointer;
      }

      .active {
        background: #f2f2f2;
      }

      .Editor-sites-header-newSite {
        right: 0;
        position: absolute;
        padding: 0 16px;
        margin: 0;
        line-height: 35px;
      }

      .Editor-sites-header-newSite:hover {
        background: #448aff;
      }
    }
  }
}

@media only screen and (max-width: 750px) {
  .Editor {
    box-shadow: none;
  }
}
</style>
