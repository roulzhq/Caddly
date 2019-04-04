import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

interface StoreType {
  state: any;
  mutations: any;
  actions: any;
}

// tslint:disable-next-line
let store: StoreType = {
  state: {
    directives: [
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
          { name: "health_check_interval", placeholder: "interval_duration", value: "" },
          { name: "health_check_timeout", placeholder: "timeout_duration", value: "" },
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
    ],
    sites: [{ name: "127.0.0.1", active: true, directives: [] }]
  },
  mutations: {
    addSite(state: any, site: any) {
      state.sites.push(site);
    },
    removeDirective(state: any, payload: any) {
      state.sites = state.sites.map((i: any) => {
        if (payload.name === i.name) {
          return i.directives.splice(payload.directive, 1);
        }
      });
    }
  },
  actions: {

  },
};

export default new Vuex.Store(store);
