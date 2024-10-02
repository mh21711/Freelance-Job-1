<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { GiRapidshareArrow, BiShare } from "oh-vue-icons/icons";
addIcons(GiRapidshareArrow, BiShare);
</script>
<template>
	<section class="px-2 py-3 mt-1 d-flex justify-content-center">
		<span class="ms-4"> شاركنا المعرفة</span>
		<!-- <OhVueIcon name="gi-rapidshare-arrow" scale="1.5" class="history" /> -->
		<OhVueIcon name="bi-share" scale="1.5" class="history" />
	</section>
</template>
<style scoped>
.new-message {
	color: white;
}
</style>
