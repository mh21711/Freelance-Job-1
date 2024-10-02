import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";

//* axios
import axios from "axios";
// another store
// import { useFetchData } from "./FetchData";

export const useAdminUserList = defineStore("adminUserList", () => {
	let usersList = ref([]);
	let loading = ref(false);
	let noUsers = ref(false);
	let filter = ref("");
	let usersCount = ref(0);
	let userName = ref(null);
	//* functions
	// fire error fn
	let FireError = () => {
		Swal.fire({
			icon: "error",
			title: "عذراً...",
			text: "حدث خطأ ما!",
			confirmButtonColor: "#ff0000", //<==>
		});
	};

	// function to get users list
	let getUsersList = (page = 1) => {
		noUsers.value = false;
		usersList.value = [];
		loading.value = true;
		// start fetch datas
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(`${import.meta.env.VITE_USERS_LIST}?page=${page}&page_size=25`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				usersCount.value = res.data.count;
				usersList.value = res.data.results;
				// remove no user
				if (usersList.value.length <= 0) {
					noUsers.value = true;
				}
			})
			.catch((err) => {
				FireError();
				noUsers.value = true;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// fn to get admins only
	let filterUsers = (filter, page = 1) => {
		noUsers.value = false;
		usersList.value = [];
		loading.value = true;
		// start fetch datas
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(
				`${
					import.meta.env.VITE_Filter_USERS
				}${filter}?page=${page}&page_size=25`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				usersCount.value = res.data.count;
				usersList.value = res.data.results;
				// remove no user
				if (usersList.value.length <= 0) {
					noUsers.value = true;
				}
			})
			.catch((err) => {
				FireError();
				noUsers.value = true;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// function to search for users
	let searchUsers = (name, page = 1) => {
		noUsers.value = false;
		usersList.value = [];
		loading.value = true;
		// start fetch datas
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(
				`${import.meta.env.VITE_SEARCH_USERS}${name}&page=${page}&page_size=25`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				usersCount.value = res.data.count;
				usersList.value = res.data.results;
				// remove no user
				if (usersList.value.length <= 0) {
					noUsers.value = true;
				}
			})
			.catch((err) => {
				FireError();
				noUsers.value = true;
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// fn used to paginate files
	let paginateUsers = (page) => {
		if (filter.value === "") {
			getUsersList(page);
		} else if (filter.value === "admins") {
			filterUsers("admins", page);
		} else if (filter.value === "users") {
			filterUsers("users", page);
		} else if (filter.value === "search") {
			searchUsers(userName.value, page);
		}
	};
	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useAdminUserList, import.meta.hot));
	}
	return {
		getUsersList,
		searchUsers,
		filterUsers,
		paginateUsers,
		usersList,
		usersCount,
		userName,
		loading,
		noUsers,
		filter,
	};
});
