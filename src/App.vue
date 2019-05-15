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
        ref="editor"
      ></Editor>
      <Sidebar :directives="directives" :addDirective="refs.editor.addDirective"></Sidebar>
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
          <p>
            Feel free to contribute, or look at some known bugs at
            <a
              href="https://github.com/roulzhq/Caddly"
              target="_blank"
            >https://github.com/roulzhq/Caddly</a>
          </p>
          <p></p>
        </div>
      </Modal>
    </div>
    <Modal
      type="input"
      :onClose="() => showExportDialog = false"
      title="Export Caddyfile"
      v-if="showExportDialog"
    >
      <div class="Editor-sites-new-modal">
        <div>
          <label>Indent using:</label>
          <select v-model="spacing" @change="onExportButtonClick">
            <option :value="'\t'">Tabs</option>
            <option :value="'  '">Spaces</option>
          </select>
        </div>

        <div>
          <label>Preview and Edit</label>
          <textarea v-model="caddyfile"></textarea>
        </div>

        <div>
          <label>Filename</label>
          <input type="text" v-model="exportFileName">
        </div>

        <div>
          <button @click="exportFile()">Save as file</button>
          <button @click="copyFile()">Copy to clipboard</button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import Editor from "./components/Editor.vue";
import Sidebar from "./components/Sidebar.vue";
import Nav from "./components/Nav.vue";
import Modal from "./components/Modal.vue";

import { jsonToCaddyfile } from "./parser";

interface Site {
  name: string;
  directives: any[];
  active?: boolean;
}

interface Directive {
  name: string;
  type: "standard" | "middleware";
  arguments?: object[];
  properties?: object[];
}

@Component({
  components: {
    Editor,
    Sidebar,
    Nav,
    Modal
  }
})
export default class App extends Vue {
  private refs: any = {
    editor: {
      // tslint:disable-next-line
      addDirective: () => {}
    }
  };

  private exportFileName = "Caddyfile";
  private caddyfile = "";
  private spacing = "\t";

  private showAlphaWarning: boolean = true;
  private showExportDialog: boolean = false;

