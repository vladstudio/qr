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

```
qr --colors=black,%23F25602 "hello world"
```

Randomly assigns one of the given colors to each dark module. Use `%23` for `#` (shell escaping). Colors must contrast well against the background for reliable scanning.

## Install

```bash
cd /path/to/qr && bun link
```

Requires [Bun](https://bun.sh).
