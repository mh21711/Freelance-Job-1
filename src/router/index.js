import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

let routes = [
	// home
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	// about
	{
		path: "/about",
		name: "about",
		component: () => import("../views/AboutView.vue"),
	},
	//services
	{
		path: "/serives",
		name: "services",
		component: () => import("../views/ChatView.vue"),
	},
	// chat page
	{
		path: "/chat",
		component: () => import("../views/ModelView.vue"),
		// make sure user is signed in before enter chat model
	},
	{
		path: "/chat/:id",
		component: () => import("../views/ModelView.vue"),
	},
	// login
	{
		path: "/login",
		name: "login",
		component: () => import("../Views/LoginView.vue"),
		meta: {
			checkLgoin: true,
		},
	},
	//sign up
	{
		path: "/signup",
		name: "signup",
		component: () => import("../Views/SignupView.vue"),
	},
	{
		path: "/verify-email",
		name: "verify-email",
		component: () => import("../views/OtpVerifyView.vue"),
	},
	// prices
	{
		path: "/prices",
		name: "prices",
		component: () => import("../views/PricesView.vue"),
	},
	// user dash board
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("../views/DashboardView.vue"),
		// make sure user is signed in
	},
	// admin dash board
	{
		path: "/admin-dashboard",
		name: "admin-dashboard",
		component: () => import("../views/DashboardAdminView.vue"),
		redirect: { name: "files-list" },
		// children
		children: [
			{
				path: "/upload-files",
				name: "upload-files",
				component: () => import("../views/DashboardView.vue"),
			},
			{
				path: "/files-list",
				name: "files-list",
				component: () => import("../components/dashboardAdmin/FilesList.vue"),
			},
			{
				path: "/users-list",
				name: "users-list",
				component: () => import("../components/dashboardAdmin/UsersList.vue"),
			},
			{
				path: "/add-admin",
				name: "add-admin",
				component: () => import("../components/dashboardAdmin/AddAdmin.vue"),
			},
			{
				path: "/modify-plans",
				name: "modify-plans",
				component: () => import("../components/dashboardAdmin/EditPlans.vue"),
			},
			{
				path: "/update-file",
				name: "update-file",
				component: () =>
					import("../components/dashboardAdmin/UpdateFileInformation.vue"),
			},
			{
				path: "/edit-user",
				name: "edit-user",
				component: () =>
					import("../components/dashboardAdmin/UpdateUsersInformation.vue"),
			},
			{
				path: "/statistics",
				name: "statistics",
				component: () =>
					import("../components/dashboardAdmin/Thestatistics.vue"),
			},
		],
	},
	// forget pass
	{
		path: "/forgot-password",
		name: "forgot-password",
		component: () => import("../views/PasswordForget.vue"),
	},
	// reset pass
	{
		path: "/reset-password/:id/:token",
		name: "reset-password",
		component: () => import("../views/PasswordReset.vue"),
		props: true,
	},
	// not found
	{
		path: "/:pathMatch(.*)*",
		name: "NotFound",
		component: () => import("../views/NotfoundView.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// import vue cokkies library
import VueCookies from "vue-cookies";
// before any route
router.beforeEach((to, from, next) => {
	const jwtToken = VueCookies.get("jwt");
	if (to.meta.requireAuth) {
		// Check if the user is authenticated
		if (jwtToken) {
			// User is authenticated, proceed to the route
			next();
		} else {
			// User is not authenticated, redirect to the login page
			next({ name: "login" });
		}
	} else {
		// For routes that do not require authentication, proceed to the route
		next();
	}
});

// check if user is admin or not
router.beforeEach((to, from, next) => {
	const jwtToken = VueCookies.get("jwt");
	const isAdmin = VueCookies.get("access");
	if (to.meta.requireAdminAuth) {
		// Check if the user is authenticated
		if (jwtToken && isAdmin === "true") {
			// User is authenticated, proceed to the route
			next();
		} else {
			// User is not authenticated, redirect to the login page
			next({ name: "NotFound" });
		}
	} else {
		// For routes that do not require authentication, proceed to the route
		next();
	}
});
// redirerct user if he want to access login page after login
router.beforeEach((to, from, next) => {
	const jwtToken = VueCookies.get("jwt");
	if (to.meta.checkLgoin && to.name === "login") {
		if (jwtToken) {
			router.push("/");
		}
	}
	next();
});
export default router;
