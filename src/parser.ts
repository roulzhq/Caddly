interface Site {
    name: string;
    directives: any[];
    active?: boolean;
}

export function jsonToCaddyfile(input: Site[]): string {
    let caddyfile = "";

    for (const site of input) {
        let siteString = site.name + " {";


        for (const directive of site.directives) {
            let directiveString = "\n\t" + directive.name;
            let propString = "";

            // Loop through every argument that is filled out
            for (const arg of directive.arguments.filter((i: any) => i.value !== "")) {
                directiveString += " " + arg.value;
            }

            // Loop through every property that is filled out
            for (const prop of directive.properties.filter((i: any) => i.value !== "")) {
                propString += "\t\t" + prop.name + " " + prop.value + "\n";
            }

            // If a property is set for a given argument,
            if (propString !== "") {
                propString = " {\n" + propString + "\t}";
            }

            directiveString += propString;
            siteString += directiveString;
        }

        siteString += "\n}\n\n";

        caddyfile += siteString;
    }

    return caddyfile;
}
