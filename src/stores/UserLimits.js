// import { defineStore, acceptHMRUpdate } from "pinia";
// import { ref } from "vue";
// import VueCookies from "vue-cookies";
// import Swal from "sweetalert2";
// import { useRouter } from "vue-router";
// import { useSubscribePlan } from "./SubscribePlan";
// import { useToggleModals } from "./ToogleModals";
// //* axios
// import axios from "axios";

// // another stores

// const subscribePlan = useSubscribePlan();
// const toggleModals = useToggleModals();

// export const useUserLimits = defineStore("userLimits", () => {
// 	const router = useRouter();
// 	let textNum = ref(null);
// 	let voiceNum = ref(null);
// 	let imageNum = ref(null);
// 	// get user current subscription to check with user limit
// 	subscribePlan.getSubscribe();
// 	// get user limit function
// 	function getUserLimits() {
// 		// send equest
// 		let jwtToken = VueCookies.get("jwt");
// 		// make request to back end to post question
// 		axios
// 			.get(import.meta.env.VITE_GET_USER_LIMIT, {
// 				withCredentials: true,
// 				headers: {
// 					Authorization: `Bearer ${jwtToken}`,
// 				},
// 			})
// 			.then((res) => {
// 				if (
// 					res.data.message === 0 &&
// 					res.data.audio_limit === 0 &&
// 					res.data.image_media_limit === 0
// 				) {
// 					// if user is subscribe to plan and not subscribe to basic
// 					if (
// 						subscribePlan.previousSub &&
// 						subscribePlan.subscribePlan !== "basic"
// 					) {
// 						deleteSubscription();
// 					} else if (subscribePlan.subscribePlan === "basic") {
// 						//if user subscribe to basic and basic plan is ended
// 						Swal.fire({
// 							icon: "info",
// 							title: "انتهى اشتراكك",
// 							text: " يمكنك الحصول على النقاط من خلال رفع الملفات. سيتم منحك 20 نقطة عن كل ملف يتم قبوله من قبل المسؤول واستبدال هذه النقاط بمزيد من الخدمات أو الاشتراك في الخطة المدفوعة",
// 							confirmButtonText: "اشترك في خطة",
// 							cancelButtonText: "رفع ملف",
// 							denyButtonText: " استبدال النقاط",
// 							showCancelButton: true,
// 							reverseButtons: true,
// 							showDenyButton: true,
// 						}).then((result) => {
// 							if (result.isConfirmed) {
// 								// User clicked "اشترك في خطة" (Subscribe to Plan)
// 								// Route to the link for subscribing to the plan
// 								router.push("/prices");
// 							} else if (result.isDenied) {
// 								// show exchange points modal if user click exchange buttons
// 								toggleModals.showExchangeModel = true;
// 							} else if (result.dismiss === Swal.DismissReason.cancel) {
// 								router.push("/dashboard");
// 							} else {
// 								// prevent outside click from push dashboard
// 							}
// 						});
// 					} else if (!subscribePlan.previousSub) {
// 						//if user not subscribe to any previous plans
// 						// if user not subscribe push prices page
// 						// Swal.fire({
// 						// 	icon: "info",
// 						// 	title: "عذرًا...",
// 						// 	text: "يرجى الاشتراك في خطة قبل المتابعة",
// 						// 	confirmButtonText: "موافق",
// 						// }).then(() => {
// 						// 	router.push("/prices");
// 						// });
// 					}
// 				}
// 				textNum.value = res.data.message;
// 				voiceNum.value = res.data.audio_limit;
// 				imageNum.value = res.data.image_media_limit;
// 			})
// 			.catch((err) => {
// 				setTimeout(() => {
// 					getUserLimits();
// 				}, 2000);
// 			});
// 	}

// 	function deleteSubscription() {
// 		// delete subscription
// 		Swal.fire({
// 			icon: "error",
// 			title: "عذراً",
// 			text: "لقد انتهى اشتراكك",
// 			showCancelButton: true,
// 			confirmButtonText: "تجديد الاشتراك",
// 			cancelButtonText: "إغلاق",
// 			reverseButtons: true,
// 		}).then((result) => {
// 			if (result.isConfirmed) {
// 				router.push("/prices").then(() => {
// 					location.reload();
// 				});
// 			}
// 		});
// 		// send equest
// 		let jwtToken = VueCookies.get("jwt");
// 		// make request to back end to post question
// 		axios
// 			.delete(import.meta.env.VITE_DELTE_PLAN, {
// 				withCredentials: true,
// 				headers: {
// 					Authorization: `Bearer ${jwtToken}`,
// 				},
// 			})
// 			.then((res) => {})
// 			.catch((err) => {});
// 	}

