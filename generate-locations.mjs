import fs from "fs";

async function generate() {
  const distRes = await fetch(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/districts/districts.json",
  );
  const distText = await distRes.text();
  const distData = JSON.parse(distText).find((d) => d.type === "table").data;

  const upzRes = await fetch(
    "https://raw.githubusercontent.com/nuhil/bangladesh-geocode/master/upazilas/upazilas.json",
  );
  const upzText = await upzRes.text();
  const upzData = JSON.parse(upzText).find((d) => d.type === "table").data;

  const districts = distData.map((d) => ({
    id: d.id,
    name: d.name,
    bn_name: d.bn_name,
  }));

  const thanas = upzData.map((u) => ({
    id: u.id,
    district_id: u.district_id,
    name: u.name,
    bn_name: u.bn_name,
  }));

  const code = `
export const BD_DISTRICTS = ${JSON.stringify(districts, null, 2)};
export const BD_THANAS = ${JSON.stringify(thanas, null, 2)};
`;

  fs.mkdirSync("lib/data", { recursive: true });
  fs.writeFileSync("lib/data/bd-locations.ts", code);
  console.log("Successfully generated lib/data/bd-locations.ts");
}

generate();
