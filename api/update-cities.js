import fs from "fs";
import https from "https";
import path from "path";

function downloadJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

export default async function handler(req, res) {
  try {
    const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=10000";
    const json = await downloadJSON(url);

    const citiesSet = new Set();
    json.result.records.forEach(r => {
      if (r["שם_ישוב"]) citiesSet.add(r["שם_ישוב"].trim());
    });

    const sorted = Array.from(citiesSet).sort();

    const filePath = path.join(process.cwd(), "public", "cities.json");
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2));

    res.status(200).send("✅ cities.json updated successfully");
  } catch (err) {
    console.error("❌ Error updating cities:", err);
    res.status(500).send("Error updating cities.json");
  }
}
