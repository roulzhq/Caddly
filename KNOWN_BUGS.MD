# Known Bugs
## Directives
- The header directive can be used multiple times or can take multiple directives
- The mime directive can be used multiple times or can take multiple directives
- The redir directive can be used multiple times or can take multiple directives + has conditions which are not supported
- The rewrite directive supports rules
- several directives have type boolean, the string value is fetched as true/false atm. Default and fallback is false
  - a "type" attribute should be added to the draggable list json
- the TLS directive has a number of different options and options for the Cert/Key variant
## Layout
- responsive layout
- The App-container height should be calculated based on the device type for responsiveness
- If there are to many Sites the tab layout will be broken
- There is no difference in http.directives, dns.directives, hooks etc.