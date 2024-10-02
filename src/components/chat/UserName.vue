<script setup>
import { ref } from "vue";
import UserSetting from "./UserSetting.vue";
import { onClickOutside } from "@vueuse/core";
// props to show seeting only in side bar
let props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
});
//  stores
import { useUserData } from "@/stores/UserData.js";
let userData = useUserData();

let user = ref("");
let email = ref("");
let userLogo = ref("");
let showSetting = ref(false);
const target = ref(null);

// if condition to check if data is fetched
if (userData.UserName && userData.email) {
	user.value = userData.UserName;
	email.value = userData.email;
	userLogo.value = email.value.slice(0, 2);
}

// functions
let toogleSeeting = () => {
	showSetting.value = !showSetting.value;
};

// detect click outside
onClickOutside(target, () => (showSetting.value = false));
</script>
<template>
	<div
		class="name-parent d-flex justify-content-right align-items-center"
		ref="target"
		@click="toogleSeeting()"
	>
		<span
			class="user-logo d-flex justify-content-center align-items-center ms-3"
		>
			{{ userLogo }}
		</span>
		<span class="user-name text-truncate" dir="ltr">{{ user }}</span>
		<Transition>
			<UserSetting v-if="showSetting && props.show" @click.stop />
		</Transition>
	</div>
</template>
<style scoped>
.name-parent {
	position: relative;
	width: 215px;
	cursor: pointer;
}
.user-logo {
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background-color: #aaa;
	margin-bottom: 10px;
	padding: 10px;
	transform: translateY(5px);
}
.user-name {
	font-weight: bold;
}
.v-enter-from {
	opacity: 0;
	transform: translateY(20px);
}
.v-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.v-enter-active {
	transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}
</style>
