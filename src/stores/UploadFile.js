import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import VueCookies from "vue-cookies";
import axios from "axios";
import Swal from "sweetalert2";

export const useUploadFile = defineStore("FileUpload", () => {
	let router = useRouter();
	let loading = ref(false);
	let errorUpload = ref(false);
	let success = ref(false);

	function submitData(
		file,
		fileTitle,
		fileDate,
		publisher,
		city,
		authorName,
		fileType,
		fileNotes
	) {
		// start loading
		loading.value = true;
		// start post req
		let jwtToken = VueCookies.get("jwt");

		// const formdata = new FormData();
		// formdata.append("file", file);
		// make request to back end to post question
		axios
			.post(
				import.meta.env.VITE_FILE_UPLOAD,
				{
					file: file,
					file_name: fileTitle,
					overview: fileNotes,
					release_date: fileDate,
					region: city,
					file_type: fileType,
					source_entity_name: publisher,
					author: authorName,
					city: city,
				},
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((res) => {
				success.value = true;
				// send suucess message
				Swal.fire({
					title: "تم رفع الملف بنجاح",
					text: "هل تريد العودة إلى صفحة الدردشة",
					icon: "success",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#4CA746",
					confirmButtonText: "نعم, العودة إلى الدردشة",
					cancelButtonText: "لا, البقاء هنا",
					reverseButtons: true,
				}).then((result) => {
					if (result.isConfirmed) {
						router.push("/chat");
					}
				});
				// assign new response to current session data
			})
			.catch((err) => {
				errorUpload.value = true;
			})
			.finally(() => {
				loading.value = false;
				setTimeout(() => {
					errorUpload.value = false;
				}, 2000);
			});
	}
	// hot module repload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useUploadFile, import.meta.hot));
	}
	// return data
	return { submitData, loading, errorUpload, success };
});
