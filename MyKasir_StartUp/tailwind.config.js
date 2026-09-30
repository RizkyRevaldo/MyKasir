import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: '#1CB93D',       /* Hijau Utama */
                primaryHover: '#169932',
                secondary: '#F3C931',     /* Kuning Aksen */
                darkText: '#1A1A1A',      /* Teks Heading */
                bodyText: '#4A4A4A',      /* Teks Body */
                surface: '#FFFFFF',
                background: '#FAFAFA',
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                script: ['"Aguafina Script"', 'cursive'],
                serif: ['Adamina', ...defaultTheme.fontFamily.serif],
            },
        },
    },

    plugins: [forms],
};