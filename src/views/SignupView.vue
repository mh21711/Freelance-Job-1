<script setup>
import { onMounted, ref } from "vue";
// sweet alret css file in main.js
import Swal from "sweetalert2";

import axios from "axios";
// import { useRouter } from "vue-router";
// const router = useRouter();
// stores
import { useEmailStore } from "@/stores/EmailStore";
let EmailStore = useEmailStore();
// oh vue icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	BiGoogle,
	BiFacebook,
	BiLinkedin,
	BiTwitter,
} from "oh-vue-icons/icons";

// regester icons
addIcons(BiGoogle, BiFacebook, BiLinkedin, BiTwitter);

// user name
let userName = ref("");
let email = ref("");
let password = ref("");
// error handle variable
let userNameError = ref("");
let emailError = ref("");
let passError = ref("");

// variable to handle spinning loading
let connecting = ref(false);

// ?functions
// succes message after sing in
let showSuccessMessage = () => {
	Swal.fire({
		icon: "success",
		title: "تم التسجيل بنجاح!",
		text: ".يرجى التحقق من كود التفعيل الخاص بك",
		confirmButtonText: "تفعيل",
	});
};

let signUp = async () => {
	try {
		connecting.value = true;
		const response = await axios.post(import.meta.env.VITE_SIGNUP_API, {
			name: userName.value,
			email: email.value,
			password: password.value,
		});
		connecting.value = false;
		if (response) {
			if (response.data.email_verified === false) {
				EmailStore.sendOtp(response.data.email);
			}
		}
		//swwet alert for user
		showSuccessMessage();
	} catch (error) {
		connecting.value = false;
		if (Array.isArray(error.response.data["name"])) {
			userNameError.value = error.response.data["name"][0];
		}
		if (Array.isArray(error.response.data["email"])) {
			emailError.value = error.response.data["email"][0];
		}
		if (Array.isArray(error.response.data["password"])) {
			passError.value = error.response.data["password"][0];
		}
	}
};

// open links for google
function openGoogle() {
	window.location.href =
		"https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://ma3rifah.org/login/&prompt=consent&response_type=token&client_id=1066736221829-vut81ib16avjd3igeptmf8di3ph0fo6o.apps.googleusercontent.com&scope=openid%20email%20profile";
}

function openLinkedIn() {
	window.location.href = `https://impactstudio.pythonanywhere.com/api/user/linkedin/login/`;
}
function openTwitter() {
	window.location.href = `https://impactstudio.pythonanywhere.com/api/user/twitter/login/`;
}
</script>

<template>
	<section>
		<div class="container">
			<div class="">
				<div class="">
					<div class="">
						<div class="">
							<h3>إنشاء حساب</h3>
							<form @submit.prevent="signUp">
								<div class="form-outline">
									<div class="error-msg-cont text-end" dir="ltr">
										<Transition>
											<p style="color: red" v-if="userNameError">
												{{ userNameError }}
											</p>
										</Transition>
									</div>
									<input
										@input="userNameError = ''"
										type="text"
										class="form-control form-control-lg"
										placeholder="اسم المستخدم"
										v-model.trim="userName"
										required
									/>
								</div>
								<div class="form-outline">
									<div class="error-msg-cont text-end">
										<Transition>
											<p style="color: red" v-if="emailError" dir="ltr">
												{{ emailError }}
											</p>
										</Transition>
									</div>
									<input
										@input="emailError = ''"
										type="email"
										class="form-control form-control-lg"
										placeholder="البريد الإلكتروني "
										v-model.trim="email"
										required
									/>
								</div>

								<div class="form-outline">
									<div class="error-msg-cont text-end">
										<Transition>
											<p style="color: red" v-if="passError" dir="ltr">
												{{ passError }}
											</p>
										</Transition>
									</div>
									<input
										@input="passError = ''"
										type="password"
										class="form-control form-control-lg"
										placeholder="كلمة السر"
										v-model.trim="password"
										required
									/>
								</div>

								<button class="btn btn-primary btn-lg btn-block" type="submit">
									<span class="spinner-border" role="status" v-if="connecting">
									</span>
									<span v-else> إنشاء حساب </span>
								</button>

								<div class="form-check d-flex justify-content-evenly mb-1">
									<!-- !foget pass word -->
									<p>تملك حسابا بالفعل؟ <router-link to="/login" class="new_link">تسجيل الدخول</router-link></p>
								</div>
							</form>

							<div id="line"><span>أو</span></div>

							<div class="socila-container">
								<!-- google -->
								<button
									@click="openGoogle"
									class="btn btn-lg btn-block btn-primary mb-2 google"
									type="submit"
								>
									<span>
										<OhVueIcon name="bi-google" style="color: rgb(221, 75, 57)" />
										الاستمرار مع Google
									</span>
								</button>
								<!-- linkedin -->
								<button
									@click="openLinkedIn"
									class="btn btn-lg btn-block btn-primary mb-2 linkedin"
									type="submit"
								>
									<span>
										<OhVueIcon name="bi-linkedin" style="color: rgb(0, 119, 181)" />
										الاستمرار مع Linkedin
									</span>
								</button>
								<!-- twitter   -->
								<button
									@click="openTwitter"
									class="btn btn-lg btn-block btn-primary mb-2 twitter"
									type="submit"
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
.google {
	border-color: rgb(221, 75, 57);
}
.linkedin {
	border-color: rgb(0, 119, 181);
}
.twitter {
	border-color: rgb(29, 161, 242)
}
button:hover .ov-icon {
	color: white !important;
} 
button {
	margin-top: 20px;
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
.socila-container button span {
	display: flex;
	align-items: center;
}
.socila-container button span .ov-icon {
	margin-left: 10px;
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
	margin: 40px 0 15px;
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
