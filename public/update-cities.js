const fs = require('fs');
const https = require('https');

function downloadJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function fetchCities() {
  const url = "https://data.gov.il/api/3/action/datastore_search?resource_id=9ad3862c-8391-4b2f-84a4-2d4c68625f4b&limit=10000";
  const json = await downloadJSON(url);
  const set = new Set();
  json.result.records.forEach(r => {
    if (r["שם_ישוב"]) set.add(r["שם_ישוב"].trim());
  });
  const sorted = Array.from(set).sort();
  fs.writeFileSync("public/cities.json", JSON.stringify(sorted, null, 2));
  console.log("✅ cities.json saved");
}

fetchCities();