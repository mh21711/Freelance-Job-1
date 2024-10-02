import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
//* vue cokkies
import VueCookies from "vue-cookies";
//* axios
import axios from "axios";

export const useUserData = defineStore("userData", () => {
	let UserName = ref("");
	let email = ref("");
	let id = ref("");
	let pointsNum = ref("");
	//fecth user data
	function getUserData() {
		// send equest
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(import.meta.env.VITE_USER_DATA, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})

			.then((res) => {
				UserName.value = res.data.name;
				email.value = res.data.email;
				id.value = res.data.id;
				pointsNum.value = res.data.points;
			})
			.catch((err) => {
				UserName.value = "unknown";
				email.value = "unknown";
				setTimeout(() => {
					getUserData();
				}, 5000);
			});
	}

	//NOTE make sure to pass the right store definition, `useAuth` in this case.
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useUserData, import.meta.hot));
	}

	return { UserName, email, pointsNum, getUserData };
});
