<script setup>
import { watchEffect, ref } from "vue";
import { RouterLink } from "vue-router";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

// Retrieve JWT token from cookies
let jwtToken = ref(VueCookies.get("jwt"));
let isAdmin = ref(VueCookies.get("access"));
const router = useRouter();

// logout woth swat alret confirm
let logOut = () => {
	Swal.fire({
		title: "تأكيد تسجيل الخروج",
		text: "هل أنت متأكد أنك تريد تسجيل الخروج؟",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "نعم",
		cancelButtonText: "لا",
		confirmButtonColor: "#e74c3c", // Red color
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			VueCookies.remove("jwt");
			router.push("/");
			window.location.reload();
		}
	});
};

watchEffect(() => {
	jwtToken.value = VueCookies.get("jwt");
	isAdmin.value = VueCookies.get("access");
});
</script>
<template>
	<nav class="navbar navbar-expand-lg bg-light text-center">
		<div class="container">
			<RouterLink to="/" class="navbar-brand">
				<img class="logo-image" src="/favicon.svg" alt="logo"
			/></RouterLink>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNavDropdown">
				<ul class="navbar-nav" style="padding: 0px">
					<li class="nav-item">
						<RouterLink to="/" class="nav-link">الرئيسية</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/about" class="nav-link">من نحن</RouterLink>
					</li>
					<li class="nav-item">
						<RouterLink to="/serives" class="nav-link">اسألني</RouterLink>
					</li>
					<!--!sign up  -->
					<!-- <li class="nav-item login">
            <RouterLink to="/signup" class="nav-link">التسجيل</RouterLink>
          </li> -->

					<!-- prices  -->
					<li class="nav-item signup">
						<RouterLink to="/prices" class="nav-link"> خطط الأسعار</RouterLink>
					</li>

					<!-- user dashboard  -->
					<li class="nav-item signup" v-if="jwtToken && isAdmin === 'false'">
						<RouterLink to="/dashboard" class="nav-link">
							شارك المعرفة
						</RouterLink>
					</li>
					<!-- admin dashboard -->
					<li class="nav-item signup" v-if="jwtToken && isAdmin === 'true'">
						<RouterLink to="/admin-dashboard" class="nav-link">
							لوحة التحكم</RouterLink
						>
					</li>

					<li class="nav-item signup">
						<RouterLink to="/login" class="nav-link" v-if="!jwtToken"
							>تسجيل الدخول</RouterLink
						>
					</li>

					<li
						class="logout nav-item nav-link m-0"
						v-if="jwtToken"
						@click="logOut()"
					>
						تسجيل الخروج
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>
<style scoped>
nav {
	min-height: 70px;
}
.logo-image {
	width: 70px;
	height: 70px;
}
/* active link is handled in main */
ul li {
	line-height: 1.6;
	font-size: 22px;
	margin-right: 20px;
	margin-left: 10px;
}
ul li a {
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease;
}
.logout {
	cursor: pointer;
}
/* active link handle  */
ul li a::before {
	content: " ";
	position: absolute;
	background-color: #2d3250;
	bottom: -100%;
	right: 50%;
	opacity: 0.1;
	width: 5px;
	height: 5px;
	border-radius: 50%;
	transition-duration: 0.5s;
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	-o-transform: translateX(-50%);
	-webkit-border-radius: 50%;
	-moz-border-radius: 50%;
	-ms-border-radius: 50%;
	-o-border-radius: 50%;
}

.router-link-active.router-link-exact-active::before {
	opacity: 1;
	bottom: 0;
}
</style>
