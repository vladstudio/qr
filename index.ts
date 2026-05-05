#!/usr/bin/env bun
import qr from "qrcode-generator"
import { writeFileSync } from "node:fs"

const text = process.argv[2]
if (!text) { console.error("usage: qr <text>"); process.exit(1) }

const code = qr(0, "M")
code.addData(text)
code.make()

const n = code.getModuleCount()
const rects = Array.from({ length: n * n }, (_, i) =>
  code.isDark(i % n, (i / n) | 0)
    ? `<rect x="${(i % n) * 10}" y="${((i / n) | 0) * 10}" width="10" height="10"/>`
    : ""
).join("")

writeFileSync(
  `${text.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 50)}.svg`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n * 10} ${n * 10}" shape-rendering="crispEdges">${rects}</svg>`
)
