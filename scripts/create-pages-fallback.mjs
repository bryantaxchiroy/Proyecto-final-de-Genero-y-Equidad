import { copyFileSync } from 'node:fs'

// GitHub Pages serves this page when a visitor reloads an internal museum route.
// The URL stays intact so BrowserRouter can render the requested station.
copyFileSync(new URL('../dist/index.html', import.meta.url), new URL('../dist/404.html', import.meta.url))
