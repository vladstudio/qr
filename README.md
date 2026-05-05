# qr

Generate QR code SVGs from the command line.

```bash
qr "hello world"
```

Creates `hello_world.svg` — transparent background, black squares, no settings.

```
qr --noise "hello world"
```

Surrounds the QR code with matching noise squares (3× the size), with a 1-module transparent quiet zone around the code.

## Install

```bash
cd /path/to/qr && bun link
```

Requires [Bun](https://bun.sh).
