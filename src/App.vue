<template>
  <div id="App">
    <div class="App-heading">
      <h1>
        Caddly
        <span>Alpha</span>
      </h1>
      <h2>Easy Caddyfile building!</h2>
      <div class="App-heading-caddyVersion">For Caddy v0.11.5</div>
    </div>
    <div class="App-container">
      <Editor
        :sites="sites"
        :setActiveSite="setActiveSite"
        :activeSite="activeSite"
        :createSite="createSite"
      ></Editor>
      <Sidebar :directives="this.directives"></Sidebar>
      <Nav :onExportButtonClick="onExportButtonClick"></Nav>
    </div>

    <div v-if="showAlphaWarning">
      <Modal title="Welcome to Caddly ALPHA" :onClose="closeAlphaWarning">
        <div>
          <h4>Easily build caddyfiles with Caddly.</h4>
          <p>
            <b>However...</b> Caddly is stil in alpha.
            <br>There may be some bugs in this application at the moment.
          </p>
          <p>
            The exported Caddyfiles are not guaranteed to be correct
            <br>and might need to be modified manually.
          </p>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Editor from "./components/Editor.vue";
import Sidebar from "./components/Sidebar.vue";
import Nav from "./components/Nav.vue";
import Modal from "./components/Modal.vue";

@Component({
  components: {
    Editor,
    Sidebar,
    Nav,
    Modal
  }
})
export default class App extends Vue {
  private showAlphaWarning: boolean = true;
  private sites: any = [{ name: "127.0.0.1", active: true, directives: [] }];
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
        { name: "ext", placeholder: "extensions...", value: "" },
        { name: "not", placeholder: "paths", value: "" },
        { name: "level", placeholder: "compression_level", value: "" },
        { name: "min_length", placeholder: "min_bytes", value: "" }
      ]
    },
    {
      name: "header",
      arguments: [{ name: "path", value: "" }],
      properties: [
        { name: "name 1", placeholder: "value", value: "" },
        { name: "name 2", placeholder: "value", value: "" },
        { name: "name 3", placeholder: "value", value: "" },
        { name: "name 4", placeholder: "value", value: "" }
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
        { name: "ext 1", placeholder: "type", value: "" },
        { name: "ext 2", placeholder: "type", value: "" },
        { name: "ext 3", placeholder: "type", value: "" }
      ]
    },
    {
      name: "on",
      arguments: [{ name: "event", value: "" }, { name: "command", value: "" }]
    },
    { name: "pprof", arguments: [] },
    {
      name: "proxy",
      arguments: [{ name: "from", value: "" }, { name: "to", value: "" }],
      properties: [
        { name: "policy", placeholder: "name [value]", value: "" },
        { name: "fail_timeout", placeholder: "duration", value: "" },
        { name: "max_fails", placeholder: "integer", value: "" },
        { name: "max_conns", placeholder: "integer", value: "" },
        { name: "try_duration", placeholder: "duration", value: "" },
        { name: "try_interval", placeholder: "duration", value: "" },
        { name: "health_check", placeholder: "path", value: "" },
        { name: "health_check_port", placeholder: "port", value: "" },
        {
          name: "health_check_interval",
          placeholder: "interval_duration",
          value: ""
        },
        {
          name: "health_check_timeout",
          placeholder: "timeout_duration",
          value: ""
        },
        { name: "fallback_delay", placeholder: "delay_duration", value: "" },
        { name: "header_upstream", placeholder: "name value", value: "" },
        { name: "header_downstream", placeholder: "name value", value: "" },
        { name: "keepalive", placeholder: "number", value: "" },
        { name: "timeout", placeholder: "duration", value: "" },
        { name: "without", placeholder: "prefix", value: "" },
        { name: "except", placeholder: "ignored_paths...", value: "" },
        { name: "upstream", placeholder: "to", value: "" },
        { name: "ca_certificates", placeholder: "certs...", value: "" },
        { name: "insecure_skip_verify", placeholder: "true/false", value: "" },
        { name: "preset", placeholder: "", value: "" }
      ]
    },
    {
      name: "push",
      arguments: [
        { name: "path", value: "" },
        { name: "[resources...]", value: "" }
      ],
      properties: [
        { name: "method", placeholder: "method", value: "" },
        { name: "header", placeholder: "name value", value: "" },
        { name: "resources", placeholder: "true/false", value: "" }
      ]
    },
    {
      name: "redir",
      arguments: [
        { name: "from", value: "" },
        { name: "to", value: "" },
        { name: "[code]", value: "" }
      ]
    },
    { name: "request_id", arguments: [{ name: "[header_field]", value: "" }] },
    {
      name: "rewrite",
      arguments: [
        { name: "[not]", value: "" },
        { name: "from", value: "" },
        { name: "to", value: "" }
      ]
    },
    { name: "root", arguments: [{ name: "path", value: "" }] },
    {
      name: "status",
      arguments: [{ name: "code", value: "" }, { name: "path", value: "" }]
    },
    {
      name: "templates",
      arguments: [],
      properties: [
        { name: "path", placeholder: "basepath", value: "" },
        { name: "ext", placeholder: "extensions...", value: "" },
        { name: "between", placeholder: "open_delim close_delim", value: "" }
      ]
    },
    {
      name: "timeouts",
      arguments: [],
      properties: [
        { name: "read", placeholder: "val", value: "" },
        { name: "header", placeholder: "val", value: "" },
        { name: "write", placeholder: "val", value: "" },
        { name: "idle", placeholder: "val", value: "" }
      ]
    },
    {
      name: "tls",
      arguments: [{ name: "of/email/self_signed/cert key", value: "" }]
    },
    {
      name: "websocket",
      arguments: [{ name: "[path]", value: "" }, { name: "command", value: "" }]
    }
  ];

  private closeAlphaWarning() {
    this.showAlphaWarning = false;
  }

  private onExportButtonClick() {
    alert("Not implemented yet");
    // Needs to parse the sites and export the caddyfile
  }

  private setActiveSite(name: string) {
    this.sites = this.sites.map((i: any) =>
      i.name === name ? { ...i, active: true } : { ...i, active: false }
    );
  }

  private createSite(name: string) {
    if (name) {
      if (this.sites.filter((i: any) => i.name === name).length === 0) {
        this.sites.map((i: any) => (i.active = false));

        this.sites.push({
          name,
          directives: [],
          active: true
        });
      }
    }
  }

  private addDirectiveToSite(site: any, directive: any) {
    this.sites = this.sites.map((i: any) => {
      if (i.name === site) {
        i.directives = [...i.directives, directive];
      }

      return i;
    });
  }

  get activeSite() {
    return this.sites.filter((i: any) => i.active)[0];
  }
}
</script>

