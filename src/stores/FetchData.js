import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import Swal from "sweetalert2";
// fetc ser data store
import { useUserData } from "./UserData.js";
import { useFetchHistory } from "./FetchDataHistory.js";
// import { useUserLimits } from "./UserLimits.js";
//* vue cokkies
import VueCookies from "vue-cookies";
//* axios
import axios from "axios";
import { useToggle } from "@vueuse/core";
import { useToggleChat } from "./ToggleChat.js";

export const useFetchData = defineStore("fetchData", () => {
	// user data store
	const fetchHistory = useFetchHistory();
	const userData = useUserData();
	const toggleChat = useToggleChat();
	// const userLimits = useUserLimits;
	// run function to get user data
	userData.getUserData();

	// create new question variable and file uploaded by user
	let question = ref("");
	let file = ref("");
	let isImage = ref(false);
	let chatError = ref("");
	let userCurrentData = ref([]);
	let history = ref([]);

	// variables to handle loading animation
	let loading = ref(false);
	let disableSend = ref(false);
	// function to fetch data

	// fn to check if send user question in istory or current data
	let pushQuestion = (variable) => {
		if (toggleChat.history === true) {
			fetchHistory.history.push({
				message_content: variable,
				bot_answer: "",
			});
			// push to current data
		} else {
			//* will push it to current data
			// push user data to user response untile response came from back end
			userCurrentData.value.push({
				question: question.value,
				text: "",
			});
		}
	};

	// fn to push data to current or history when  get response

	let pushData = (res) => {
		// check if user inside history
		if (toggleChat.history === true) {
			// history contain messages
			if (fetchHistory.history.length > 0) {
				// check if it is text
				if (res.data["completed_content"]) {
					const lastIndex = fetchHistory.history.length - 1;
					fetchHistory.history[lastIndex].bot_answer =
						res.data["completed_content"];
					(fetchHistory.history[lastIndex].user_audio = null),
						(fetchHistory.history[lastIndex].id = res.data.message_id);
					// if  it is image and history contain messages
				} else {
					const lastIndex = fetchHistory.history.length - 1;
					// todo
					fetchHistory.history[lastIndex].bot_file = res.data["image_url"];
					(fetchHistory.history[lastIndex].user_audio = null),
						(fetchHistory.history[lastIndex].id = res.data.message_id);
				}
				// Modify the last response
			} else {
				// If there are no previous responses, push a new one
				// check if response is text
				if (res.data["completed_content"]) {
					fetchHistory.history.push({
						message_content: question.value,
						bot_answer: res.data["completed_content"],
						user_audio: null,
						id: res.data.message_id,
					});
				} else {
					fetchHistory.history.push({
						message_content: question.value,
						// todo
						bot_file: res.data["image_url"],
						user_audio: null,
						id: res.data.message_id,
					});
				}
			}
		} //push data to current session if user not in history
		else {
			// if condition to push user question
			// Modify the last response instead of pushing a new one
			if (userCurrentData.value.length > 0) {
				// Find the index of the last response
				const lastIndex = userCurrentData.value.length - 1;

				// Modify the last response
				// check if data is text or image url
				if (res.data["completed_content"]) {
					userCurrentData.value[lastIndex].text = res.data["completed_content"];
				} else {
					userCurrentData.value[lastIndex].image = res.data["image_url"];
				}
				// push id
				userCurrentData.value[lastIndex].id = res.data.message_id;
				// if there is old message
			} else {
				// check if the resukt is text
				if (res.data["completed_content"]) {
					userCurrentData.value.push({
						question: question.value,
						text: res.data["completed_content"],
						id: res.data.message_id,
					});
					// if the result is image
				} else {
					userCurrentData.value.push({
						question: question.value,
						image: res.data["image_url"],
						id: res.data.message_id,
					});
				}
			}
		}
	};
	// push data in case of send with file
	// let pushDataFile = (res) => {
	// 	if (toggleChat.history === true) {
	// 		if (fetchHistory.history.length > 0) {
	// 			//check if history is  contain variables
	// 			// Find the index of the last response
	// 			const lastIndex = fetchHistory.history.length - 1;
	// 			fetchHistory.history[lastIndex].bot_answer =
	// 				res.data["completed_content"];
	// 			fetchHistory.history[lastIndex].id = res.data.message_id;

	// 			// Modify the last response
	// 		} else {
	// 			// If there are no previous responses, push a new one
	// 			// if it is audio
	// 			fetchHistory.history.push({
	// 				message_content: question.value,
	// 				bot_answer: res.data["completed_content"],
	// 				user_audio: null,
	// 				id: res.data.message_id,
	// 			});
	// 		}
	// 	} else {
	// 		// // Assign new response to the current session data
	// 		if (userCurrentData.value.length > 0) {
	// 			// Find the index of the last response
	// 			const lastIndex = userCurrentData.value.length - 1;
	// 			// Modify the last response
	// 			userCurrentData.value[lastIndex].text = res.data["response"];
	// 			userCurrentData.value[lastIndex].id = res.data["message_id"];
	// 		} else {
	// 			// If there are no previous responses, push a new one
	// 			userCurrentData.value.push({
	// 				question: question.value,
	// 				text: res.data["response"],
	// 				id: res.data["message_id"],
	// 			});
	// 		}
	// 	}
	// };
	// push data in case of send with file
	// TODO chat gpt response test
	let pushDataFile = (res) => {
		if (toggleChat.history === true) {
			if (fetchHistory.history.length > 0) {
				//check if history is  contain variables
				// Find the index of the last response
				const lastIndex = fetchHistory.history.length - 1;
				fetchHistory.history[lastIndex].bot_answer = res.data["response"];
				fetchHistory.history[lastIndex].id = res.data.message_id;
				// //TODO get file name
				// fetchHistory.history[lastIndex].fileName = fileName[parts.length - 1];
			} else {
				// If there are no previous responses, push a new one
				// if it is audio
				fetchHistory.history.push({
					message_content: question.value,
					bot_answer: res.data["response"],
					user_audio: null,
					id: res.data.message_id,
				});
			}
		} else {
			// // Assign new response to the current session data
			if (userCurrentData.value.length > 0) {
				// Find the index of the last response
				const lastIndex = userCurrentData.value.length - 1;
				//<//==> Modify the last response
				userCurrentData.value[lastIndex].text = res.data["response"];
				userCurrentData.value[lastIndex].id = res.data["message_id"];
				//TODO get file name
				// let fileName = res.data.sent_file.split("/");
				// userCurrentData.value[lastIndex].fileName = fileName[parts.length - 1];
			} else {
				// If there are no previous responses, push a new one
				userCurrentData.value.push({
					question: question.value,
					text: res.data["response"],
					id: res.data["message_id"],
				});
			}
		}
	};

	// fn to pop user question from history or current data if error occur
	let popData = () => {
		if (toggleChat.history === true) {
			fetchHistory.history.pop();
		} else {
			userCurrentData.value.pop();
		}
	};

	// remove from history using id
	function removeMessageFromHistory(msgId) {
		let index = fetchHistory.history.findIndex((msg) => msg.id === msgId);
		if (index !== -1) {
			fetchHistory.history.splice(index, 1);
		} else {
		}
	}

	// remove from current data using id
	function removeMessageFromCurrentData(msgId) {
		let index = userCurrentData.value.findIndex((msg) => msg.id === msgId);
		if (index !== -1) {
			userCurrentData.value.splice(index, 1);
		} else {
		}
	}

	// send new requst or question to back end
	function sendRequest() {
		//* disable the send btn
		disableSend.value = true;
		// send equest
		if (question.value) {
			// start loader
			loading.value = true;

			//* check if user in history we will push it to history
			//* ifelse we will push it to current data
			pushQuestion(question.value);
			// remove qustion
			// question.value = "";

			let jwtToken = VueCookies.get("jwt");
			// make request to back end to post question
			if (isImage.value) {
				// send request to as prompt to for image gen
				sendRequestImage(jwtToken);
				question.value = "";
			} else {
				// send request to as text
				sendrequestText(jwtToken);
				question.value = "";
			}
		} else {
			chatError.value = "الرجاء إدخال النص";
		}
	}

	//send image
	function sendRequestImage(jwtToken) {
		axios
			.post(
				import.meta.env.VITE_IMAGE_GEN,
				{ prompt: question.value },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				// if condition to push user question
				// Modify the last response instead of pushing a new one
				pushData(res);
			})
			.catch((err) => {
				// check if error from filter
				if (
					err.message.includes("blocked") ||
					err.message.includes("not allowed")
				) {
					chatError.value = "تم حظر هذا الطلب بواسطة مرشحات المحتوى الخاصة بنا";
					//
				} else {
					chatError.value = err.response
						? err.response.data.error
						: "خطأ غير متوقع";
				}
				popData();
			})

			.finally(() => {
				// stop loader and perform cleanup
				loading.value = false;
				disableSend.value = false;
				question.value = "";
				file.value = "";
				// userLimits.getUserLimits();
			});
	}

	// send requesTest

	function sendrequestText(jwtToken) {
		axios
			.post(
				import.meta.env.VITE_CHAT,
				{ message: question.value, type: "text" },
				{
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				}
			)
			.then((res) => {
				// if condition to push user question
				// Modify the last response instead of pushing a new one
				pushData(res);
				chatError.value = "";
			})
			.catch((err) => {
				popData();
				chatError.value = err.response
					? err.response.data.error
					: "خطأ غير متوقع";
			})
			.finally(() => {
				// stop loader and perform cleanup
				loading.value = false;
				disableSend.value = false;
				question.value = "";
				file.value = "";
				// userLimits.getUserLimits();
			});
	}

	// send request with vocie to back end
	function sendRequestVoice(recordedAudio) {
		// Disable the send button
		disableSend.value = true;
		// Check if recordedAudio exists
		if (recordedAudio) {
			// Start loader
			loading.value = true;

			// Create FormData object and append audio
			// make uniqe file name

			// Get JWT token for authentication
			let jwtToken = VueCookies.get("jwt");
			// Make request to backend to post audio
			//* push data temporary until fetch to show skeleton load
			if (toggleChat.history === true) {
				fetchHistory.history.push({
					message_content: "",
				});
			} else {
				userCurrentData.value.push({ question: "" });
			}

			axios
				.post(
					import.meta.env.VITE_CHAT,
					{ file: recordedAudio, type: "voice" },
					{
						withCredentials: true,
						headers: {
							Authorization: `Bearer ${jwtToken}`,
							"Content-Type": "multipart/form-data",
						},
					}
				)
				.then((res) => {
					if (toggleChat.history === true) {
						// remove the last elemnt before new data pushed
						fetchHistory.history.pop();
						// push data from backend to question
						fetchHistory.history.push({
							bot_answer: res.data["completed_content"],
							message_content: res.data["user_message"],
							bot_file: res.data["bot_file"],
							user_file: res.data["user_file"],
							id: res.data["message_id"],
						});
						chatError.value = "";
					} else {
						// remove the last elemnt before new data pushed
						userCurrentData.value.pop();
						// push data from backend to question
						userCurrentData.value.push({
							question: res.data["user_message"],
							text: res.data["completed_content"],
							BotVoice: res.data["bot_file"],
							user_file: res.data["user_file"],
							id: res.data["message_id"],
						});
						chatError.value = "";
					}
				})
				.catch((err) => {
					//* remove last element if no response
					if (toggleChat.history === true) {
						fetchHistory.history.pop();
					} else {
						userCurrentData.value.pop();
					}
					// Handle errors
					chatError.value = "خطأ غير متوقع" || "خطأ غير متوقع";
				})
				.finally(() => {
					// Stop loader and perform cleanup
					loading.value = false;
					// Enable send button
					disableSend.value = false;

					resetValues();
					// setTimeout(() => {
					// 	chatError.value = null;
					// }, 3000);
					// userLimits.getUserLimits();
				});
		} else {
			// Handle case where recordedAudio is missing
			chatError.value = " لا يوجد تسجيل صوتي متاح";
			disableSend.value = false;
			recordedAudio = "";
		}
	}

	function resetValues() {
		// Reset necessary values after request
		question.value = "";
		file.value = "";
	}

	//* send files in chat
	function sendRequestWithFile() {
		//* disable the send btn
		disableSend.value = true;
		// start send data
		if (question.value) {
			// Start loader
			loading.value = true;
			// push data with question to show in chat
			if (toggleChat.history === true) {
				fetchHistory.history.push({
					message_content: question.value,
					bot_answer: "",
					user_audio: null,
					IsFile: true,
					// TODO
					fileName: file.value.name,
				});
			} else {
				// * push user question until response came from back end
				userCurrentData.value.push({
					question: question.value,
					IsFile: true,
					fileName: file.value.name,
					text: "",
					// TODO
					fileName: file.value.name,
				});
			}
			// Create FormData to handle file and set filename in Content-Disposition
			let formData = new FormData();
			formData.append("file", file.value);
			// Create headers object
			let headers = {
				"Content-Type": "multipart/form-data",
			};

			let jwtToken = VueCookies.get("jwt");
			// Add Authorization header only if a valid jwtToken is available
			if (jwtToken) {
				headers["Authorization"] = `Bearer ${jwtToken}`;
			}
			let encodedFileName = encodeURIComponent(file.value.name);
			// add content-deposition with file name
			headers[
				"Content-Disposition"
			] = `attachment; filename=${encodedFileName}`;

			// api url
			let apiUrl = import.meta.env.VITE_CHAT_FILE + question.value + "/";

			//*remove file and question
			//* remove qustion
			question.value = "";
			file.value = "";

			// Make request to the backend to post the question
			axios
				.post(apiUrl, formData, {
					withCredentials: true,
					headers: headers,
				})
				.then((res) => {
					pushDataFile(res);
					chatError.value = "";
				})

				.catch((err) => {
					// check un handled error
					const reg = /html|head/gi;
					if (reg.test(err.response.data)) {
						Swal.fire({
							icon: "error",
							title: "خطأ.",
							text: "يرجى اختيار ملف صالح.",
						});
					}
					userCurrentData.value.pop();
					// check other errors
					chatError.value = err.response
						? err.response.data.detail
						: "خطأ غير متوقع";
				})
				.finally(() => {
					// Stop loader and perform cleanup
					loading.value = false;
					question.value = "";
					file.value = "";
					disableSend.value = false;
					// userLimits.getUserLimits();
				});
		} else {
			chatError.value = "الرجاء إدخال النص";
		}
	}

	//* delte all chat
	function deleteAllChat() {
		// get all history
		//* disable the send btn
		// start loader
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.delete(import.meta.env.VITE_DELETE_DATA, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then(() => {
				// assign new response to current session data
				userCurrentData.value = [];
				fetchHistory.history = [];
			})
			.catch((err) => {
				// * sweet alert
				Swal.fire({
					icon: "error",
					title: "خطأ!",
					text: "حدث خطأ أثناء معالجة الطلب",
				});
			});
	}

	//* delete one chat
	function deleteChat(id) {
		if (id) {
			let msgId = parseInt(id);

			let jwtToken = VueCookies.get("jwt");
			// make request to back end to delete chat
			axios
				.delete(`${import.meta.env.VITE_DELET_CHAT}/${msgId}/`, {
					withCredentials: true,
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				})
				.then((res) => {
					// Remove message from history or current data based on toggleChat.history
					if (toggleChat.history) {
						removeMessageFromHistory(msgId);
					} else {
						removeMessageFromCurrentData(msgId);
					}
				})
				.catch((err) => {});
		}
	}

	//NOTE make sure to pass the right store definition, `useAuth` in this case.
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useFetchData, import.meta.hot));
	}
	return {
		sendRequest,
		sendRequestWithFile,
		deleteAllChat,
		deleteChat,
		sendRequestVoice,
		userCurrentData,
		question,
		file,
		loading,
		chatError,
		disableSend,
		history,
		file,
		isImage,
	};
});
