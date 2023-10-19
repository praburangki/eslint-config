import { vinicuncaESLint } from '@vinicunca/eslint-config';

export default vinicuncaESLint({
  options: {
    ignores: {
      items: [
        '**/fixtures',
      ],
    },

    typescript: {
      tsconfigPath: ['tsconfig.eslint.json'],
    },
  },
});
