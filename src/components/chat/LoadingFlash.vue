<script setup></script>
<template>
	<div class="loader-flash"><img src="/favicon.svg" alt="loading" /></div>
</template>
<style scoped>
.loader-flash {
	border-radius: 50%;
	margin-right: 40px;
}
.loader-flash img {
	animation: pulse 1s infinite;
	width: 30px;
	height: 30px;
	filter: grayscale(50%);
}

@keyframes pulse {
	0% {
		transform: scale(0.9);
	}
	50% {
		transform: scale(1.3);
	}
	100% {
		transform: scale(0.9);
	}
}
</style>