// 	if (import.meta.hot) {
// 		import.meta.hot.accept(acceptHMRUpdate(useUserLimits, import.meta.hot));
// 	}
// 	return { textNum, voiceNum, imageNum, getUserLimits, deleteSubscription };
// });

import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { useSubscribePlan } from "./SubscribePlan";
import { useToggleModals } from "./ToogleModals";
//* axios
import axios from "axios";

// another stores

const subscribePlan = useSubscribePlan();
const toggleModals = useToggleModals();

export const useUserLimits = defineStore("userLimits", () => {
	const router = useRouter();
	let textNum = ref(null);
	let voiceNum = ref(null);
	let imageNum = ref(null);
	// get user current subscription to check with user limit
	subscribePlan.getSubscribe();
	// ask user to gain points if he is basic plan and the plan ended
	function gainPoint() {
		Swal.fire({
			icon: "info",
			title: "انتهى اشتراكك",
			text: " يمكنك الحصول على النقاط من خلال رفع الملفات. سيتم منحك 20 نقطة عن كل ملف يتم قبوله من قبل المسؤول واستبدال هذه النقاط بمزيد من الخدمات أو الاشتراك في الخطة المدفوعة",
			confirmButtonText: "اشترك في خطة",
			cancelButtonText: "رفع ملف",
			denyButtonText: " استبدال النقاط",
			showCancelButton: true,
			reverseButtons: true,
			showDenyButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				// User clicked "اشترك في خطة" (Subscribe to Plan)
				// Route to the link for subscribing to the plan
				router.push("/prices");
			} else if (result.isDenied) {
				// show exchange points modal if user click exchange buttons
				toggleModals.showExchangeModel = true;
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				router.push("/dashboard");
			} else {
				// prevent outside click from push dashboard
			}
		});
	}

	// get user limit function
	function getUserLimits() {
		// send equest
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(import.meta.env.VITE_GET_USER_LIMIT, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				// variable to check if no more services (image and voice and text)
				let noServices =
					res.data.message === 0 &&
					res.data.audio_limit === 0 &&
					res.data.image_media_limit === 0;

				// check if no more services
				if (noServices) {
					// variable to check if user is pro and not basic
					let isPro =
						subscribePlan.previousSub &&
						subscribePlan.subscribePlan !== "basic";
					// if user is subscribe to plan and not subscribe to basic
					if (isPro) {
						deleteSubscription();
					} else if (
						//check that user actived his plan
						subscribePlan.subscribePlan === "basic" &&
						!subscribePlan.active
					) {
						// if user not subscribe to any previous plans
						// if user not subscribe push prices page
						Swal.fire({
							icon: "info",
							title: "عذرًا...",
							text: "يرجى الاشتراك في خطة قبل المتابعة",
							confirmButtonText: "موافق",
						}).then(() => {
							router.push("/prices");
						});
					} else if (subscribePlan.subscribePlan === "basic") {
						//if user subscribe to basic and basic plan is ended
						gainPoint();
					}
				}
				textNum.value = res.data.message;
				voiceNum.value = res.data.audio_limit;
				imageNum.value = res.data.image_media_limit;
			})
			.catch((err) => {
				setTimeout(() => {
					getUserLimits();
				}, 2000);
			});
	}

	// delete pro subscription if no more services avilable
	function deleteSubscription() {
		// delete subscription
		Swal.fire({
			icon: "warning",
			title: "عذراً",
			text: "لقد انتهى اشتراكك",
			confirmButtonText: "تجديد الاشتراك",
			reverseButtons: true,
		}).then((result) => {
			router.push("/prices").then(() => {
				location.reload();
			});
		});
		// send equest
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.delete(import.meta.env.VITE_DELTE_PLAN, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {})
			.catch((err) => {});
	}

	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useUserLimits, import.meta.hot));
	}
	return { textNum, voiceNum, imageNum, getUserLimits, deleteSubscription };
});
