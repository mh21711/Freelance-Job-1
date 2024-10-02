<script setup>
import { ref, onMounted } from "vue";
import DirectToServicesbutton from "./DirectToServicesbutton.vue";
// import observe store to observe elemnt
import { useObserverStore } from "@/stores/observerStore";
const observerStore = useObserverStore();
// variables
let refJourny = ref(null);
let showSection = ref(false);
// props
let props = defineProps(["header", "message"]);
onMounted(() => {
	// observe the template after mount
	observerStore.observeElement(refJourny, showSection);
});
</script>
<template>
	<section
		class="container-fluid text-center text-white text-container p-5 mt-5"
		ref="refJourny"
	>
		<TransitionGroup name="fade-in">
			<div class="parent" key="parent" v-if="showSection">
				<h2 class="mt-5" key="header" v-if="props.header">
					{{ props.header }}
				</h2>
				<p key="paragraph" v-if="props.message">
					{{ props.message }}
				</p>
				<DirectToServicesbutton key="button"> اسألني </DirectToServicesbutton>
			</div>
		</TransitionGroup>
	</section>
</template>
<style scoped>
h2 {
	margin-bottom: 30px;
}
.text-container {
	background-color: #262625;
	min-height: 50vh;
}
.text-container h2 {
	font-size: 100px;
}
.text-container p {
	font-size: 30px;
}
@media only screen and (max-width: 992px) {
	.text-container h2 {
		font-size: 60px;
	}
	.text-container p {
		font-size: 20px;
	}
}
/* transition group */
.fade-in-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.fade-in-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-in-enter-active {
	transition: all 0.5s ease;
}
</style>
