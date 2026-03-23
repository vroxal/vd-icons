import { mkdir, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import slugify from "slugify";
import { generateFonts } from "fantasticon";

const rootDir = process.cwd();
const inputDir = path.join(rootDir, "src/icons");
const outputDir = path.join(rootDir, "dist");
const fontsDir = path.join(outputDir, "fonts");
const startCodepoint = 0xf101;

function getIconId(relativeFilePath) {
  return slugify(relativeFilePath.replace(/\.svg$/i, "").replace(/(\/|\\|\.)+/g, "-"), {
    replacement: "-",
    remove: /['"`]/g
  });
}

async function collectSvgFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const absolutePath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return collectSvgFiles(absolutePath);
      }

      if (entry.isFile() && entry.name.toLowerCase().endsWith(".svg")) {
        return [absolutePath];
      }

      return [];
    })
  );

  return files.flat();
}

async function moveFonts() {
  const entries = await readdir(outputDir, { withFileTypes: true });
  const fontExtensions = new Set([".woff2", ".woff", ".ttf", ".eot"]);

  await mkdir(fontsDir, { recursive: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && fontExtensions.has(path.extname(entry.name)))
      .map((entry) =>
        rename(path.join(outputDir, entry.name), path.join(fontsDir, entry.name))
      )
  );
}

const svgFiles = await collectSvgFiles(inputDir);
const sortedIconIds = svgFiles
  .map((absolutePath) => path.relative(inputDir, absolutePath))
  .map((relativeFilePath) => getIconId(relativeFilePath))
  .sort((a, b) => a.localeCompare(b));

const codepoints = Object.fromEntries(
  sortedIconIds.map((iconId, index) => [iconId, startCodepoint + index])
);

await rm(outputDir, { recursive: true, force: true });
await mkdir(fontsDir, { recursive: true });

await generateFonts({
  inputDir,
  outputDir,
  fontTypes: ["woff2", "woff", "ttf", "eot"],
  assetTypes: ["css", "json"],
  name: "vd-icon",
  prefix: "vd-icon",
  selector: ".vd-icon",
  normalize: true,
  round: 10,
  fontsUrl: "./fonts",
  codepoints
});

await moveFonts();
