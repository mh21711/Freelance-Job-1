import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import VueCookies from "vue-cookies";
//* axios
import axios from "axios";
// another store
// import { useFetchData } from "./FetchData";

export const useFetchHistory = defineStore("fetchHistory", () => {
	// const fetchData = useFetchData();

	// variable
	let history = ref([]);
	//current session chat data
	// let historyData = ref([]);
	let headerId = ref("");
	// let NewPageId = ref("");

	// get all history
	let getHistory = () => {
		//* disable the send btn
		// start loader
		let jwtToken = VueCookies.get("jwt");
		// make request to back end to post question
		axios
			.get(import.meta.env.VITE_CHAT_HISTORY, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
			.then((res) => {
				// assign new response to current session data
				// history.value = res.data.user_chat_history;
				history.value = res.data.user_chat_history.map((item) => {
					// Check if sent_file exists and if it is an MP3 file
					if (item.sent_file && item.sent_file.toLowerCase().endsWith(".mp3")) {
						return {
							...item,
							IsVoice: true, // If it's an MP3, set IsVoice to true
							IsFile: false, // Not a file
						};
					} else if (item.sent_file) {
						let parts = item.sent_file.split("/");
						let fileName = parts[parts.length - 1];
						return {
							...item,
							IsVoice: false, // Not an MP3
							IsFile: true,
							fileName: fileName, // It's a file
						};
					} else {
						return {
							...item,
							IsVoice: false, // No sent_file
							IsFile: false, // Not a file
						};
					}
				});
			})
			.catch((err) => {
				console.log("error occured during fetching history.");
			});
	};

	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useFetchHistory, import.meta.hot));
	}
	return { getHistory, history };
});
