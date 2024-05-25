const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'main-purple': '#7367F0',
        hoverColor: '#f4f3f4',
        AsideText: '#2f2b3de6',
        AsideNavSectionText: '#2f2b3d66',
      },
      text:{
        "custom-sm":".8125rem"
      }
    },
  },
  plugins: [],
};
