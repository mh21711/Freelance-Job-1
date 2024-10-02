<script setup>
import { ref } from "vue";
import axios from "axios";
// import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";

const router = useRouter();
let email = ref("");
let errorMsg = ref("");
let connecting = ref(false);

let resetPass = async () => {
	try {
		connecting.value = true;
		const response = await axios.post(import.meta.env.VITE_RESET_PASS, {
			email: email.value,
		});

		// Check if the response has the expected structure
		if (response) {
			// assign email to local storage
			localStorage.setItem("email", email.value);
			//
			connecting.value = false;
			email.value = "";
			Swal.fire({
				title: "تم إرسال رابط إعادة تعيين كلمة المرور!",
				text: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات حول إعادة تعيين كلمة المرور الخاصة بك.",
				icon: "success",
				confirmButtonText: "موافق",
			});
			router.push("/login");
		}
	} catch (error) {
		// Handle errors
		if (error.response && error.response.data && error.response.data.detail) {
			// handle the the email not found error
			if (error.response.data.detail === "User not found.") {
				errorMsg.value = "هذا البريد الإلكتروني غير مسجل.";
			} else {
				errorMsg.value = error.response.data.detail;
			}
			// handle server errors
		} else {
			errorMsg.value = "حدث خطأ";
		}
		// set connecting variable  to false
		connecting.value = false;
	}
};
</script>

<template>
	<section>
		<div class="container">
			<div
				class="child-container"
			>
				<div>
					<div>
						<div class="form">
							<div class="mb-4">
								<h3 class="text-center">هل نسيت كلمة المرور؟</h3>
								<p class="mb-2">
									أدخل عنوان البريد الإلكتروني المسجل لإعادة تعيين كلمة المرور.
								</p>
							</div>
							<!-- error msg show  -->
							<div class="error-msg-cont">
								<Transition>
									<p style="color: red" v-if="errorMsg">
										{{ errorMsg }}
									</p>
								</Transition>
							</div>
							<form @submit.prevent="resetPass()">
								<div class="mb-3">
									<label for="email" class="form-label"
										>البريد الإلكتروني</label
									>
									<input
										type="email"
										id="email"
										class="form-control"
										name="email"
										placeholder="أدخل بريدك الإلكتروني"
										required
										v-model.trim="email"
										@focus="errorMsg = ''"
									/>
								</div>
								<div class="mb-3 d-grid">
									<button
										class="btn btn-primary btn-lg btn-block"
										type="submit"
									>
										<span
											class="spinner-border"
											role="status"
											v-if="connecting"
										>
										</span>
										<span v-else> إعادة تعيين كلمة المرور </span>
									</button>
								</div>
								<div id="line"><span>أو</span></div>
								<span>لا تمتلك حسابًا؟ </span>
								<router-link to="/signup" class="new_link"> إنشاء حساب جديد </router-link>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
.new_link {
	text-decoration: none;
}
.new_link:hover {
	text-decoration: underline;
}
h3 {
	margin-bottom: 40px;
}
.child-container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: calc(100vh - 96px) !important;
}
.child-container .form {
	margin-bottom: 40px;
} 
input::placeholder {
	transition: 0.3s;
}
input:focus::placeholder {
	color: transparent;
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
	text-align: center;
}
.child-container {
	min-height: calc(100vh - 92px);
}
.error-msg-cont {
	text-align: center;
	height: 30px;
}
.social-btn-cont {
	font-size: 12px;
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
