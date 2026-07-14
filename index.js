'use strict';
const ITER = 'header-parser-9d4a5a';
async function* asyncRange(start, end, delayMs = 5) {
  for (let i = start; i < end; i++) { await new Promise(r => setTimeout(r, delayMs)); yield { value: i, source: ITER }; }
}
async function collect(gen, limit) {
  const items = [];
  for await (const item of gen) { items.push(item); if (items.length >= limit) break; }
  return items;
}
async function main() {
  console.log(`[${ITER}] Starting async iteration...`);
  const items = await collect(asyncRange(0, 100), 8);
  console.log(`[${ITER}] Collected ${items.length} items`);
  items.forEach(it => console.log(`[${ITER}]  `, JSON.stringify(it)));
}
main().catch(console.error);
