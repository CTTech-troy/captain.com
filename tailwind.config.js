export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B1511',
        muted: '#55605A',
        faint: '#8C9690',
        line: '#E3E7E1',
        mist: '#F2F4F0',
        soft: '#FAFAF7',
        danger: '#B4321F',
        forest: {
          950: '#062A1C',
          900: '#093823',
          800: '#0E4A32',
          700: '#125C3E',
          600: '#16734D',
          500: '#1E9460',
          200: '#BFE3CD',
          100: '#DDF0E4',
          50: '#EFF8F2',
        },
        lemon: {
          DEFAULT: '#E6F04A',
          600: '#CAD52B',
          300: '#F0F68A',
          100: '#F8FBD3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '1440px',
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      keyframes: {
        'soft-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.25)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'soft-pulse': 'soft-pulse 2.2s ease-out infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
      },
    },
  },
  plugins: [],
};
