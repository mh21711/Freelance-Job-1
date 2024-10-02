<script setup>
let props = defineProps(["height"]);
</script>
<template>
	<div class="skeleton-paragraph" :style="{ height: props.height }"></div>
</template>
<style scoped>
/* Styles for the skeleton loading effect */
.skeleton-paragraph {
	width: 100%;
	background: linear-gradient(
		90deg,
		rgba(0, 0, 0, 0.1) 20%,
		rgba(0, 0, 0, 0.2) 50%,
		rgba(0, 0, 0, 0.2) 100%
	);
	/* background: linear-gradient(90deg, #5f5f5f 25%, #515151 50%, #656565 75%); */
	background-size: 200% 100%;
	animation: loading 1.5s ease-in-out infinite;
	border-radius: 5px;
	margin-bottom: 10px;
	margin-top: 5px; /* Adjust margin as needed */
}

@keyframes loading {
	0% {
		background-position: -100% 50%;
	}
	100% {
		background-position: 100% 50%;
	}
}
</style>
