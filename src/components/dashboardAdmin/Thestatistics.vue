<script setup>
import { ref } from "vue";
import VueCookies from "vue-cookies";
import axios from "axios";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
	LaUsersSolid,
	RiAdminLine,
	GiFiles,
	MdWorkspacepremiumRound,
	MdWorkspacepremiumOutlined,
	MdWorkspacepremium,
} from "oh-vue-icons/icons";
// variables
let statisticInformation = ref([]);
let loading = ref(false);
// fetch statistics
function getStatistics() {
	loading.value = true;
	let jwtToken = VueCookies.get("jwt");
	// make request to back end to post question
	axios
		.get(import.meta.env.VITE_GET_STATISTIC_DATA, {
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${jwtToken}`,
			},
		})
		.then((res) => {
			statisticInformation.value = [
				{
					icon: "md-workspacepremium-outlined",
					name: "مشتركين الخطة المجانية",
					data: res.data.basic_plan,
				},
				{
					icon: "md-workspacepremium-round",
					name: "مشتركين الخطة الأساسية",
					data: res.data.premium_plan,
				},
				{
					icon: "md-workspacepremium",
					name: "مشتركين الخطة الاحترافية",
					data: res.data.enterprise_plan,
				},
				{
					icon: "la-users-solid",
					name: "عدد المستخدمين",
					data: res.data.users_count,
				},
				{
					icon: "ri-admin-line",
					name: "عدد المسؤولين",
					data: res.data.admins_count,
				},
				{
					icon: "gi-files",
					name: "عدد الملفات",
					data: res.data.UserFiles,
				},
			];
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			loading.value = false;
		});
}

getStatistics();

addIcons(
	LaUsersSolid,
	GiFiles,
	RiAdminLine,
	MdWorkspacepremiumRound,
	MdWorkspacepremiumOutlined,
	MdWorkspacepremium
);
</script>
<template>
	<section class="statistics-parent d-flex flex-wrap justify-content-evenly">
		<!-- <div class="statistic-card-parent col-12 col-md-5">
			<div class="the-card">test</div>
		</div> -->
		<div class="loader" v-if="loading"></div>

		<div
			v-if="statisticInformation.length > 0"
			class="statistic-card-parent col-12 col-md-5 d-flex justify-content-evenly flex-column align-items-center col-3 mb-4"
			v-for="statistic in statisticInformation"
		>
			<span class="statistics-icon">
				<OhVueIcon :name="statistic.icon" fill="#222" scale="2" />
			</span>
			<div class="statistics-header">
				<h2 class="h1">{{ statistic.name }}</h2>
			</div>
			<div class="statistics-value">
				<h3 class="h1">{{ statistic.data }}</h3>
			</div>
		</div>
	</section>
</template>
<style scoped>
.statistics-parent {
	margin-top: 100px;
}

.statistic-card-parent {
	height: 200px;
	border: 1px solid #eee;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border-radius: 10px;
	transition: 0.3s;
}

.statistic-card-parent:hover {
	transform: scale(1.1)
}

.statistic-card-parent {
	padding: 10px;
}

.statistics-value {
	color: rgb(0, 121, 0);
}

/* loader */
.loader {
	width: 50px;
	aspect-ratio: 1;
	display: grid;
}
.loader::before,
.loader::after {
	content: "";
	grid-area: 1/1;
	--c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
	background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
		var(--c) 0 50%;
	background-size: 12px 12px;
	animation: l12 1s infinite;
}
.loader::before {
	margin: 4px;
	filter: hue-rotate(45deg);
	background-size: 8px 8px;
	animation-timing-function: linear;
}

@keyframes l12 {
	100% {
		transform: rotate(0.5turn);
	}
}
</style>
