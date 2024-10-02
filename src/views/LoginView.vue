<script setup>
import TheLogin from "@/components/TheLogin.vue";
import { useSocialLogin } from "@/stores/SocialLogin";
const socialLogin = useSocialLogin();
</script>
<template>
	<section class="position-relative">
		<!-- handle error in login -->
		<div
			class="alert alert-danger alert-dismissible fade show"
			role="alert"
			v-if="socialLogin.errorMessage"
		>
			<p>
				{{ socialLogin.errorMessage }}
			</p>
			<button
				type="button"
				class="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
				@click="socialLogin.errorMessage = null"
			></button>
		</div>

		<!-- set a loader until finish login -->
		<Teleport to="#app">
			<section
				v-if="socialLogin.loading"
				class="loader-parent d-flex justify-content-center align-items-center"
			>
				<div class="loader"></div>
			</section>
		</Teleport>
		<!-- login form -->
		<TheLogin />
	</section>
</template>

<style scoped>
.loader-parent {
	position: absolute;
	height: 100%;
	width: 100%;
	z-index: 99;
	top: 0;
	background-color: rgba(0, 0, 0, 0.1);
}
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
