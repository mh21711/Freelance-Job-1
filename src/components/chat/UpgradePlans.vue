<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiStars } from "oh-vue-icons/icons";
addIcons(BiStars);
</script>

<template>
	<RouterLink
		to="/prices"
		class="upgrade-cont text-decoration-none text-white d-flex"
	>
		<span class="ms-2"> خطط الأسعار </span>
		<OhVueIcon name="bi-stars" scale="1.5" />
	</RouterLink>
</template>
<style scoped>
.upgrade-cont {
	width: 215px;
	padding: 10px;
	position: fixed;
	bottom: 100px;
	border-radius: 10px;
	transition-duration: 0.3s;
}
.upgrade-cont:hover {
	background-color: #444;
}
</style>
