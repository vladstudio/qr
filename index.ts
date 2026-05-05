#!/usr/bin/env bun
import qr from "qrcode-generator"
import { writeFileSync } from "node:fs"
import { parseArgs } from "node:util"

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    noise: { type: "boolean" },
    colors: { type: "string" },
  },
  strict: true,
  allowPositionals: true,
})

const text = positionals[0]
if (!text) { console.error("usage: qr [--noise] [--colors black,#F25602] <text>"); process.exit(1) }

const colors = values.colors?.split(",") || []
const pick = () => colors[Math.random() * colors.length | 0]

const code = qr(0, "M")
code.addData(text)
code.make()

const n = code.getModuleCount()
const s = values.noise ? 3 : 1
let rects = ""
for (let y = 0; y < n * s; y++)
  for (let x = 0; x < n * s; x++) {
    const inQR = x >= n && x < 2 * n && y >= n && y < 2 * n
    const inQuiet = x >= n - 1 && x <= 2 * n && y >= n - 1 && y <= 2 * n && !inQR
    const dark = values.noise
      ? inQR ? code.isDark(x - n, y - n) : inQuiet ? false : Math.random() < 0.5
      : code.isDark(x, y)
    if (dark) rects += `<rect x="${x * 10}" y="${y * 10}" width="10" height="10"${colors.length ? ` fill="${pick()}"` : ""}/>`
  }

writeFileSync(
  `${text.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n * s * 10} ${n * s * 10}" shape-rendering="crispEdges">${rects}</svg>`
)