<style lang='less'>
body {
  margin: 0;
  padding: 20px;
  color: #263238;
  background: #448aff;
  background: -moz-linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  background: -webkit-linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  background: linear-gradient(45deg, #448aff 0%, #2962ff 100%);
  overflow: hidden;
}

@media only screen and (max-width: 750px) {
  body {
    padding: 0;
  }
}

*::-moz-selection {
  background: #ff4757;
  color: #fafafa;
}
*::selection {
  background: #ff4757;
  color: #fafafa;
}

#App {
  width: calc(100vw - 40px);
  height: calc(100vh - 40px);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-rows: 50px auto;
  margin: 0;
  padding: 0;

  .App-heading {
    line-height: 30px;
    display: inline-flex;

    h1 {
      color: #fafafa;
      margin: 0;
      display: inline;

      span {
        text-transform: uppercase;
        padding: 5px 8px 6px 15px;
        font-size: 0.6em;
        background: #ff4757;
        background: -moz-linear-gradient(45deg, #ff4757 0%, #ff6b81 100%);
        background: -webkit-linear-gradient(45deg, #ff4757 0%, #ff6b81 100%);
        background: linear-gradient(45deg, #ff4757 0%, #ff6b81 100%);
        -webkit-clip-path: polygon(100% 0, 100% 100%, 15% 100%, 0 50%, 15% 0);
        clip-path: polygon(100% 0, 100% 100%, 15% 100%, 0 50%, 15% 0);
        vertical-align: middle;
      }
    }

    h2 {
      display: inline;
      margin: 0 20px;
      color: #eeeeee;
    }

    .App-heading-caddyVersion {
      right: 30px;
      position: absolute;
      color: #eeeeee;
      font-weight: bold;
    }
  }

  @media only screen and (max-width: 750px) {
    .App-heading {
      align-items: center;
      justify-content: center;
      display: flex;

      h2 {
        display: none;
      }

      .App-heading-caddyVersion {
        display: none;
      }
    }
  }

  .App-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto 100px;
    grid-template-areas:
      "editor editor editor sidebar"
      "editor editor editor sidebar"
      "editor editor editor sidebar"
      "nav nav nav nav";
    grid-gap: 30px;
    height: 90vh;
    position: relative;

    .Editor {
      grid-area: editor;
    }

    .Nav {
      grid-area: nav;
    }

    .Sidebar {
      grid-area: sidebar;
    }
  }

  @media only screen and (max-width: 750px) {
    .App-container {
      grid-template-areas:
        "editor editor editor editor"
        "editor editor editor editor"
        "sidebar sidebar sidebar sidebar"
        "nav nav nav nav";
      grid-template-rows: auto auto 150px 80px;
      grid-gap: 5px;
      bottom: 0;
      position: absolute;
      height: 93vh;
    }
  }
}

@media only screen and (max-width: 750px) {
  #App {
    width: 100vw;
  }
}

a {
  color: #2962ff;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
}

.directives {
  width: 100%;
  height: calc(100% - 74px);
  position: absolute;
  overflow-y: scroll;
}

.directive {
  margin: 10px;
  padding: 8px;
  border-bottom: 1px solid #dbdbdb;
  background: #ffffff;
  position: relative;
  cursor: crosshair;

  .directive-name {
    font-weight: bold;
    display: inline;
    margin-right: 10px;
    color: #006c96;
  }

  .directive-info {
    display: none;
    color: #006c96;
  }

  .directive-arguments {
    display: inline-block;
    margin-bottom: 5px;
  }

  .directive-argument {
    display: inline-block;
    outline: none;
    border: none;
    color: #008000;
    background: transparent;
    width: 180px;
    background: #f2f2f2;
    margin: 0 5px;
    padding: 5px;
  }

  .directive-properties {
    display: block;
    margin-left: 8px;
  }

  .directive-property {
    display: block;
    width: 400px;
    margin: 0 5px;
    padding: 10px;
  }

  .directive-property label {
    margin-right: 8px;
    vertical-align: middle;
    color: #835234;
  }

  .directive-property input {
    float: right;
    background: #f2f2f2;
    border: none;
    outline: none;
    padding: 5px;
  }

  .directive-remove {
    right: 10px;
    position: absolute;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
}

@media only screen and (max-width: 750px) {
  .directives {
    overflow-x: hidden;
  }

  .directive {
    display: inline-block;
    width: 93%;
    margin: 10px 0;
    padding: 8px;

    .directive-argument {
      width: 118px;
    }

    .directive-property {
      width: 316px;
    }
  }
}

input {
  padding: 5px 10px;
  border: none;
  outline: none;
}

button {
  padding: 5px 10px;
  border: none;
  outline: none;
  margin: 8px;
  display: inline-block;
  color: #ffffff;
  background: #2962ff;
  cursor: pointer;
  transition: 0.1s all cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:hover {
  background: #448aff;
}
</style>
