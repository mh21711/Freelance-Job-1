import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import VueCookies from "vue-cookies";
// import VueCookies from "vue-cookies";
import Swal from "sweetalert2";
// import router
import { useRouter } from "vue-router";
//* axios
import axios from "axios";

export const useEditUser = defineStore("editUser", () => {
	// use route
	const router = useRouter();

	// vars
	let loading = ref(false);
	let userData = ref("");

	let FireError = () => {
		Swal.fire({
			icon: "error",
			title: "عذراً...",
			text: " حدث خطأ!",
			confirmButtonColor: "#ff0000", //<==>
		});
	};

	// function to get file list
	let EditUser = (id) => {
		// start loading
		loading.value = true;
		// start fetch datas
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.patch(`${import.meta.env.VITE_UPDATE_USER}${id}/`, userData.value, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				Swal.fire({
					title: "تم بنجاح",
					text: "تم تحديث بيانات المستخدم بنجاح",
					icon: "success",
				});
			})
			.catch((err) => {
				FireError();
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useEditUser, import.meta.hot));
	}
	return { EditUser, userData, loading };
});
