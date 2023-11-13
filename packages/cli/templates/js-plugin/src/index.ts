import { readFileSync } from 'node:fs';
import type { JsPlugin } from '@farmfe/core';

export default function farmDtsPlugin(options: any): JsPlugin {
  return {
    name: '<FARM-JS-PLUGIN-NPM-NAME>',
    priority: 1000,
    config(config: any) {
      return config;
    },
    load: {
      filters: {
        resolvedPaths: ['.js$']
      },
      async executor(params) {
        const { resolvedPath } = params;
        const content = await readFileSync(resolvedPath);
        return {
          content,
          moduleType: 'js'
        };
      }
    },
    transform: {
      filters: {
        moduleTypes: ['js']
      },
      async executor(params) {
        const { content } = params;
        return {
          content,
          moduleType: 'js'
        };
      }
    },
    finish: {
      executor() {}
    }
  };
}
