<template>
  <div class="Sidebar">
    <Heading title="Directives"></Heading>
    <div>
      <draggable :list="directives" :group="{ name: 'directives', pull: 'clone', put: false }">
        <div class="directive" v-for="element in directives" :key="element.name">
          <div class="directive-name">{{ element.name }}</div>
          <a
            class="directive-info"
            :href="'https://caddyserver.com/docs/' + element.name"
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
  private directives: any = [
    {
      name: "basicauth",
      arguments: [
        { name: "username", value: "" },
        { name: "password", value: "" }
      ],
      properties: [
        { name: "realm", placeholder: "name", value: "" },
        { name: "resources", placeholder: "list", value: "" }
      ]
    },
    { name: "bind", arguments: [{ name: "host", value: "" }] },
    {
      name: "browse",
      arguments: [
        { name: "[path]", value: "" },
        { name: "[tplfile]", value: "" }
      ]
    },
    {
      name: "errors",
      arguments: [{ name: "logfile", value: "" }],
      properties: [
        { name: "code", placeholder: "file", value: "" },
        { name: "rotate_size", placeholder: "mb", value: "" },
        { name: "rotate_age", placeholder: "days", value: "" },
        { name: "rotate_keep", placeholder: "count", value: "" },
        { name: "rotate_compress", placeholder: "true/false", value: "" }
      ]
    },
    { name: "expvar", arguments: [{ name: "path", value: "" }] },
    { name: "ext", arguments: [{ name: "extensions...", value: "" }] },
    {
      name: "fastcgi",
      arguments: [
        { name: "path", value: "" },
        { name: "endpoint", value: "" },
        { name: "[preset]", value: "" }
      ],
      properties: [
        { name: "root", placeholder: "directory", value: "" },
        { name: "ext", placeholder: "extension", value: "" },
        { name: "split", placeholder: "splitval", value: "" },
        { name: "index", placeholder: "indexfile", value: "" },
        { name: "env", placeholder: "key value", value: "" },
        { name: "except", placeholder: "ignored_paths...", value: "" },
        { name: "upstream", placeholder: "endpoint", value: "" },
        { name: "connect_timeout", placeholder: "duration", value: "" },
        { name: "read_timeout", placeholder: "duration", value: "" },
        { name: "send_timeout", placeholder: "duration", value: "" }
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
    },
    {
      name: "header",
      arguments: [{ name: "path", value: "" }],
      properties: [
        { name: "name", placeholder: "value", value: "" },
        { name: "name", placeholder: "value", value: "" },
        { name: "name", placeholder: "value", value: "" },
        { name: "name", placeholder: "value", value: "" }
      ]
    },
    { name: "import", arguments: [{ name: "pattern", value: "" }] },
    { name: "index", arguments: [{ name: "filenames...", value: "" }] },
    { name: "internal", arguments: [{ name: "path", value: "" }] },
    {
      name: "limits",
      arguments: [],
      properties: [
        { name: "header", placeholder: "size", value: "" },
        { name: "body", placeholder: "[path] size", value: "" }
      ]
    },
    {
      name: "log",
      arguments: [
        { name: "path", value: "" },
        { name: "file", value: "" },
        { name: "[format]", value: "" }
      ],
      properties: [
        { name: "rotate_size", placeholder: "mb", value: "" },
        { name: "rotate_age", placeholder: "days", value: "" },
        { name: "rotate_keep", placeholder: "count", value: "" },
        { name: "rotate_compress", placeholder: "true/false", value: "" },
        { name: "ipmask", placeholder: "ipv4_mask [ipv6_mask]", value: "" },
        { name: "except", placeholder: "paths...", value: "" }
      ]
    },
    {
      name: "markdown",
      arguments: [{ name: "[basepath]", value: "" }],
      properties: [
        { name: "ext", placeholder: "extensions...", value: "" },
        { name: "css", placeholder: "file", value: "" },
        { name: "js", placeholder: "file", value: "" },
        { name: "template", placeholder: "[name] path", value: "" },
        { name: "templatedir", placeholder: "defaultpath", value: "" }
      ]
    },
    {
      name: "mime",
      arguments: [],
      properties: [
        { name: "ext", placeholder: "type", value: "" },
        { name: "ext", placeholder: "type", value: "" },
        { name: "ext", placeholder: "type", value: "" }
      ]
    },
    { name: "on", arguments: [{ name: "event", value: "" }, { name: "command", value: "" }] },
    { name: "root", arguments: [{ name: "path", value: "" }] },
    {
      name: "proxy",
      arguments: [{ name: "from", value: "" }, { name: "to", value: "" }],
      properties: [
        { name: "policy", placeholder: "", value: "" },
        { name: "fail_timeout", placeholder: "", value: "" },
        { name: "max_fails", placeholder: "", value: "" }
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
  overflow-y: scroll;

  .directive-info {
    display: inline-block;
    right: 5px;
    position: absolute;
  }
}
</style>
