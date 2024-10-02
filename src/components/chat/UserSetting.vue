<script setup>
import { useRouter } from "vue-router";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	MdLightmodeRound,
	MdLogout,
	RiMoonClearFill,
	MdDeleteTwotone,
} from "oh-vue-icons/icons";
addIcons(MdLightmodeRound, MdLogout, RiMoonClearFill, MdDeleteTwotone);
import VueCookies from "vue-cookies";
import { useDark, useToggle } from "@vueuse/core";
import Swal from "sweetalert2";
//stores
import { useFetchData } from "@/stores/FetchData.js";
const fetchData = useFetchData();
// variables
const isDark = useDark();

const router = useRouter();
let toggleDark = useToggle(isDark);

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
			router.push("/serives");
		}
	});
};

// delte chat alert confirm
let deleteAllChat = () => {
	Swal.fire({
		title: "تأكيد حذف جميع المحادثات",
		text: "هل أنت متأكد أنك تريد حذف جميع المحادثات؟",
		icon: "warning",
		showCancelButton: true,
		confirmButtonText: "نعم، احذف الكل",
		cancelButtonText: "لا، إلغاء",
		reverseButtons: true,
		confirmButtonColor: "#e74c3c", // Red color
	}).then((result) => {
		if (result.isConfirmed) {
			fetchData.deleteAllChat();
		}
	});
};
</script>

<template>
	<div class="setting-toogle d-flex justify-content-evenly flex-column p-2">
		<div
			class="mode-toggle d-flex align-items-center p-2"
			@click="toggleDark()"
		>
			<span v-if="isDark">
				<OhVueIcon name="md-lightmode-round" class="ms-3" />
			</span>
			<span v-else>
				<OhVueIcon name="ri-moon-clear-fill" class="ms-3" />
			</span>
			<p>المظهر</p>
		</div>
		<!-- to delete all chat -->
		<div
			class="delete-all-chat d-flex align-items-center p-2"
			@click="deleteAllChat()"
		>
			<OhVueIcon name="md-delete-twotone" scale="1" class="ms-3" />
			<p>حذف السجل</p>
		</div>
		<!-- log out  -->
		<div class="log-out d-flex align-items-center p-2" @click="logOut">
			<OhVueIcon name="md-logout" scale="1" class="ms-3" />
			<p>تسجيل الخروج</p>
		</div>
	</div>
</template>
<style scoped>
.setting-toogle {
	position: absolute;
	bottom: calc(100% + 10px);
	left: 0;
	border-radius: 15px;
	height: 140px;
	width: 215px;
	background-color: #202123;
}
.log-out {
	border-radius: 10px;
}
p {
	margin: 0;
}
</style>
