import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
// import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
// import router
import { useRouter } from "vue-router";

//* axios
import axios from "axios";

export const useEmailStore = defineStore("emailStore", () => {
	// use route
	const router = useRouter();

	let FireError = () => {
		Swal.fire({
			icon: "error",
			title: "عذراً...",
			text: " حدث خطأ!",
			confirmButtonColor: "#ff0000", //<==>
		});
	};

	let sendOtp = (email) => {
		// assing email in sessio storage to use in handle verfiy otp
		sessionStorage.setItem("email", email);
		// let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.post(import.meta.env.VITE_SEND_OTP, { email: email })
			.then((res) => {
				router.push("/verify-email");
			})
			.catch((err) => {
				FireError();
			});
	};

	let verfiyOtp = (otpCode) => {
		let email = ref(sessionStorage.getItem("email"));
		// check for email
		if (!email.value) {
			Swal.fire({
				icon: "error",
				title: "عذراً...",
				text: "يرجى تسجيل الدخول للتحقق من البريد الإلكتروني الخاص بك",
				confirmButtonColor: "#ff0000", //<==>
				confirmButtonText: "تسجيل الدخول",
				cancelButtonText: "الغاء",
			})
				.then(() => router.push("/verify-email"))
				.catch("");
		} else {
			axios
				.post(import.meta.env.VITE_VERIFY_OTP, {
					email: email.value,
					otp: otpCode,
				})
				.then((res) => {
					router.push("/login");
					// fire succes message
					Swal.fire({
						icon: "success",
						title: "تم التحقق من بريدك الإلكتروني بنجاح!",
						text: "يرجى تسجيل الدخول للاستمرار في استخدام الخدمة.",
						// confirmButtonColor: "#ff0000", //<==>
						timer: 2000,
					});
				})
				.catch((err) => {
					FireError();
				});
		}
	};

	let sendOtpAgain = () => {
		let email = ref(sessionStorage.getItem("email"));
		if (!email.value) {
			Swal.fire({
				icon: "error",
				title: "عذراً...",
				text: "يرجى تسجيل الدخول للتحقق من البريد الإلكتروني الخاص بك",
				confirmButtonColor: "#ff0000", //<==>
				confirmButtonText: "تسجيل الدخول",
				cancelButtonText: "الغاء",
			})
				.then(() => router.push("/login"))
				.catch("");
		} else {
			axios
				.post(import.meta.env.VITE_SEND_OTP, { email: email.value })
				.then((res) => {
					Swal.fire({
						icon: "success",
						text: " تم إرسال الرمز بنجاح",
						timer: 1000,
					});
				})
				.catch((err) => {
					Swal.fire({
						icon: "error",
						title: "عذراً...",
						text: " حدث خطأ يرجي المحاولة لاحقا!",
						confirmButtonColor: "#ff0000", //<==>
					});
				});
		}
	};
	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useEmailStore, import.meta.hot));
	}
	return { sendOtp, verfiyOtp, sendOtpAgain };
});
