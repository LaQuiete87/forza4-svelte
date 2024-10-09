import App from './App.svelte';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;