import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import VueCookies from "vue-cookies";
import { useUserLimits } from "./UserLimits";
import { useUserData } from "./UserData";
const userData = useUserData();
export const useExchangePoints = defineStore("exchangePoints", () => {
	const userLimits = useUserLimits();
	let loading = ref(false);

	function exchangePoints(type) {
		let jwtToken = VueCookies.get("jwt");
		axios
			.post(
				import.meta.env.VITE_EXCHANGE_POINTS,
				{ reward_type: type },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				Swal.fire({
					icon: "success",
					title: "تم...",
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: "error",
					title: "خطأ...",
					text: "حدث خطأ، يرجى المحاولة لاحقًا!",
				});
			})
			.finally(() => {
				userLimits.getUserLimits();
				userData.getUserData();
			});
	}
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useExchangePoints, import.meta.hot));
	}
	// export
	return { exchangePoints, loading };
});
