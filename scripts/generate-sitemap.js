const fs = require("fs");
const path = require("path");

// JSON dosyalarını içeri al
const powiaty = require("../src/data/powiaty.json");
const wojewodztwa = require("../src/data/wojewodztwa.json");

// Domain
const DOMAIN = "https://ibot-agencja-seo.vercel.app";

// URL oluşturucu
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

  // XML çıktısı
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>
  `.trim();

  // public/sitemap.xml dosyasına yaz
  const filePath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(filePath, xml);

  console.log("Sitemap başarıyla oluşturuldu!");
}

generateSitemap();
