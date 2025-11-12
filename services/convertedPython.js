const { mapping, banglaDigits } = require("../formating/formate");
const { Print } = require("../core/Print");
const { handleVariables } = require("../core/variables");
const { handleLoop } = require("../core/loop");
const { handleCondition } = require("../core/condition");


const convertedpython =async (code) => {
    let converted = code.replace(/[০-৯]/g, (d) => banglaDigits[d]);
    // Mapping replace 
    mapping.forEach((rule) => {
        converted = converted
            .split(/(".*?"|'.*?')/g)
            .map((part) => {
                if (part.startsWith('"') || part.startsWith("'")) return part;
                return part.replace(rule.from, rule.to);
            })
            .join("");
    });

    // line corrections
    let lines = converted.split("\n");

    lines = lines.map((line) => {
        line = handleVariables(line);
        line = handleCondition(line);
        line = handleLoop(line);
        if (line.trim().startsWith("লিখো")) {
            return Print(line);
        }
        return line;
    });

    return converted

}

module.exports = { convertedpython };