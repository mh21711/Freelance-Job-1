<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// stores
import { useEmailStore } from "@/stores/EmailStore";
import { useSocialLogin } from "@/stores/SocialLogin";
let emailStore = useEmailStore();
let socialLogin = useSocialLogin();

// oh vue icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiGoogle, BiLinkedin, BiTwitter } from "oh-vue-icons/icons";

// regester icons
addIcons(BiGoogle, BiLinkedin, BiTwitter);

const router = useRouter();
let email = ref("");
let password = ref("");
let errorMsg = ref("");
let connecting = ref(false);

let login = async () => {
	// "email_verified": false
	try {
		connecting.value = true;
		const response = await axios.post(import.meta.env.VITE_LOGIN_API, {
			email_or_name: email.value,
			password: password.value,
		});

		if (response.data && response.data["jwt token"]) {
			// check if email is verfied
			if (response.data.email_verified === true) {
				// Set jwt to 14 days using vue-cookies
				VueCookies.set("jwt", response.data["jwt token"], 60 * 60 * 24 * 3);
				VueCookies.set("access", response.data["is_admin"], 60 * 60 * 24 * 3);
				connecting.value = false;
				// Redirect to chat or show a message
				// check if admin to redirect it to admin panel
				if (response.data["is_admin"]) {
					Swal.fire({
						title: "تم تسجيل الدخول",
						text: "سيتم تحويلك الي لوحة التحكم",
						icon: "success",
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
					});
					setTimeout(() => {
						router.push("/admin-dashboard");
						setTimeout(() => {
							location.reload();
						}, 300);
					}, 2000);
				} else {
					//  if it is normal user (non admin)
					Swal.fire({
						title: "تم تسجيل الدخول",
						text: "سيتم تحويلك الي المحادثة",
						icon: "success",
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
					});
					// redirect to chat after 2s
					setTimeout(() => {
						router.push("/chat");
					}, 2000);
					setTimeout(() => {
						location.reload();
					}, 2500);
				}
				// reset data
				email.value = "";
				password.value = "";
			} else {
				// handle email not verified
				Swal.fire({
					icon: "question",
					title: "التحقق من البريد الإلكتروني",
					text: "الرجاء التحقق من بريدك الإلكتروني للحصول على الكود السري",
				});
				emailStore.sendOtp(email.value);
				// reset data
				email.value = "";
				password.value = "";
			}
		} else {
			// Handle unexpected response structure
			connecting.value = false;
			errorMsg.value = "خطأ غير متوقع";
		}
	} catch (error) {
		// Handle errors
		if (error.response && error.response.data && error.response.data.detail) {
			errorMsg.value = error.response.data.detail;
		} else {
			errorMsg.value = "حدث خطأ";
		}
		connecting.value = false;
	}
};

// open links for google login
function openGoogle() {
	window.location.href =
		"https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://ma3rifah.org/login/&prompt=consent&response_type=token&client_id=1066736221829-vut81ib16avjd3igeptmf8di3ph0fo6o.apps.googleusercontent.com&scope=openid%20email%20profile";
}
// open links for linkedin login

function openLinkedIn() {
	window.location.href = `https://impactstudio.pythonanywhere.com/api/user/linkedin/login/`;
}

// open links for twitter login

function openTwitter() {
	window.location.href = `https://impactstudio.pythonanywhere.com/api/user/twitter/login/`;
}

// check the url and get key
function getUrl() {
	// get for google
	const currentUrl = window.location.href;
	const urlParams = new URLSearchParams(currentUrl.split("#")[1]);
	const accessTokenGoogle = urlParams.get("access_token");
	// get for twitter and linked in
	const urlParam = new URLSearchParams(currentUrl.split("?")[1]);
	const accessCodeLinkedin = urlParam.get("code");
	const oauthToken = urlParam.get("oauth_token");
	const oauthVerifier = urlParam.get("oauth_verifier");
	if (accessTokenGoogle) {
		socialLogin.googleLogin(accessTokenGoogle);
	} else if (accessCodeLinkedin) {
		socialLogin.linkedinLogin(accessCodeLinkedin);
	} else if (oauthToken && oauthVerifier) {
		socialLogin.twitterLogin(oauthToken, oauthVerifier);
	}
}

// get url if uer used social media
onMounted(() => {
	getUrl();
});
</script>

