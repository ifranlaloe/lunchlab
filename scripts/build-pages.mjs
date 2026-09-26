import { spawnSync } from 'node:child_process'
import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const output = join(root, 'dist', 'lunchlab')
const slidev = join(root, 'node_modules', '.bin', 'slidev')
const pathParts = (process.env.PAGES_BASE_PATH ?? '/lunchlab').split('/').filter(Boolean)

if (pathParts.some(part => !/^[A-Za-z0-9._~-]+$/.test(part))) {
  throw new Error('PAGES_BASE_PATH must be a URL path, such as /lunchlab or /.')
}

const base = pathParts.length ? `/${pathParts.join('/')}/` : '/'
const decks = [
  { entry: 'slides.md', slug: 'zooming-with-c4' },
  { entry: 'resource-scaling.md', slug: 'resource-scaling' },
]

// This directory contains only generated Pages files; leave other dist builds alone.
await rm(output, { recursive: true, force: true })
await mkdir(output, { recursive: true })

for (const { entry, slug } of decks) {
  const result = spawnSync(slidev, [
    'build', entry,
    '--out', join(output, slug),
    '--base', `${base}${slug}/`,
    '--router-mode', 'hash',
  ], { cwd: root, stdio: 'inherit' })

  if (result.error) throw result.error
  if (result.status !== 0) process.exit(result.status ?? 1)
}

await copyFile(join(root, 'site', 'index.html'), join(output, 'index.html'))
await writeFile(join(output, '.nojekyll'), '')
console.log(`Pages site ready in ${output} (base: ${base})`)
