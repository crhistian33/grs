import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
          50: '{red.50}',
          100: '{red.100}',
          200: '{red.200}',
          300: '{red.300}',
          400: '{red.400}',
          500: '{red.500}',
          600: '{red.600}',
          700: '{red.700}',
          800: '{red.800}',
          900: '{red.900}',
          950: '{red.950}',
        },
        secondary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}',
        }
        // colorScheme: {
        //     light: {
        //         primary: {
        //             color: '{red.700}',
        //             inverseColor: '#ffffff',
        //             hoverColor: '{red.900}',
        //             activeColor: '{red.800}'
        //         },
        //         highlight: {
        //             background: '{red.950}',
        //             focusBackground: '{red.700}',
        //             color: '#ffffff',
        //             focusColor: '#ffffff'
        //         }
        //     },
        //     dark: {
        //         primary: {
        //             color: '{red.50}',
        //             inverseColor: '{red.950}',
        //             hoverColor: '{red.100}',
        //             activeColor: '{red.200}'
        //         },
        //         highlight: {
        //             background: 'rgba(250, 0, 0, .16)',
        //             focusBackground: 'rgba(250, 0, 0, .24)',
        //             color: 'rgba(255,0,0,.87)',
        //             focusColor: 'rgba(255,0,0,.87)'
        //         }
        //     }
        // }
    }
});