<template>
	<section>
		<div class="container">
			<div class="form">
				<div class="">
					<div class="">
						<div class="">
							<h3>مرحبا بك</h3>
							<div class="error-msg-cont">
								<Transition>
									<p style="color: red" v-if="errorMsg">
										{{ errorMsg }}
									</p>
								</Transition>
							</div>
							<form @submit.prevent="login()" @input="errorMsg = ''">
								<div class="form-outline mb-4">
									<input
										id="typeEmailX-2"
										class="form-control form-control-lg"
										placeholder="البريد الإلكتروني "
										required
										v-model.trim="email"
									/>
								</div>

								<div class="form-outline mb-4">
									<input
										type="password"
										id="typePasswordX-2"
										class="form-control form-control-lg"
										placeholder="كلمة السر"
										required
										v-model.trim="password"
									/>
								</div>
								<button class="btn btn-primary btn-lg btn-block" type="submit">
									<span class="spinner-border" role="status" v-if="connecting">
									</span>
									<span v-else> تسجيل الدخول </span>
								</button>

								<!-- Checkbox -->
								<div>
									<div class="form-check d-flex justify-content-evenly mb-1">
										<!-- !foget pass word -->
										<p>لا تملك حسابا؟ <router-link to="/signup" class="new_link"> إنشاء حساب جديد</router-link></p>
									</div>
									<div class="form-check d-flex justify-content-evenly mb-1">
										<p>  اعادة تعيين كلمة المرور؟<router-link to="/forgot-password"
											class="new_link">إعادة تعيين كلمة المرور</router-link
										></p>
									</div>
								</div>
							</form>
							<div id="line"><span>أو</span></div>

							<!-- sign in with social -->
							<div class="socila-container">
								<!-- google -->

								<!-- @click="socialLogin.openGoogle" -->
								<button
									@click.once="openGoogle"
									class="btn btn-lg btn-block btn-primary mb-2 google"
									type="submit"
									style="border-color: rgb(221, 75, 57);"
								>
									<span>
										<OhVueIcon name="bi-google" style="color: rgb(221, 75, 57)" />
										الاستمرار مع Google
									</span>
								</button>

								<!-- linkedin -->

								<!-- @click="socialLogin.openLinkedIn" -->
								<button
									@click.once="openLinkedIn"
									class="btn btn-lg btn-block btn-primary mb-2 linkedin"
									type="submit"
									style="border-color: rgb(0, 119, 181);"
								>
									<span>
										<OhVueIcon name="bi-linkedin" style="color: rgb(0, 119, 181)" />
										الاستمرار مع Linkedin
									</span>
								</button>

								<!-- twitter   -->

								<!-- @click="socialLogin.openTwitter" -->
								<button
									@click="openTwitter"
									class="btn btn-lg btn-block btn-primary mb-2 twitter"
									type="submit"
									style="border-color: rgb(29, 161, 242)"
								>
									<span>
										<OhVueIcon name="bi-twitter" style="color: rgb(29, 161, 242)" />
										الاستمرار مع Twitter
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.google:hover {
	background-color: rgb(221, 75, 57);
	color: white;
}
button:hover .ov-icon {
	color: white !important;
} 
input::placeholder {
	transition: 0.3s;
}
input:focus::placeholder {
	color: transparent;
}
.linkedin:hover {
	background-color: rgb(0, 119, 181);
	color: white;
}
.twitter:hover {
	background-color: rgb(29, 161, 242);
	color: white;
}
button {
	width: 100%;
	margin-bottom: 20px;
}
.socila-container button {
	background-color: white;
	display: flex;
	justify-content: flex-start;
	color: black;
}
section {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: calc(100vh - 96px);
	text-align: center;
}
.new_link {
	text-decoration: none;
	margin-right: 10px;
}
.new_link:hover {
	text-decoration: underline;
}
.container {
	width: 400px;
	margin-bottom: 100px;
}
h3 {
	margin-bottom: 15px;
}
#line {
	position: relative;
	display: flex;
	justify-content: center;
}
#line::before {
	width: 100%;
	height: 1px;
	background-color: #D3D3D3;
	position: relative;
	content: '';
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%)
}
#line span {
	position: relative;
	margin: 10px;
	background: white;
    width: 40px;
    display: block;
}
.error-msg-cont {
	text-align: center;
	height: 30px;
}
.social-btn-cont {
	font-size: 12px;
}
.socila-container button {
	margin: 2px;
}

.v-enter-from {
	opacity: 0;
}
.v-enter-to {
	opacity: 1;
}
.v-enter-active {
	transition: opacity 0.5s ease;
}
</style>
