<script setup>
let year = new Date().getFullYear();
// oh vue icons regester
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiWhatsapp, BiTwitter, MdEmailOutlined } from "oh-vue-icons/icons";
addIcons(BiWhatsapp, BiTwitter, MdEmailOutlined);
</script>
<template>
	<footer>
		<div
			class="footer-container container-fluid d-flex justify-content-between align-items-center text-white"
		>
			<div class="social-container col-4">
				<a
					href="https://twitter.com/i/flow/login?redirect_after_login=%2Fma3rifah_ai"
				>
					<OhVueIcon name="bi-twitter" class="twitter"
				/></a>
				<!-- <OhVueIcon name="bi-facebook" class="facebook" /> -->
				<a href="https://wa.me/+966568886005">
					<OhVueIcon name="bi-whatsapp" class="whats-app" />
				</a>
				<a href="mailto:info@ma3rifah.org">
					<OhVueIcon name="md-email-outlined" class="email" />
				</a>
			</div>
			<!-- copyright -->
			<div dir="ltr">
				<RouterLink to="/">
					<!-- <img src="/favicon.svg" alt="logo" class="image" /> -->
				</RouterLink>
				<span>&#169; </span>
				<span>{{ year }}</span>
			</div>
			<!-- powerd by -->
			<div class="powerd-by" dir="ltr">
				<p>
					Powered by
					<!-- <a
						href="https://impactb.sa/"
						target="_blank"
						rel="noopener noreferrer"
					> -->
					<img src="/images/impact studio-02.png" alt="powerd-by-logo" />
					<!-- </a> -->
				</p>
			</div>
		</div>
	</footer>
</template>
<style scoped>
.image {
	width: 100px;
	height: 100px;
}
.powerd-by p {
	color: #eee;
}
.powerd-by img {
	height: 80px;
}
.social-container .whats-app {
	color: #5ac255;
	width: 35px;
	height: 35px;
	margin: 10px;
}
.social-container .twitter {
	color: #389ef0;
	width: 35px;
	height: 35px;
	margin: 10px;
}
.social-container .email {
	color: #fefefe;
	width: 35px;
	height: 35px;
	margin: 10px;
}
@media (max-width: 768px) {
	.social-container .twitter,
	.social-container .email,
	.social-container .whats-app {
		width: 25px;
		height: 25px;
		margin: 8px;
	}

	.powerd-by {
		width: 170px;
	}

	img {
		width: 170px;
	}
}
</style>
