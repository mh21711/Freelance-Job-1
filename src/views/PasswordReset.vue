<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
// import VueCookies from "vue-cookies";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();
let newPass = ref("");
let errorMsg = ref("");
let connecting = ref(false);

// id and jwt from link
const id = ref(null);
const token = ref(null);

let resetPass = async () => {
	try {
		connecting.value = true;
		const response = await axios.post(import.meta.env.VITE_UPDATE_PASS, {
			uidb64: id.value,
			//!todo fix get token
			token: token.value,
			new_password: newPass.value,
		});

		// Check if the response has the expected structure
		if (response) {
			connecting.value = false;
			Swal.fire({
				title: "تم إعادة تعيين كلمة المرور!",
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
	} finally {
		newPass.value = "";
	}
};

// on mount

onMounted(() => {
	id.value = route.params.id;
	token.value = route.params.token;
});
</script>

<template>
	<section>
		<div class="container d-flex flex-column">
			<div
				class="child-container row align-items-center justify-content-center"
			>
				<div class="col-12 col-md-8 col-lg-4">
					<div class="card shadow-sm">
						<div class="card-body">
							<div class="mb-4"></div>
							<!-- error msg show  -->
							<div class="error-msg-cont">
								<Transition>
									<p style="color: red" v-if="errorMsg">
										{{ errorMsg }}
									</p>
								</Transition>
							</div>
							<h3 class="text-center mb-5">إعادة تعيين كلمة المرور</h3>
							<form @submit.prevent="resetPass">
								<div class="mb-3">
									<input
										type="password"
										id="password"
										class="form-control p-3"
										name="password"
										placeholder="إنشاء كلمة المرور"
										required
										v-model.trim="newPass"
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
										<span v-else>إعادة تعيين كلمة المرور</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
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
