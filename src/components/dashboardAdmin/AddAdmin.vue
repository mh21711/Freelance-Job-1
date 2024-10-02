<script setup>
import { ref } from "vue";
// sweet alret css file in main.js
import Swal from "sweetalert2";
import VueCookies from "vue-cookies";

import axios from "axios";
// import { useRouter } from "vue-router";
// const router = useRouter();
// stores
// import { useEmailStore } from "@/stores/EmailStore";
// let EmailStore = useEmailStore();
// oh vue icons
// import { addIcons, OhVueIcon } from "oh-vue-icons";
// import {
// 	BiGoogle,
// 	BiFacebook,
// 	BiLinkedin,
// 	BiTwitter,
// } from "oh-vue-icons/icons";

// regester icons
// addIcons(BiGoogle, BiFacebook, BiLinkedin, BiTwitter);

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
		title: "تم  بنجاح!",
		confirmButtonText: "متابعة",
		timer: 3000,
	});
};

let addAdmin = async () => {
	let jwtToken = VueCookies.get("jwt");
	try {
		connecting.value = true;
		const response = await axios.post(
			import.meta.env.VITE_ADD_ADMIN,
			{
				name: userName.value,
				email: email.value,
				password: password.value,
			},
			// header
			{
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			}
		);
		connecting.value = false;
		if (response) {
			(userName.value = ""),
				(email.value = ""),
				(password.value = ""),
				showSuccessMessage();
		}
		//swwet alert for user
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
</script>

<template>
	<section>
		<div class="container py-5 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-6 col-xl-7">
					<div class="card shadow-2-strong" style="border-radius: 1rem">
						<div class="card-body p-5 text-center">
							<h3 class="mb-5">إنشاء حساب مشرف</h3>
							<form @submit.prevent="addAdmin">
								<div class="form-outline mb-4">
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
								<div class="form-outline mb-4">
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

								<div class="form-outline mb-4">
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
							</form>

							<!-- <hr class="my-4" />

							<div class="socila-container d-flex justify-content-center"> -->
							<!-- google -->
							<!-- <button
									class="btn btn-lg btn-block btn-primary mb-2"
									style="background-color: #dd4b39"
									type="submit"
								>
									<OhVueIcon name="bi-google" />
								</button> -->
							<!-- facebook -->
							<!-- <button
									class="btn btn-lg btn-block btn-primary mb-2"
									style="background-color: #3b5998"
									type="submit"
								>
									<span>
										<OhVueIcon name="bi-facebook" />
									</span>
								</button> -->
							<!-- linkedin -->
							<!-- <button
									class="btn btn-lg btn-block btn-primary mb-2"
									style="background-color: #0077b5"
									type="submit"
								>
									<span>
										<OhVueIcon name="bi-linkedin" />
									</span>
								</button> -->
							<!-- twitter   -->
							<!-- <button
									class="btn btn-lg btn-block btn-primary mb-2"
									style="background-color: #1da1f2"
									type="submit"
								>
									<span>
										<OhVueIcon name="bi-twitter" />
									</span>
								</button> -->
							<!-- </div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<style scoped>
::placeholder {
	color: white;
}

.container {
    padding: 0 15px; /* Add padding to the container */
}

.card {
    background-color: #444; /* Dark background for the card */
    border: none; /* Remove default card border */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); /* Shadow effect for depth */
	color: white;
}

.card-body {
    border-radius: 1rem; /* Rounded corners for card body */
}

h3 {
    margin-bottom: 30px; /* Margin below the heading */
    font-weight: bold; /* Bold heading text */
}

.form-outline {
    position: relative; /* For positioning error messages */
    margin-bottom: 20px; /* Space between form elements */
}

.form-control {
    background-color: #555; /* Dark background for inputs */
    color: #fff; /* White text for inputs */
    border: 1px solid #777; /* Light border for inputs */
    border-radius: 5px; /* Rounded corners for inputs */
    padding: 15px; /* Add padding for inputs */
    transition: border-color 0.3s ease; /* Smooth border transition */
}

.form-control:focus {
    border-color: #007bff; /* Blue border on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Light blue glow on focus */
}

.error-msg-cont {
    text-align: right; /* Align error messages to the right */
    height: 30px; /* Fixed height for error messages */
}

.btn {
    width: 100%; /* Full width buttons */
    padding: 15px; /* Increased button padding */
    border-radius: 5px; /* Rounded button corners */
}

.btn-primary {
    background-color: #007bff; /* Primary button color */
    border: none; /* Remove border */
	border-radius: 10px;
}

.btn-primary:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

.spinner-border {
    width: 20px; /* Adjust spinner size */
    height: 20px; /* Adjust spinner size */
    margin-right: 5px; /* Space between spinner and text */
}
</style>
