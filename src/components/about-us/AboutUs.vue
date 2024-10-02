<script setup>
import { onMounted, ref } from "vue";
let showElement = ref(false);
let paragraphText = ref("");
let textLength = ref(0);
// show spin to the logo
let startSpin = ref(false);

// to show the icon as it is thinking
let cursorVisible = ref(true); // Flag to control cursor visibility

// Text to be typed out
const originalText =
	"أنا منصة معرفة مجتمعية أجمع بين جميع المعارف ذات الصلة بالقطاع المجتمعي في المملكة العربية السعودية، وتمتد لتشمل الدول العربية بشكل عام. أقوم على قراءة وتحليل وفهم وثائق القطاع المختلفة بغرض توفير إطار شامل ومفيد يسهم في تعزيز فهم القضايا المجتمعية وتطوير حلولها.";

onMounted(() => {
	showElement.value = true;
	showCursor();
});

// Method to gradually update the length of the displayed text
const typeText = () => {
	const typingInterval = 20; // Adjust typing speed here (in milliseconds)
	const maxTextLength = originalText.length;

	setInterval(() => {
		if (textLength.value <= maxTextLength) {
			paragraphText.value = originalText.slice(0, textLength.value);
			textLength.value++;
		} else {
			clearInterval(); // Stop the typing animation when text is fully displayed
			cursorVisible.value = false; // Hide cursor when typing is finished
		}
	}, typingInterval);
};
// Method to show pulsing cursor before text appears
const showCursor = () => {
	setTimeout(() => {
		cursorVisible.value = true;
		startSpin.value = true;
		typeText();
	}, 1000); // Adjust delay before cursor appears here (in milliseconds)
};
</script>

<template>
	<section class="about-container" ref="whoUsRef">
		<TransitionGroup name="fade-in">
			<div
				class="section-container container d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-between text-center text-md-end"
				v-if="showElement"
			>
				<h1>من أنا</h1>
				<div class="about-paragraphs col-12 col-md-7">
					<p class="ifon-cont">
						{{ paragraphText }}
						<!-- add icon -->
						<span v-if="cursorVisible" class="cursor"
							><img src="/favicon.svg" alt="curser"
						/></span>
					</p>
				</div>
			</div>
		</TransitionGroup>
		<div
			class="image-container d-flex justify-content-center align-items-center"
		>
			<img src="/images/logo.svg" alt="logo" loading="lazy" />
		</div>
	</section>
</template>

<style scoped>
.about-container {
	min-height: 100vh;
}

.section-container {
	min-height: 100vh;
}

.about-container h1 {
	font-size: 100px;
}

.about-paragraphs p {
	font-size: 40px;
}

@media only screen and (max-width: 992px) {
	.about-paragraphs p {
		font-size: 30px;
	}
}
/* image curser */
.cursor img {
	width: 50px;
	height: 50px;
	animation: pulse-animation infinite 0.3s linear;
}

/* tart curser animation */
@keyframes pulse-animation {
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.1);
	}
	100% {
		transform: scale(1);
	}
}

/* style image */
.image-container {
	min-height: 90vh;
	background-color: #000000;
	background-color: #000000;
	background-image: linear-gradient(315deg, #000000 0%, #222222 74%);
}

.image-container img {
	height: 90vh;
	width: 90vw;
}

/* transition abou us section */
.fade-in-enter-from {
	opacity: 0;
	transform: translateY(30px);
}

.fade-in-enter-to {
	opacity: 1;
	transform: translateY(0);
}

.fade-in-enter-active {
	transition: all 0.5s ease;
}
</style>
