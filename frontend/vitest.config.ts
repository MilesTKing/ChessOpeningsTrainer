import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { defineConfig } from 'vitest/config';
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

export default defineConfig({
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
    },
    build: {
        cssMinify: 'lightningcss'
    },
    test: {
        environment: 'happy-dom',
        execArgv: [
            '--localstorage-file',
            path.resolve(os.tmpdir(), `vitest-${process.pid}.localstorage`),
        ],
    },
});