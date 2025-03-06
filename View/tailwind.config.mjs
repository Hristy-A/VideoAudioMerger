import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [daisyui],
  daisyui: {
    themes: [
      'light',
      {
        night: {
          // night theme colors from v4
          primary: '#38bdf8',
          'primary-content': '#010d15',
          secondary: '#818cf8',
          'secondary-content': '#060715',
          accent: '#f471b5',
          'accent-content': '#14040c',
          neutral: '#1e293b',
          'neutral-content': '#cdd0d5',
          'base-100': '#0f172a',
          'base-200': '#0c1425',
          'base-300': '#0a1120',
          'base-content': '#c8cbd0',
          info: '#0ca5e9',
          'info-content': '#000000',
          success: '#2dd4bf',
          'success-content': '#01100d',
          warning: '#f4bf50',
          'warning-content': '#140d02',
          error: '#fb7085',
          'error-content': '#150406',
        },
      },
    ],
  },
};
