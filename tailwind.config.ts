import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { navy: '#172554', accent: '#3156C8', ink: '#182230', muted: '#667085', line: '#EAECF0' }, boxShadow: { soft: '0 10px 35px rgba(16,24,40,.06)' } } }, plugins: [] };
export default config;
