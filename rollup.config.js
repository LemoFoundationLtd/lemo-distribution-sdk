import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import pkg from './package.json'

export default [
    {
        input: 'lib/index.js',
        external: ['axios', 'bignumber.js', 'lemo-tx'],
        output: [
            {file: pkg.main, format: 'cjs'}, // CommonJS (for Node) build
        ],
        plugins: [replace({'process.env.SDK_VERSION': JSON.stringify(pkg.version)})],
    },
    {
        input: 'lib/index.js',
        external: ['axios', 'bignumber.js', 'lemo-tx'],
        output: [
            {file: pkg.module, format: 'esm'}, // ES module (for Rollup and webpack) build
        ],
        plugins: [
            replace({
                'process.browser': 'true',
                'process.env.SDK_VERSION': JSON.stringify(pkg.version),
            }),
            babel({
                exclude: 'node_modules/**',
            }),
        ],
    },
]
