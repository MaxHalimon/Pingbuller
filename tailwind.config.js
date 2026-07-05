export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['RobotoLocal', 'Roboto', 'Arial', 'sans-serif']
      },
      colors: {
        plum: {
          950: '#24162c',
          900: '#33253a',
          800: '#49304f',
          700: '#745083',
          300: '#edbfff'
        },
        ink: '#565656',
        mist: '#f9f9f9'
      },
      boxShadow: {
        glow: '0 0 22px rgba(237, 191, 255, 0.42)'
      }
    }
  },
  plugins: []
}
