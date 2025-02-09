import './app.css'; // Ensure this file includes Tailwind CSS imports
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')
});

export default app;
