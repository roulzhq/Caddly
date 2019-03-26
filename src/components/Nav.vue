<template>
  <div class="Nav">
    <a class="Nav-link Nav-link_primary">Export</a>
    <a class="Nav-link Nav-link_primary">Copy to clipboard</a>
    <a class="Nav-link">Help</a>
    <a class="Nav-link">Report a bug</a>
    <a class="Nav-link" href="https://caddyserver.com/docs" target="_blank">Caddy Documentation</a>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Nav {
  background: #f2f2f2;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  line-height: 80px;
  text-align: center;
  margin: 10px;
}

.Nav-link {
  padding: 16px;
  margin: 10px;
  font-size: 1em;
  transition: 0.1s all cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.Nav-link_primary {
  color: #2962ff;
  border: 2px solid #2962ff;
}

.Nav-link_primary:hover {
  color: #fafafa;
  border: 2px solid transparent;
  background: #448aff;
  background: -moz-linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  background: -webkit-linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  background: linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  text-decoration: none;
}
</style>
