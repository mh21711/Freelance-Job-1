import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
// import VueCookies from "vue-cookies";

export const useFileData = defineStore("fileData", () => {
	let showFile = ref(false);
	let fileName = ref("");
	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useFileData, import.meta.hot));
	}
	return { showFile, fileName };
});
