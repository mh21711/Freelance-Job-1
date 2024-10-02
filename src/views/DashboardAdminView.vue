<script setup>
import TheHeader from "@/components/dashboardAdmin/TheHeader.vue";
</script>
<template>
	<section class="d-flex">
		<TheHeader class="row-2" />
		<!-- render child pages (files and upload files) -->
		<section class="row-10 container-fluid position-relative">
			<RouterView />
		</section>
	</section>
</template>
<style scoped></style>
