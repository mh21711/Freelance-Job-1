import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useToggleModals = defineStore("toggleModals", () => {
	let showExchangeModel = ref(false);

	// function to show exchangeModel
	function toggleShowExchangeModal() {
		showExchangeModel.value = !showExchangeModel.value;
	}

	// hot reload
	if (import.meta.hot) {
		import.meta.hot.accept(acceptHMRUpdate(useToggleModals, import.meta.hot));
	}
	// export
	return {
		toggleShowExchangeModal,

		showExchangeModel,
	};
});