  private sites: Site[] = [{ name: "127.0.0.1", active: true, directives: [] }];
  private directives: Directive[] = [
    {
      name: "basicauth",
      type: "standard",
      arguments: [
        { name: "username", value: "", required: true },
        { name: "password", value: "", required: true }
      ],
      properties: [
        { name: "realm", placeholder: "name", value: "", required: false },
        { name: "resources", placeholder: "list", value: "", required: false }
      ]
    },
    {
      name: "bind",
      type: "standard",
      arguments: [{ name: "host", value: "", required: true }],
      properties: []
    },
    {
      name: "browse",
      type: "standard",
      arguments: [
        { name: "[path]", value: "", required: false },
        { name: "[tplfile]", value: "", required: false }
      ],
      properties: []
    },
    {
      name: "errors",
      type: "standard",
      arguments: [{ name: "[logfile]", value: "", required: false }],
      properties: [
        { name: "code", placeholder: "file", value: "", required: false },
        { name: "rotate_size", placeholder: "mb", value: "", required: false },
        { name: "rotate_age", placeholder: "days", value: "", required: false },
        {
          name: "rotate_keep",
          placeholder: "count",
          value: "",
          required: false
        },
        {
          name: "rotate_compress",
          placeholder: "true/false",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "expvar",
      type: "standard",
      arguments: [{ name: "[path]", value: "", required: false }],
      properties: []
    },
    {
      name: "ext",
      type: "standard",
      arguments: [{ name: "extensions...", value: "", required: true }],
      properties: []
    },
    {
      name: "fastcgi",
      type: "standard",
      arguments: [
        { name: "path", value: "", required: false },
        { name: "endpoint", value: "", required: false },
        { name: "[preset]", value: "", required: true }
      ],
      properties: [
        { name: "root", placeholder: "directory", value: "", required: false },
        { name: "ext", placeholder: "extension", value: "", required: false },
        { name: "split", placeholder: "splitval", value: "", required: false },
        { name: "index", placeholder: "indexfile", value: "", required: false },
        { name: "env", placeholder: "key value", value: "", required: false },
        {
          name: "except",
          placeholder: "ignored_paths...",
          value: "",
          required: false
        },
        {
          name: "upstream",
          placeholder: "endpoint",
          value: "",
          required: false
        },
        {
          name: "connect_timeout",
          placeholder: "duration",
          value: "",
          required: false
        },
        {
          name: "read_timeout",
          placeholder: "duration",
          value: "",
          required: false
        },
        {
          name: "send_timeout",
          placeholder: "duration",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "gzip",
      type: "standard",
      arguments: [],
      properties: [
        {
          name: "ext",
          placeholder: "extensions...",
          value: "",
          required: false
        },
        { name: "not", placeholder: "paths", value: "", required: false },
        {
          name: "level",
          placeholder: "compression_level",
          value: "",
          required: false
        },
        {
          name: "min_length",
          placeholder: "min_bytes",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "header",
      type: "standard",
      arguments: [{ name: "path", value: "", required: true }],
      properties: [
        { name: "", placeholder: "value", value: "", required: false },
        { name: "", placeholder: "value", value: "", required: false },
        { name: "", placeholder: "value", value: "", required: false },
        { name: "", placeholder: "value", value: "", required: false }
      ]
    },
    {
      name: "import",
      type: "standard",
      arguments: [{ name: "pattern", value: "", required: true }],
      properties: []
    },
    {
      name: "index",
      type: "standard",
      arguments: [{ name: "filenames...", value: "", required: true }],
      properties: []
    },
    {
      name: "internal",
      type: "standard",
      arguments: [{ name: "path", value: "", required: true }],
      properties: []
    },
    {
      name: "limits",
      type: "standard",
      arguments: [],
      properties: [
        { name: "header", placeholder: "size", value: "", required: false },
        { name: "body", placeholder: "[path] size", value: "", required: false }
      ]
    },
    {
      name: "log",
      type: "standard",
      arguments: [
        { name: "path", value: "", required: true },
        { name: "file", value: "", required: true },
        { name: "[format]", value: "", required: false }
      ],
      properties: [
        { name: "rotate_size", placeholder: "mb", value: "", required: false },
        { name: "rotate_age", placeholder: "days", value: "", required: false },
        {
          name: "rotate_keep",
          placeholder: "count",
          value: "",
          required: false
        },
        {
          name: "rotate_compress",
          placeholder: "true/false",
          value: "",
          required: false
        },
        {
          name: "ipmask",
          placeholder: "ipv4_mask [ipv6_mask]",
          value: "",
          required: false
        },
        { name: "except", placeholder: "paths...", value: "", required: false }
      ]
    },
    {
      name: "markdown",
      type: "standard",
      arguments: [{ name: "[basepath]", value: "", required: false }],
      properties: [
        {
          name: "ext",
          placeholder: "extensions...",
          value: "",
          required: false
        },
        { name: "css", placeholder: "file", value: "", required: false },
        { name: "js", placeholder: "file", value: "", required: false },
        {
          name: "template",
          placeholder: "[name] path",
          value: "",
          required: false
        },
        {
          name: "templatedir",
          placeholder: "defaultpath",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "mime",
      type: "standard",
      arguments: [],
      properties: [
        { name: "", placeholder: "ext type", value: "", required: false },
        { name: "", placeholder: "ext type", value: "", required: false },
        { name: "", placeholder: "ext type", value: "", required: false }
      ]
    },
    {
      name: "on",
      type: "standard",
      arguments: [
        { name: "event", value: "", required: true },
        { name: "command", value: "", required: true }
      ],
      properties: []
    },
    { name: "pprof", type: "standard", arguments: [], properties: [] },
    {
      name: "proxy",
      type: "standard",
      arguments: [
        { name: "from", value: "", required: true },
        { name: "to", value: "", required: true }
      ],
      properties: [
        {
          name: "policy",
          placeholder: "name [value]",
          value: "",
          required: false
        },
        {
          name: "fail_timeout",
          placeholder: "duration",
          value: "",
          required: false
        },
        {
          name: "max_fails",
          placeholder: "integer",
          value: "",
          required: false
        },
        {
          name: "max_conns",
          placeholder: "integer",
          value: "",
          required: false
        },
        {
          name: "try_duration",
          placeholder: "duration",
          value: "",
          required: false
        },
        {
          name: "try_interval",
          placeholder: "duration",
          value: "",
          required: false
        },
        {
          name: "health_check",
          placeholder: "path",
          value: "",
          required: false
        },
        {
          name: "health_check_port",
          placeholder: "port",
          value: "",
          required: false
        },
        {
          name: "health_check_interval",
          placeholder: "interval_duration",
          value: "",
          required: true
        },
        {
          name: "health_check_timeout",
          placeholder: "timeout_duration",
          value: "",
          required: true
        },
        {
          name: "fallback_delay",
          placeholder: "delay_duration",
          value: "",
          required: true
        },
        {
          name: "header_upstream",
          placeholder: "name value",
          value: "",
          required: true
        },
        {
          name: "header_downstream",
          placeholder: "name value",
          value: "",
          required: true
        },
        { name: "keepalive", placeholder: "number", value: "", required: true },
        { name: "timeout", placeholder: "duration", value: "", required: true },
        { name: "without", placeholder: "prefix", value: "", required: true },
        {
          name: "except",
          placeholder: "ignored_paths...",
          value: "",
          required: true
        },
        { name: "upstream", placeholder: "to", value: "", required: true },
        {
          name: "ca_certificates",
          placeholder: "certs...",
          value: "",
          required: true
        },
        {
          name: "insecure_skip_verify",
          placeholder: "true/false",
          value: "",
          required: true
        },
        { name: "preset", placeholder: "", value: "", required: true }
      ]
    },
    {
      name: "push",
      type: "standard",
      arguments: [
        { name: "path", value: "", required: true },
        { name: "[resources...]", value: "", required: false }
      ],
      properties: [
        { name: "method", placeholder: "method", value: "", required: false },
        {
          name: "header",
          placeholder: "name value",
          value: "",
          required: false
        },
        {
          name: "resources",
          placeholder: "true/false",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "redir",
      type: "standard",
      arguments: [
        { name: "from", value: "", required: true },
        { name: "to", value: "", required: true },
        { name: "[code]", value: "", required: false }
      ],
      properties: [
        { name: "if", value: "", required: false },
        { name: "if_op", value: "", required: false }
      ]
    },
    {
      name: "request_id",
      type: "standard",
      arguments: [{ name: "[header_field]", value: "", required: false }],
      properties: []
    },
    {
      name: "rewrite",
      type: "standard",
      arguments: [
        { name: "[not]", value: "", required: false },
        { name: "from", value: "", required: true },
        { name: "to", value: "", required: true }
      ],
      properties: []
    },
    {
      name: "root",
      type: "standard",
      arguments: [{ name: "path", value: "", required: true }],
      properties: []
    },
    {
      name: "status",
      type: "standard",
      arguments: [
        { name: "code", value: "", required: true },
        { name: "path", value: "", required: true }
      ],
      properties: []
    },
    {
      name: "templates",
      type: "standard",
      arguments: [],
      properties: [
        { name: "path", placeholder: "basepath", value: "", required: true },
        {
          name: "ext",
          placeholder: "extensions...",
          value: "",
          required: true
        },
        {
          name: "between",
          placeholder: "open_delim close_delim",
          value: "",
          required: true
        }
      ]
    },
    {
      name: "timeouts",
      type: "standard",
      arguments: [],
      properties: [
        { name: "read", placeholder: "val", value: "", required: false },
        { name: "header", placeholder: "val", value: "", required: false },
        { name: "write", placeholder: "val", value: "", required: false },
        { name: "idle", placeholder: "val", value: "", required: false }
      ]
    },
    {
      name: "tls",
      type: "standard",
      arguments: [
        { name: "of/email/self_signed/cert key", value: "", required: true }
      ],
      properties: []
    },
    {
      name: "websocket",
      type: "standard",
      arguments: [
        { name: "[path]", value: "", required: false },
        { name: "command", value: "", required: true }
      ],
      properties: []
    },
    /* MIDDLEWARE */
    {
      name: "dyndns",
      type: "middleware",
      arguments: [],
      properties: [
        {
          name: "provider",
          placeholder: "cloudflare/yandex",
          value: "",
          required: true
        },
        {
          name: "ipaddress",
          placeholder: "http-url/remote/local/xxx.xxx.xxx.xxx",
          value: "",
          required: true
        },
        {
          name: "auth",
          placeholder: "AuthApikeyToken",
          value: "",
          required: true
        },
        { name: "domains", placeholder: "name.tld", value: "", required: true },
        {
          name: "period",
          placeholder: "XXs/XXm/XXh/XXd",
          value: "",
          required: true
        }
      ]
    },
    {
      name: "authz",
      type: "middleware",
      arguments: [
        {
          namme: "model",
          placeholder: "authz_model.conf",
          value: "",
          required: true
        },
        {
          namme: "policy",
          placeholder: "authz_policy.csv",
          value: "",
          required: true
        }
      ],
      properties: []
    },
    {
      name: "awses",
      type: "middleware",
      arguments: [
        { namme: "domain", placeholder: "/", value: "", required: true }
      ],
      properties: [
        {
          namme: "region",
          placeholder: "us-east-1",
          value: "",
          required: true
        },
        { namme: "domain", placeholder: "domain", value: "", required: true },
        { namme: "role", placeholder: "role", value: "", required: true }
      ]
    },
    {
      name: "awslambda",
      type: "middleware",
      arguments: [
        { namme: "domain", placeholder: "/", value: "", required: true }
      ],
      properties: [
        {
          namme: "aws_region",
          placeholder: "us-east-1",
          value: "",
          required: true
        },
        { namme: "qualifier", placeholder: "prod", value: "", required: true },
        { namme: "include", placeholder: "api-*", value: "", required: true },
        {
          namme: "exclude",
          placeholder: "*-internal",
          value: "",
          required: true
        }
      ]
    },
    {
      name: "cache",
      type: "middleware",
      arguments: [],
      properties: [
        {
          namme: "match_path",
          placeholder: "/assets",
          value: "",
          required: true
        },
        {
          namme: "match_header",
          placeholder: "Content-Type image/jpg image/png",
          value: "",
          required: true
        },
        {
          namme: "status_header",
          placeholder: "X-Cache-Status",
          value: "",
          required: true
        },
        {
          namme: "default_max_age",
          placeholder: "15m",
          value: "",
          required: true
        },
        {
          namme: "path",
          placeholder: "/tmp/caddy-cache",
          value: "",
          required: true
        }
      ]
    },
    {
      name: "cors",
      type: "middleware",
      arguments: [{ namme: "url", placeholder: "", value: "", required: true }],
      properties: [
        { namme: "origin", placeholder: "url", value: "", required: false },
        {
          namme: "methods",
          placeholder: "POST, PUT...",
          value: "",
          required: false
        },
        {
          namme: "allow_credentials",
          placeholder: "true/false",
          value: "",
          required: false
        },
        { namme: "max_age", placeholder: "3600", value: "", required: false },
        {
          namme: "allowed_headers",
          placeholder: "",
          value: "",
          required: false
        },
        {
          namme: "exposed_headers",
          placeholder: "",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "datadog",
      type: "middleware",
      arguments: [
        { namme: "area", placeholder: "area", value: "", required: false }
      ],
      properties: [
        { namme: "statsd", placeholder: "", value: "", required: false },
        { namme: "tags", placeholder: "", value: "", required: false },
        { namme: "namespace", placeholder: "", value: "", required: false },
        { namme: "trace_enabled", placeholder: "", value: "", required: false },
        { namme: "trace_agent", placeholder: "", value: "", required: false },
        { namme: "service_name", placeholder: "", value: "", required: false }
      ]
    },
    {
      name: "expires",
      type: "middleware",
      arguments: [],
      properties: [
        {
          namme: "match",
          placeholder: "some/path/.*.css$ 1y",
          value: "",
          required: true
        }
      ]
    },
    {
      name: "filebrowser",
      type: "middleware",
      arguments: [
        { namme: "[url]", placeholder: "", value: "", required: false },
        { namme: "[scope]", placeholder: "", value: "", required: false }
      ],
      properties: [
        { namme: "database", placeholder: "", value: "", required: false },
        { namme: "auth_method", placeholder: "", value: "", required: false },
        { namme: "auth_header", placeholder: "", value: "", required: false },
        { namme: "recaptcha_key", placeholder: "", value: "", required: false },
        {
          namme: "recaptcha_secret",
          placeholder: "",
          value: "",
          required: false
        },
        { namme: "recaptcha_host", placeholder: "", value: "", required: false }
      ]
    },
    {
      name: "filter",
      type: "middleware",
      arguments: [
        { namme: "rule", placeholder: "rule", value: "rule", required: true }
      ],
      properties: [
        { namme: "content_type", placeholder: "", value: "", required: false },
        {
          namme: "search_pattern",
          placeholder: "",
          value: "",
          required: false
        },
        { namme: "replacement", placeholder: "", value: "", required: false },
        { namme: "path", placeholder: "", value: "", required: false }
      ]
    },
    {
      name: "forwardproxy",
      type: "middleware",
      arguments: [{ namme: "url", placeholder: "", value: "", required: true }],
      properties: [
        {
          namme: "basicauth",
          placeholder: "user password",
          value: "",
          required: false
        },
        { namme: "upstream", placeholder: "", value: "", required: false },
        { namme: "hide_ip", placeholder: "", value: "", required: false },
        {
          namme: "probe_resistance",
          placeholder: "",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "geoip",
      type: "middleware",
      arguments: [
        {
          namme: "path",
          placeholder: "path to the database",
          value: "",
          required: true
        }
      ],
      properties: []
    },
    {
      name: "git",
      type: "middleware",
      arguments: [
        { namme: "[repo]", placeholder: "", value: "", required: false },
        { namme: "[path]", placeholder: "", value: "", required: false }
      ],
      properties: [
        { namme: "repo", placeholder: "repo", value: "", required: false },
        { namme: "path", placeholder: "path", value: "", required: false },
        { namme: "branch", placeholder: "branch", value: "", required: false },
        { namme: "key", placeholder: "key", value: "", required: false },
        {
          namme: "interval",
          placeholder: "interval",
          value: "",
          required: false
        },
        {
          namme: "clone_args",
          placeholder: "args",
          value: "",
          required: false
        },
        { namme: "pull_args", placeholder: "args", value: "", required: false },
        {
          namme: "hook",
          placeholder: "path secret",
          value: "",
          required: false
        },
        { namme: "hook_type", placeholder: "type", value: "", required: false },
        {
          namme: "then",
          placeholder: "command [args...]",
          value: "",
          required: false
        },
        {
          namme: "then_long",
          placeholder: "command [args...]",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "gopkg",
      type: "middleware",
      arguments: [
        { namme: "[path]", placeholder: "path", value: "", required: false },
        { namme: "[vcs]", placeholder: "git etc.", value: "", required: false },
        {
          namme: "[repo-url]",
          placeholder: "repo-url",
          value: "",
          required: false
        }
      ],
      properties: []
    },
    {
      name: "grpc",
      type: "middleware",
      arguments: [
        { namme: "backend_addr", placeholder: "", value: "", required: true }
      ],
      properties: [
        {
          namme: "backend_is_insecure",
          placeholder: "",
          value: "",
          required: false
        }, // no keyword
        {
          namme: "backend_tls_noverify",
          placeholder: "",
          value: "",
          required: false
        }, // no keyword
        {
          namme: "backend_tls_ca_files",
          placeholder: "",
          value: "",
          required: false
        } // no keyword
      ]
    },
    {
      name: "ipfilter",
      type: "middleware",
      arguments: [
        { namme: "basepath", placeholder: "", value: "", required: true }
      ],
      properties: [
        {
          namme: "rule",
          placeholder: "block | allow",
          value: "",
          required: false
        },
        {
          namme: "ip",
          placeholder: "addresses or CIDR ranges to block",
          value: "",
          required: false
        },
        {
          namme: "prefix_dir",
          placeholder: "IP addr directory prefix",
          value: "",
          required: false
        },
        {
          namme: "database",
          placeholder: "/path/to/GeoLite2-Country.mmdb",
          value: "",
          required: false
        },
        {
          namme: "country",
          placeholder: "ISO two letter country codes",
          value: "",
          required: false
        },
        {
          namme: "blockpage",
          placeholder: "blockpage.html",
          value: "",
          required: false
        },
        { namme: "strict", placeholder: "", value: "", required: false } // boolean
      ]
    },
    {
      name: "jwt",
      type: "middleware",
      arguments: [],
      properties: [
        { namme: "path", placeholder: "[path]", value: "", required: true },
        {
          namme: "redirect",
          placeholder: "[location]",
          value: "",
          required: false
        },
        {
          namme: "allow ",
          placeholder: "[claim] [value]",
          value: "",
          required: false
        },
        {
          namme: "deny ",
          placeholder: "[claim] [value]",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "locale",
      type: "middleware",
      arguments: [
        {
          namme: "availableLocales...",
          placeholder: "",
          value: "",
          required: true
        }
      ],
      properties: [
        {
          namme: "detect",
          placeholder: "methods...",
          value: "",
          required: false
        },
        {
          namme: "cookie",
          placeholder: "cookie name",
          value: "",
          required: false
        },
        {
          namme: "available",
          placeholder: "availableLocales...",
          value: "",
          required: false
        },
        { namme: "path", placeholder: "path scope", value: "", required: false }
      ]
    },
    {
      name: "login",
      type: "middleware",
      arguments: [],
      properties: [
        {
          namme: "success_url",
          placeholder: "/after/login",
          value: "",
          required: false
        },
        {
          namme: "cookie_name",
          placeholder: "alternativeName",
          value: "",
          required: false
        },
        {
          namme: "cookie_http_only",
          placeholder: "true",
          value: "",
          required: false
        },
        {
          namme: "simple",
          placeholder: "bob=secret",
          value: "",
          required: true
        },
        {
          namme: "osiam",
          placeholder: "endpoint,client_id,client_secret",
          value: "",
          required: false
        },
        {
          namme: "htpasswd",
          placeholder: "file=users",
          value: "",
          required: false
        },
        {
          namme: "github",
          placeholder: "client_id=xxx,client_secret=yyy",
          value: "",
          required: false
        },
        {
          namme: "google",
          placeholder: "client_id=xxx,client_secret=yyy,scope=email",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "mailout",
      type: "middleware",
      arguments: [
        { namme: "mailout", placeholder: "/mailout", value: "", required: true }
      ],
      properties: [
        {
          namme: "maillog",
          placeholder: "/var/log/caddy/mailout/",
          value: "",
          required: false
        },
        {
          namme: "errorlog",
          placeholder: "/var/log/caddy/mailout/",
          value: "",
          required: false
        },
        {
          namme: "cyr1ll@5chumach3r.fm",
          placeholder: "https://keybase.io/cyrill/key.asc",
          value: "",
          required: false
        },
        {
          namme: "to",
          placeholder: "",
          value: "cyr1ll@5chumach3r.fm",
          required: false
        },
        {
          namme: "subject",
          placeholder: "'Private Blog Contact Form'",
          value: "",
          required: false
        },
        {
          namme: "body",
          placeholder: "/var/www/webspace.com/email.txt",
          value: "",
          required: false
        },
        {
          namme: "username",
          placeholder: "'what_ever_your_username_is@gmail.com'",
          value: "",
          required: false
        },
        {
          namme: "password",
          placeholder: "'NowW3Hav3Th35alad'",
          value: "",
          required: false
        },
        {
          namme: "host",
          placeholder: "smtp.gmail.com",
          value: "",
          required: false
        },
        { namme: "port", placeholder: "587", value: "", required: false },
        {
          namme: "ratelimit_interval",
          placeholder: "24h",
          value: "",
          required: false
        },
        {
          namme: "ratelimit_capacity",
          placeholder: "100",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "minify",
      type: "middleware",
      arguments: [
        { namme: "if", placeholder: "paths...", value: "", required: true }
      ],
      properties: [
        { namme: "if", placeholder: "a cond b", value: "", required: false },
        { namme: "url", placeholder: "[and|or]", value: "", required: false },
        {
          namme: "url",
          placeholder: "[js|css|html|json|svg|xml]",
          value: "",
          required: false
        },
        {
          namme: "url",
          placeholder: "option value",
          value: "",
          required: false
        }
      ]
    },
    {
      name: "nobots",
      type: "middleware",
      arguments: [
        { namme: "bomb path", placeholder: "", value: "", required: true }
      ],
      properties: [
        {
          namme: "",
          placeholder: "Googlebot/2.1 (+http://www.googlebot.com/bot.html)",
          value: "",
          required: false
        }, // no keyword
        { namme: "", placeholder: "DuckDuckBot", value: "", required: false }, // no keyword
        {
          namme: "",
          placeholder: "regexp '^[Bb]ot'",
          value: "",
          required: false
        }, // no keyword
        {
          namme: "",
          placeholder: "regexp 'bingbot'",
          value: "",
          required: false
        } // no keyword
      ]
    }
  ];

  private mounted() {
    this.refs = this.$refs;
  }

  private closeAlphaWarning() {
    this.showAlphaWarning = false;
  }

  private onExportButtonClick(e: Event) {
    this.caddyfile = jsonToCaddyfile(this.sites, this.spacing);
    this.showExportDialog = true;
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

  private exportFile() {
    const blob = new Blob([this.caddyfile], {
      type: "application/octet-binary;charset=utf-8"
    });

    const el: HTMLAnchorElement = document.createElement("a");
    document.body.appendChild(el);
    el.style.display = "none";

    const url = window.URL.createObjectURL(blob);
    el.href = url;
    el.download = this.exportFileName;
    el.click();
    window.URL.revokeObjectURL(url);
  }

  private copyFile() {
    const el: HTMLTextAreaElement = document.createElement("textarea");
    el.value = this.caddyfile;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
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

input,
textarea,
select {
  padding: 5px 0 5px 10px;
  border: none;
  outline: none;
}

button {
  padding: 5px 10px;
  border: none;
  outline: none;
  margin: 8px 8px 8px 0;
  display: inline-block;
  color: #ffffff;
  background: #2962ff;
  cursor: pointer;
  transition: 0.1s all cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

button:hover {
  background: #448aff;
}

.Editor-sites-new-modal {
  width: 100%;
  height: 100%;
  text-align: left;

  label,
  input {
    display: block;
    width: 100%;
  }

  textarea {
    width: 100%;
    max-width: 100%;
    height: 200px;
    max-height: 400px;
  }

  div {
    margin: 10px 0;
  }
}
</style>
