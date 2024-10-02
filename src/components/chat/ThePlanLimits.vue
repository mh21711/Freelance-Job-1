<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiLightningFill } from "oh-vue-icons/icons";

import Swal from "sweetalert2"; // Import SweetAlert

let router = useRouter();

//  fetch limit store
import { useUserData } from "@/stores/UserData";
import { useUserLimits } from "@/stores/UserLimits";
const userData = useUserData();
let userLimits = useUserLimits();
// toggle models of (win points and exchange points) store
import { useToggleModals } from "@/stores/ToogleModals";
let toggleModals = useToggleModals();

// fetch data
let textNum = ref(null);
let VoiceNum = ref(null);
let imageNum = ref(null);
let pointsNum = ref(null);

watchEffect(() => {
	textNum.value = userLimits.textNum;
	VoiceNum.value = userLimits.voiceNum;
	imageNum.value = userLimits.imageNum;
});

watchEffect(() => {
	pointsNum.value = userData.pointsNum;
});

// Function to show SweetAlert modal
const showWinPointsModal = () => {
	Swal.fire({
		title: "تحصيل النقاط",
		text: "يمكنك الحصول على النقاط من خلال رفع الملفات. سيتم منحك 20 نقطة عن كل ملف يتم قبوله من قبل المسؤول.",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		confirmButtonText: "نعم، تحصيل النقاط",
		cancelButtonText: "إلغاء",
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			router.push("/dashboard");
		}
	});
};

// fetch user limits
userLimits.getUserLimits();
// add icons
addIcons(BiLightningFill);
</script>

<template>
	<section
		class="limit-container d-flex flex-column justify-content-center align-items-right"
	>
		<!-- <span class="icon"><OhVueIcon name="bi-lightning-fill" /></span> -->
		<span class="icon"><img src="/favicon.svg" alt="logo" /></span>
		<span> الكلمات : {{ textNum || 0 }}</span>
		<span> المحادثة الصوتية : {{ VoiceNum || 0 }}</span>
		<span> الصور : {{ imageNum || 0 }}</span>
		<span> النقاط : {{ pointsNum || 0 }}</span>
		<!-- buttons to show models fotr win and exchange points -->
		<div
			class="points-parent d-flex justify-content-between align-items-center text-center mt-2"
		>
			<span class="win-points col-5" @click="showWinPointsModal">
				تحصيل نقاط
			</span>
			<span
				class="exchange-points col-5"
				@click="toggleModals.toggleShowExchangeModal"
			>
				استبدال النقاط
			</span>
		</div>
	</section>
</template>
<style scoped>
.limit-container {
	min-height: 220px;
	position: relative;
	padding: 5px 10px;
	width: 100%;
	background-color: #031011;
	border: 3px solid #222;
	border-radius: 10px;
}
.icon {
	position: absolute;
	top: 0;
	right: 50%;
	transform: translate(50%, -50%);
	height: 50px;
	width: 50px;
	background-color: #222;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.icon img {
	height: 50px;
	width: 50px;
	filter: grayscale(50%);
	transform: translateX(-2px);
}
.icon svg {
	fill: #031011;
}
.points-parent span {
	border: 1px solid #222;
	background-color: #111;
	border-radius: 10px;
	padding: 6px;
	transition: 0.3s;
	cursor: pointer;
}
.points-parent span:hover {
	background-color: #555;
}
/* make cancel button in other direction */
</style>
