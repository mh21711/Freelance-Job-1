<script setup>
import DirectToChat from "../components/DirectToChat.vue";
</script>
<template>
	<section class="parent d-flex text-center">
		<article
			class="redirect-container d-flex justify-content-center align-items-center col-12 col-md-6 flex-column"
		>
			<h1>استخدام الجيل التالي من الذكاء الصناعي</h1>
			<DirectToChat class="redirect-btn">ابدأ المحادثة</DirectToChat>
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</article>
		<article class="image-container col-6 d-none d-md-block">
			<img src="/images/logo.svg" loading="lazy" alt="logo" />
		</article>
	</section>
</template>
<style scoped>
h1 {
	margin-bottom: 30px;
}
.parent {
	height: calc(100vh - 96px);
}
.parent article {
	height: 100%;
}
.image-container {
	background-image: linear-gradient(0, #111111 0%, #222222);
}
.redirect-container {
	background-color: #222222;
}
.image-container img {
	height: 100%;
	width: 50vw;
}

.redirect-container h1 {
	font-size: 40px;
	color: white;
}
.redirect-container .redirect-btn {
	position: relative;
	z-index: 1000;
}

@media only screen and (max-width: 992px) {
	.redirect-container h1 {
		font-size: 30px;
	}
}

/* back ground animation */
.area {
	background: #4e54c8;
	background: linear-gradient(to left, #8f94fb, #4e54c8);
	width: 100%;
	height: 100vh;
}

.circles {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: calc(100vh - 100px);
	overflow: hidden;
}

.circles li {
	position: absolute;
	display: block;
	list-style: none;
	width: 20px;
	height: 20px;
	background: rgba(255, 255, 255, 0.2);
	animation: animate 25s linear infinite;
	bottom: -150px;
}

.circles li:nth-child(1) {
	left: 25%;
	width: 80px;
	height: 80px;
	animation-delay: 0s;
}

.circles li:nth-child(2) {
	left: 10%;
	width: 20px;
	height: 20px;
	animation-delay: 2s;
	animation-duration: 12s;
}

.circles li:nth-child(3) {
	left: 70%;
	width: 20px;
	height: 20px;
	animation-delay: 4s;
}

.circles li:nth-child(4) {
	left: 40%;
	width: 60px;
	height: 60px;
	animation-delay: 0s;
	animation-duration: 18s;
}

.circles li:nth-child(5) {
	left: 65%;
	width: 20px;
	height: 20px;
	animation-delay: 0s;
}

.circles li:nth-child(6) {
	left: 75%;
	width: 110px;
	height: 110px;
	animation-delay: 3s;
}

.circles li:nth-child(7) {
	left: 35%;
	width: 150px;
	height: 150px;
	animation-delay: 7s;
}

.circles li:nth-child(8) {
	left: 50%;
	width: 25px;
	height: 25px;
	animation-delay: 15s;
	animation-duration: 45s;
}

.circles li:nth-child(9) {
	left: 20%;
	width: 15px;
	height: 15px;
	animation-delay: 2s;
	animation-duration: 35s;
}

.circles li:nth-child(10) {
	left: 85%;
	width: 150px;
	height: 150px;
	animation-delay: 0s;
	animation-duration: 11s;
}

@keyframes animate {
	0% {
		transform: translateY(0) rotate(0deg);
		opacity: 1;
		border-radius: 0;
	}

	100% {
		transform: translateY(-1000px) rotate(720deg);
		opacity: 0;
		border-radius: 50%;
	}
}
</style>
