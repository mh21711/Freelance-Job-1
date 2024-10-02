<template>
	<ul class="background">
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
		<li></li>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</template>

<style scoped>
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

.background {
	position: absolute;
	width: 100vw;
	height: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 0;
	background: transparent;
	overflow: hidden;
	z-index: -1;
}
.background li {
	position: absolute;
	display: block;
	list-style: none;
	width: 20px;
	height: 20px;
	/* background: rgba(255, 255, 255, 0.2); */
	background: #f0f0f0;
	animation: animate 19s linear infinite;
}

.background li:nth-child(0) {
	left: 89%;
	width: 170px;
	height: 170px;
	bottom: -170px;
	animation-delay: 1s;
}
.background li:nth-child(1) {
	left: 66%;
	width: 102px;
	height: 102px;
	bottom: -102px;
	animation-delay: 1s;
}
.background li:nth-child(2) {
	left: 55%;
	width: 112px;
	height: 112px;
	bottom: -112px;
	animation-delay: 6s;
}
.background li:nth-child(3) {
	left: 89%;
	width: 146px;
	height: 146px;
	bottom: -146px;
	animation-delay: 1s;
}
.background li:nth-child(4) {
	left: 28%;
	width: 127px;
	height: 127px;
	bottom: -127px;
	animation-delay: 1s;
}
.background li:nth-child(5) {
	left: 65%;
	width: 159px;
	height: 159px;
	bottom: -159px;
	animation-delay: 11s;
}
.background li:nth-child(6) {
	left: 76%;
	width: 112px;
	height: 112px;
	bottom: -112px;
	animation-delay: 13s;
}
.background li:nth-child(7) {
	left: 24%;
	width: 140px;
	height: 140px;
	bottom: -140px;
	animation-delay: 13s;
}
.background li:nth-child(8) {
	left: 62%;
	width: 126px;
	height: 126px;
	bottom: -126px;
	animation-delay: 2s;
}
.background li:nth-child(9) {
	left: 17%;
	width: 168px;
	height: 168px;
	bottom: -168px;
	animation-delay: 24s;
}
.background li:nth-child(10) {
	left: 66%;
	width: 101px;
	height: 101px;
	bottom: -101px;
	animation-delay: 22s;
}
.background li:nth-child(11) {
	left: 56%;
	width: 128px;
	height: 128px;
	bottom: -128px;
	animation-delay: 21s;
}
.background li:nth-child(12) {
	left: 5%;
	width: 148px;
	height: 148px;
	bottom: -148px;
	animation-delay: 44s;
}
.background li:nth-child(13) {
	left: 28%;
	width: 129px;
	height: 129px;
	bottom: -129px;
	animation-delay: 8s;
}
</style>
