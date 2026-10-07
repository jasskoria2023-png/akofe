import fs from "node:fs";
import path from "node:path";

const root = "c:/nextjs/test/akofe";
const pub = `${root}/public/images`;
const fail = [];

async function dl(url, destRel) {
  const dest = `${pub}/${destRel}`;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  const res = await fetch(url);
  if (!res.ok) { fail.push(`${res.status} ${url}`); return; }
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

// projects.json
const pjPath = `${root}/src/data/projects.json`;
let pj = fs.readFileSync(pjPath, "utf8");
const urls = [...new Set(pj.match(/https:\/\/akofe\.lk\/akofe\/wp-content\/uploads\/[^"]+/g) || [])];
for (const u of urls) {
  const name = decodeURIComponent(u.split("/").pop()).replace(/[^\w.-]+/g, "-");
  const rel = `projects/${name}`;
  await dl(u, rel);
  pj = pj.split(u).join(`/images/${rel}`);
}
fs.writeFileSync(pjPath, pj);

// executive members
const sitePath = `${root}/src/components/akofe-site.tsx`;
let site = fs.readFileSync(sitePath, "utf8");
const imgs = [...site.matchAll(/image: "([^"]+)"/g)].map((m) => m[1]);
for (const f of imgs) {
  await dl(`https://akofe.lk/akofe/wp-content/uploads/2026/09/${f}`, `members/${f}`);
}
site = site.replace('const executiveImageBase = "https://akofe.lk/akofe/wp-content/uploads/2026/09";', 'const executiveImageBase = "/images/members";');

// unsplash
const un = {
  "photo-1524178232363-1fb2b075b655": "project-1.jpg",
  "photo-1511632765486-a01980e01a18": "project-2.jpg",
  "photo-1521737711867-e3b97375f902": "project-4.jpg",
};
for (const [id, file] of Object.entries(un)) {
  await dl(`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`, `projects/${file}`);
  site = site.replace(new RegExp(`imageUrl\\("${id}", 900\\)`), `"/images/projects/${file}"`);
}
site = site.replace(/const imageUrl = \(id: string, width = 1200\) =>\r?\n\s+`https:\/\/images\.unsplash\.com[^\n]*\r?\n\r?\n/, "");
fs.writeFileSync(sitePath, site);

// css
const cssPath = `${root}/src/app/globals.css`;
let css = fs.readFileSync(cssPath, "utf8");
await dl("https://akofe.lk/akofe/wp-content/uploads/2025/10/countryDirector.jpeg", "countryDirector.jpeg");
await dl("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", "projects/project-4.jpg");
css = css.replace("https://akofe.lk/akofe/wp-content/uploads/2025/10/countryDirector.jpeg", "/images/countryDirector.jpeg");
css = css.replace("https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85", "/images/projects/project-4.jpg");
fs.writeFileSync(cssPath, css);

console.log("downloaded", urls.length, "project urls; failures:", fail);
