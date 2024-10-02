import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
//* axios
import axios from "axios";
// another store
// import { useFetchData } from "./FetchData";

export const useFetchPlans = defineStore("fetchPlans", () => {
	let basicPlan = ref("");
	let premiumPlan = ref("");
	let enterprisePlan = ref("");

	let fetchPlanData = () => {
		//* disable the send btn
		// start loader
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(`${import.meta.env.VITE_GET_PLANS_DATA}`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				basicPlan.value = res.data[0];
				premiumPlan.value = res.data[1];
				enterprisePlan.value = res.data[2];
			})

			.catch((err) => {
				Swal.fire({
					icon: "error",
					title: "خطأ",
					text: "حدث خطأ أثناء الحصول على الخطط.",
				});
				l;
			});
	};

	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useFetchPlans, import.meta.hot));
	}
	return { basicPlan, premiumPlan, enterprisePlan, fetchPlanData };
});
