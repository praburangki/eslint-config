import type { TypedFlatConfigItem } from 'src/types';

import { OFF } from '../flags';
import { pluginSonar } from '../plugins';

export async function sonar(): Promise<Array<TypedFlatConfigItem>> {
  return [
    {
      name: 'vinicunca/sonar/rules',
      plugins: {
        sonar: pluginSonar,
      },

      rules: {
        ...pluginSonar.configs.recommended.rules,

        'sonar/todo-tag': OFF,
        'sonar/pseudo-random': OFF,
      },
    },
  ];
};
