import fs from "fs";
import path from "path";
import powiaty from "../src/data/powiaty.json" assert { type: "json" };
import wojewodztwa from "../src/data/wojewodztwa.json" assert { type: "json" };

const DOMAIN = "https://ibot-agencja-seo.vercel.app";

function url(loc, priority = "0.80") {
  return `
    <url>
      <loc>${DOMAIN}${loc}</loc>
      <priority>${priority}</priority>
    </url>
  `;
}

function generateSitemap() {
  let urls = "";

  // Ana sayfa
  urls += url("/", "1.0");

  // Województwa
  wojewodztwa.forEach((w) => {
    urls += url(`/wojewodztwo/${w.slug}`);
  });

  // Powiaty
  powiaty.forEach((p) => {
    urls += url(`/powiat/${p.slug}`);
  });

  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `.trim();

  const filePath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(filePath, xml);

  console.log("Sitemap başarıyla oluşturuldu!");
}

generateSitemap();
