import fs from "node:fs/promises";
import path from "node:path";

const root = () => process.env.STORAGE_PATH || path.join(process.cwd(), "storage");

export async function putFile(key: string, data: Buffer, _contentType: string) {
  const dest = path.join(root(), key);
  await fs.mkdir(path.dirname(dest), { recursive: true });
  await fs.writeFile(dest, data);
  return key;
}

export async function getFile(key: string) {
  const dest = path.join(root(), key);
  return fs.readFile(dest);
}

export function filePath(key: string) {
  return path.join(root(), key);
}
