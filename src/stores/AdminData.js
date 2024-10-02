import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import Swal from "sweetalert2";

//* axios
import axios from "axios";
// another store
// import { useFetchData } from "./FetchData";

export const useAdminData = defineStore("adminData", () => {
	let router = useRouter();
	//* variable
	// filter data
	let filesNumber = ref(null);
	let filter = ref("");
	// variables to use in edit file
	let showEditPopUpId = ref("");
	let editFileData = ref("");

	// more filters according to date and user and type
	let otherFilter = ref(false);
	let fileType = ref(null);
	let userId = ref(null);
	let startDate = ref(null);
	let endDate = ref(null);
	// variable to know if i filter search sccroding to search
	let search = ref(false);
	let searchValue = ref("");

	//assign file list
	let fileList = ref([]);
	let loading = ref(false);

	//* functions
	// sweet alert error
	let FireError = () => {
		Swal.fire({
			icon: "error",
			title: "عذراً...",
			text: "حدث خطأ ما!",
			confirmButtonColor: "#ff0000", //<==>
		});
	};
	// function to change file status

	let editFileStatus = (status, id) => {
		if (fileList.value.length > 0) {
			const foundFile = fileList.value.find((file) => file.id === id);

			if (foundFile) {
				// File with the given id found
				if (filter.value === "") {
					// Change file status directly
					foundFile.status = status;
				} else {
					// Remove the file from fileList
					fileList.value = fileList.value.filter((file) => file.id !== id);
				}
			} else {
				// File with the given id not found
			}
		}
	};

	// delete file
	let deleteFile = (id) => {
		if (fileList.value.length > 0) {
			fileList.value = fileList.value.filter((file) => file.id !== id);
		}
	};

	// update file

	// function to get all users
	let getUsersList = () => {
		let jwtToken = VueCookies.get("jwt");
		filter.value = "";
		// make request to back end to post question
		axios
			.get(import.meta.env.VITE_USERS_LIST, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				// assign new response to current session data
			})
			.catch((err) => {});
	};

	// function to get file list
	let getFileList = (page = 1, pageSize = 25) => {
		filter.value = "";
		// start loading
		fileList.value = [];
		loading.value = true;
		// start fetch datas
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(
				`${import.meta.env.VITE_FILE_LIST}/?page=${page}&page_size=${pageSize}`,
				{
					withCredentials: true,

					headers: {
						Authorization: `Bearer ${jwtToken}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((res) => {
				filesNumber.value = res.data.count;
				fileList.value = res.data.results;
				// assign new response to current session data
			})
			.catch((err) => {
				FireError();
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// function to filter files
	let FilterFiles = (filterParam, filterStatus, number = 1, date = false) => {
		fileList.value = [];
		loading.value = true;
		let jwtToken = VueCookies.get("jwt");
		let link = ref(null);
		// check if its date or other filters
		if (date) {
			link.value = `${
				import.meta.env.VITE_FILE_FILTER
			}?start_date=${filterParam}&end_date=${filterStatus}&page=${number}&page_size=25`;
		} else {
			link.value = `${
				import.meta.env.VITE_FILE_FILTER
			}?filter_param=${filterParam}&filter_value=${filterStatus}&page=${number}&page_size=25`;
		}
		axios
			.get(link.value, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				filesNumber.value = res.data.count;
				// assign new response to current session data
				fileList.value = res.data.results;
			})
			.catch((err) => {
				FireError();
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// search by any words in the files
	let searchFiles = (searchValue, page = 1) => {
		// a&page=1&page_size=25
		fileList.value = [];
		loading.value = true;
		let jwtToken = VueCookies.get("jwt");
		let link = ref(null);
		// check if its date or other filters

		axios
			.get(
				`${
					import.meta.env.VITE_SEARCH_FILES
				}${searchValue}&page=${page}&page_size=25`,
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				filesNumber.value = res.data.count;
				// assign new response to current session data
				fileList.value = res.data.results;
			})
			.catch((err) => {
				FireError();
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// function to update file status
	let updateFileStatus = (status, id) => {
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.patch(
				import.meta.env.VITE_UPDAE_FILE + id + "/",
				{ status: status },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				// assign new response to current session data
				editFileStatus(res.data.status, id);
			})
			.catch((err) => {
				FireError();
			});
	};
	// function to update the file information
	let updateFileInformation = (
		fileTitle,
		fileDate,
		city,
		publisher,
		authorName,
		fileType,
		fileNotes
	) => {
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		loading.value = true;
		axios
			.patch(
				import.meta.env.VITE_UPDAE_FILE + showEditPopUpId.value + "/",
				{
					file_name: fileTitle,
					release_date: fileDate,
					city: city,
					source_entity_name: publisher,
					author: authorName,
					file_type: fileType,
					overview: fileNotes,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				loading.value = false;
				Swal.fire({
					title: "تم",
					text: "تم تحديث الملف بنجاح",
					icon: "success",
				}).then((result) => {
					if (result.isConfirmed) {
						router.push("/files-list");
					}
				});
			})
			.catch((err) => {
				loading.value = false;
				FireError();
			});
	};

	let deleteFiles = (id) => {
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		// import.meta.env.VITE_DELETE_FILE + id + "/";
		axios
			.delete(`${import.meta.env.VITE_DELETE_FILE}${id}/`, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				// assign new response to current session data
				deleteFile(id);
			})
			.catch((err) => {
				FireError();
			});
	};

	// make pagination to diffrent accordng to  type and user id and date
	function PaginateFile(number) {
		// check if the other filter is enabled
		if (otherFilter.value) {
			// check if it is date
			if (startDate.value && endDate.value) {
				FilterFiles(startDate.value, endDate.value, number, true);
			} else if (fileType.value) {
				FilterFiles("file_type", fileType.value, number);
				//if not date
			} else if (userId.value) {
				FilterFiles("user", userId.value, number);
			}
		} else {
			//if it is  filter according to status
			if (filter.value === "") {
				getFileList(number);
			} else if (filter.value === "approved") {
				FilterFiles("status", "approved", number);
			} else if (filter.value === "pending") {
				FilterFiles("status", "pending", number);
			} else if (filter.value === "rejected") {
				FilterFiles("status", "rejected", number);
			}
		}
		// check for search filter
		if (search.value) {
			searchFiles(searchValue.value, number);
		}
	}
	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useAdminData, import.meta.hot));
	}

	return {
		getUsersList,
		getFileList,
		FilterFiles,
		updateFileStatus,
		PaginateFile,
		deleteFiles,
		updateFileInformation,
		searchFiles,
		search,
		fileList,
		loading,
		filter,
		filesNumber,
		otherFilter,
		fileType,
		userId,
		startDate,
		endDate,
		showEditPopUpId,
		editFileData,
		searchValue,
	};
});
