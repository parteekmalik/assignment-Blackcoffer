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
      screens: {
        mobile: '0px',
        tablet: '600px',
        laptop: '960px',
        desktop: '1280px',
      },
      colors: {
        'main-purple': '#7367F0',
        hoverColor: '#f4f3f4',
        lightBlack: '#2f2b3d',
      },
      text: {
        'custom-sm': '.8125rem',
      },
    },
  },
  plugins: [],
};
