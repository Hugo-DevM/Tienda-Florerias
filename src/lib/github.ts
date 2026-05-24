import { Product, Order } from "@/types";

const GITHUB_API = "https://api.github.com";
const PRODUCTS_FILE = "products.json";
const ORDERS_FILE = "orders.json";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

async function getFile(path: string) {
  const url = `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (res.status === 404) return { content: null, sha: null };
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content: JSON.parse(content), sha: data.sha as string };
}

async function putFile(path: string, data: unknown, sha: string | null, message: string) {
  const url = `${GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${path}`;
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");
  const body: Record<string, string> = { message, content };
  if (sha) body.sha = sha;
  const res = await fetch(url, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Failed to save ${path}: ${await res.text()}`);
}

// ── Products ─────────────────────────────────────────────────────────────────

export async function getProductsFromGitHub(): Promise<{ products: Product[]; sha: string | null }> {
  const { content, sha } = await getFile(PRODUCTS_FILE);
  return { products: content?.products ?? [], sha };
}

export async function saveProductsToGitHub(products: Product[], sha: string | null): Promise<void> {
  await putFile(PRODUCTS_FILE, { products }, sha, `chore: update products ${new Date().toISOString()}`);
}

// ── Orders ───────────────────────────────────────────────────────────────────

export async function getOrdersFromGitHub(): Promise<{ orders: Order[]; sha: string | null }> {
  const { content, sha } = await getFile(ORDERS_FILE);
  return { orders: content?.orders ?? [], sha };
}

export async function saveOrdersToGitHub(orders: Order[], sha: string | null): Promise<void> {
  await putFile(ORDERS_FILE, { orders }, sha, `chore: update orders ${new Date().toISOString()}`);
}
