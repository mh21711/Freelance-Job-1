import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
//* axios
import axios from "axios";
export const useSocialLogin = defineStore("socialLogin", () => {
	let loading = ref(false);
	const router = useRouter();

	let errorMessage = ref(null);

	function setError(error) {
		if (error) {
			if (error.response.data.non_field_errors) {
				errorMessage.value = error.response.data.non_field_errors[0];
			} else if (error.response.data.detail) {
				errorMessage.value = error.response.data.detail;
			} else {
				error.value = "حدث خطأ !";
			}
		}
	}

	// function to set cookies
	function setCookies(response) {
		if (response.data["jwt token"]) {
			VueCookies.set("jwt", response.data["jwt token"], 60 * 60 * 24 * 3);
		}
		if (response.data["is_admin"]) {
			VueCookies.set("access", response.data["is_admin"], 60 * 60 * 24 * 3);
		} else {
			VueCookies.set("access", false, 60 * 60 * 24 * 3);
		}
	}

	// redirect to chat
	function redirectToChat() {
		Swal.fire({
			title: "تم تسجيل الدخول",
			text: "سيتم تحويلك الي المحادثة",
			icon: "success",
			showConfirmButton: false,
			timer: 2000,
			timerProgressBar: true,
		});
		setTimeout(() => {
			router.push("/chat");
		}, 2000);
	}

	function googleGetSocialData(res) {
		let key = ref(res["data"]["key"]);
		let GoogleKey = ref(key.value.trim());
		loading.value = true;

		const myHeaders = {
			Cookie:
				"jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTMsImVtYWlsIjoiYWhtZWRrYW1lbG9mZmljaWFsMUBnbWFpbC5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImVtYWlsX3ZlcmlmaWVkIjp0cnVlfQ.e4jw2qiUMPGVz0mVs7D_B_7pigu4KviqdKYAUfUKjbU; sessionid=wll7kpmy8mrcsdu8nb7jmomnhzb2kfig",
		};
		const formdata = new FormData();
		formdata.append("token_key", GoogleKey.value);
		axios
			.post(import.meta.env.VITE_GET_SOCIAL_DATA, formdata, {
				headers: myHeaders,
			})
			.then((response) => {
				setCookies(response);
				redirectToChat();
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				loading.value = false;
				setTimeout(() => {
					errorMessage.value = null;
				}, 5000);
			});
	}

	// login google function
	function googleLogin(token) {
		loading.value = true;
		axios
			.post(import.meta.env.VITE_GOOGLE_LOGIN, { access_token: token })
			.then((res) => {
				googleGetSocialData(res);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				loading.value = false;
				setTimeout(() => {
					errorMessage.value = null;
				}, 5000);
			});
	}

	// login linked in function
	function linkedinLogin(token) {
		loading.value = true;
		axios
			.post(import.meta.env.VITE_LINKEDIN_LOGIN, { code: token })
			.then((res) => {
				setCookies(res);
				redirectToChat();
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				loading.value = false;
				setTimeout(() => {
					errorMessage.value = null;
				}, 5000);
			});
	}

	// login twitter function
	function twitterLogin(token, verifier) {
		loading.value = true;
		axios
			.post(import.meta.env.VITE_TWITTER_LOGIN, {
				oauth_token: token,
				oauth_verifier: verifier,
			})
			.then((res) => {
				setCookies(res);
				redirectToChat();
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				loading.value = false;
				setTimeout(() => {
					errorMessage.value = null;
				}, 5000);
			});
	}

	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useSocialLogin, import.meta.hot));
	}
	// Return the function to be used
	// openGoogle, openLinkedIn, openTwitter,
	return { googleLogin, linkedinLogin, twitterLogin, loading, errorMessage };
});
