import { createRouter, createWebHistory } from 'vue-router';

// import App from "../App.vue"
import HomeView from "../views/HomeView.vue"
import PatientData from "../views/PatientData.vue"

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView
	},	
	{
		path: '/search',
		name: 'Search',
		component: PatientData
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
