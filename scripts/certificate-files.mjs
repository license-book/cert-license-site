import fs from "node:fs";
import path from "node:path";

export function listCertificateFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...listCertificateFiles(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".json")) result.push(fullPath);
  }
  return result.sort();
}
