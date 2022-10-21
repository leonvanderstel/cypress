import { createEntries } from '@cypress/mount-utils/create-rollup-entry.mjs'

const config = {
  external: [],
}

export default createEntries({ formats: ['es'], input: 'src/index.ts', config })
