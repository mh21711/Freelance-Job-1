import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

import VueCookies from "vue-cookies";
import Swal from "sweetalert2";

//* axios
import axios from "axios";

export const useSubscribePlan = defineStore("subscribePlan", () => {
	let router = useRouter();
	let subscribePlan = ref("");
	let active = ref(false);
	let previousSub = ref(false);

	// subscribe to piad plan
	function subscribe(plan, period) {
		let jwtToken = VueCookies.get("jwt");

		axios
			.post(
				import.meta.env.VITE_SUBSCRIBE_TO_PLAN,
				{
					plan: plan,
					renewal_period: period,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				// push new window
				const url = res.data.redirect_url;
				const newTab = window.open(url, "_self");
				newTab.focus();
			})
			.catch((err) => {
				// check if error from filter
				Swal.fire({
					icon: "error",
					title: "خطأ...",
					text: "حدث خطأ، يرجى المحاولة لاحقًا!",
				});
			});
	}

	//delete subscribe after plan finished
	function deleteSubscribe() {
		// check if it is basic dont delete it
		if (subscribePlan.value !== "basic") {
			let jwtToken = VueCookies.get("jwt");

			axios
				.post(import.meta.env.VITE_DELTE_PLAN, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				})
				.then((res) => {
					// check if error from filter
				})
				.catch((err) => {
					// check if error from filter
					Swal.fire({
						icon: "error",
						title: "خطأ...",
						text: "حدث خطأ، يرجى المحاولة لاحقًا!",
					});
				})

				.finally(() => {});
		}
	}

	// get user subscribe
	function getSubscribe() {
		let jwtToken = VueCookies.get("jwt");
		if (jwtToken) {
			axios
				.get(import.meta.env.VITE_GET_USER_PLAN, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				})
				.then((res) => {
					//! assing plan to variable
					if (res.data.subscription) {
						subscribePlan.value = res.data.subscription.plan;
					}
					// check for previous sub
					if (res.data.payments && res.data.payments.length > 0) {
						active.value = true;
					}
					if (res.data.subscription) {
						if (res.data.subscription.active) {
							subscribePlan.value = res.data.subscription.plan;
							active.value = res.data.subscription.active;
						}
						// check if no previous payment
						if (!res.data.subscription.active && res.data.payments.length > 0) {
							// router.push("/prices");
							// Swal.fire({
							// 	icon: "info",
							// 	title: "عذرًا...",
							// 	text: "يرجى الاشتراك في خطة قبل المتابعة",
							// 	confirmButtonText: "موافق",
							// });
						}
					} else {
						previousSub.value = true;
						// router.push("/prices");
						// Swal.fire({
						// 	icon: "info",
						// 	title: "عذرًا...",
						// 	text: "يرجى الاشتراك في خطة قبل المتابعة",
						// 	confirmButtonText: "موافق",
						// });
					}
				})
				.catch((err) => {
					Swal.fire({
						icon: "error",
						title: "خطأ...",
						text: "حدث خطأ، يرجى المحاولة لاحقًا!",
					});
				});
		}
	}

	// active free plan
	function subscribeFree() {
		let jwtToken = VueCookies.get("jwt");
		axios
			.get(import.meta.env.VITE_ACTIVE_FREE_PLAN, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				Swal.fire({
					icon: "success",
					title: "تم الاشتراك بنجاح!",
					text: "لقد تم اشتراكك بنجاح.",
				}).then(() => {
					router.push("/chat");
				});
			})
			.catch((err) => {
				// check if error from filter
				Swal.fire({
					icon: "error",
					title: "خطأ...",
					text: "حدث خطأ، يرجى المحاولة لاحقًا!",
				});
			});
	}

	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useSubscribePlan, import.meta.hot));
	}
	return {
		subscribe,
		deleteSubscribe,
		getSubscribe,
		subscribeFree,
		subscribePlan,
		active,
		previousSub,
	};
});
