// scripts/export-sass-variables.js

import sassExport from "sass-export";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your SCSS file containing variables
const scssFile = path.resolve(__dirname, "../src/styles/colors.module.scss");

// Helper function to convert RGB(A) to hex
const rgbToHex = (rgb) => {
  // Modify the regex to match decimal values
  const match = rgb.match(
    /^rgba?\((\d+(\.\d+)?),\s*(\d+(\.\d+)?),\s*(\d+(\.\d+)?)(?:,\s*[\d.]+)?\)$/
  );
  if (!match) return rgb; // Return original if it’s not in RGB(A) format

  // Convert each RGB component to a two-digit hex string, rounding if necessary
  const r = Math.round(parseFloat(match[1])).toString(16).padStart(2, "0");
  const g = Math.round(parseFloat(match[3])).toString(16).padStart(2, "0");
  const b = Math.round(parseFloat(match[5])).toString(16).padStart(2, "0");

  console.log("convert", `#${r}${g}${b}`);
  return `#${r}${g}${b}`;
};

// Extract variables
const exported = sassExport
  .exporter({ inputFiles: [scssFile] })
  .getStructured();

// Convert the exported variables to a format suitable for TypeScript
const variables = {};

// Iterate over the variables array
exported.variables.forEach((variable) => {
  const name = variable.name.replace(/^\$/, ""); // Remove the `$` prefix
  const value = variable.compiledValue;

  // Log the name and value before assigning to variables
  console.log(`Name: ${name}, Value: ${value}`); // Log each variable’s name and value

  // Convert RGB values to hex if necessary
  variables[name] = value.startsWith("rgb") ? rgbToHex(value) : value;
});
// Generate TypeScript content
const tsContent = `export const colors = ${JSON.stringify(
  variables,
  null,
  2
)} as const;\n`;

// Write the variables to a TypeScript file
fs.writeFileSync(
  path.resolve(__dirname, "../src/styles/sass-variables.ts"),
  tsContent,
  "utf8"
);

console.log("Sass variables have been exported to sass-variables.ts");
