<script setup>
import DirectToServicesbutton from "../DirectToServicesbutton.vue";
import backgroundAnimation from "./backgroundAnimation.vue";
import { ref, onMounted } from "vue";
let showText = ref(false);
onMounted(() => {
	showText.value = true;
});
</script>

<template>
	<section
		class="main-parent container-fluid text-container d-flex justify-content-center align-items-center flex-column position-relative"
	>
		<!-- particle animations -->
		<backgroundAnimation />
		<!-- <Transition name="title">
			<h1 v-if="showText" class="animate-charcter">المعرفة المجتمعية</h1>
		</Transition> -->
		<div class="image-continer">
			<img src="/images/logo.svg" alt="logo" />
		</div>
		<transition name="text-one">
			<p v-if="showText" class="text-center animate-charcter">
				أنا منصة ذكاء اصطناعي من الجيل الجديد، أجب على أسئلتك حول المجتمع،
			</p>
		</transition>
		<Transition name="text-two" class="text-center animate-charcter">
			<p v-if="showText">
				أفهم وأحلل الوثائق التي لديك، أرسم لك مشاريعك التنموية وخططك لتنمية
				المجتمعية،
			</p>
		</Transition>
		<Transition name="text-three" class="text-center animate-charcter">
			<p v-if="showText">أفكر معك كيف نصنع أثرا أعمق وتنمية أكثر استدامة.</p>
		</Transition>
		<DirectToServicesbutton> اسألني الآن </DirectToServicesbutton>
	</section>
</template>
<style scoped>
/* animation text */
/* .animate-charcter {
	text-transform: uppercase;
	background-image: linear-gradient(
		-225deg,
		#222222 0%,
		#444444 29%,
		#666666 67%,
		#888888 100%
	);
	background-size: auto auto;
	background-clip: border-box;
	background-size: 200% auto;
	color: #fff;
	background-clip: text;
	text-fill-color: transparent;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: textclip 2s linear infinite;
	display: inline-block;
	font-size: 190px;
}

@keyframes textclip {
	to {
		background-position: 200% center;
	}
} */
/* end animation */

.image-continer img {
	height: 150px;
	opacity: 0.5;
}
section {
	height: calc(100vh - 70px);
}
.text-container h1 {
	font-size: 100px;
}
.text-container p {
	font-size: 30px;
}
@media only screen and (max-width: 992px) {
	.text-container h1 {
		font-size: 60px;
	}
	.text-container p {
		font-size: 20px;
	}
}
/* start transition */

/* start transition */

.title-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.title-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.title-enter-active {
	transition: all 0.5s ease;
}

/* first paragraph transition */
.text-one-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.text-one-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.text-one-enter-active {
	transition: all 0.5s ease 0.2s;
}
/* second paragraph transition */
.text-two-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.text-two-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.text-two-enter-active {
	transition: all 0.5s ease 0.4s;
}

/* third paragraph transition */
.text-three-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.text-three-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.text-three-enter-active {
	transition: all 0.5s ease 0.6s;
}
</style>
