<script setup>
let props = defineProps(["header", "paragraph", "icon"]);
import { onMounted, ref } from "vue";
// observe store
import { useObserverStore } from "../stores/observerStore";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	RiQuestionnaireLine,
	AiIdeasRepec,
	BiDiagram3,
	BiMap,
} from "oh-vue-icons/icons";
addIcons(RiQuestionnaireLine, AiIdeasRepec, BiDiagram3, BiMap);
// variables

const refCard = ref(null);
let showCard = ref(false);

const observerStore = useObserverStore();
onMounted(() => {
	observerStore.observeElement(refCard, showCard);
});
</script>
<template>
	<section ref="refCard">
		<TransitionGroup name="fade">
			<article class="card" v-if="showCard">
				<div class="icon-container">
					<OhVueIcon :name="props.icon" scale="3" />
				</div>
				<h3 class="p-3">
					{{ props.header }}
				</h3>
				<p>
					{{ props.paragraph }}
				</p>
			</article>
		</TransitionGroup>
	</section>
</template>
<style scoped>
.card {
	border-radius: 15px;
	height: 400px;
	width: 300px;
	padding: 20px;
	background-color: #fff;
	border: 2px solid #eee;
	transition: 0.3s linear;
}
.card:hover {
	border: 2px solid green;
	transform: scale(1.1);
}
.card .icon-container {
	color: #49a67b;
}
.card h3 {
	font-size: 32px;
}
.card p {
	font-size: 20px;
	margin-top: 10px;
}
/* CSS for the card container */
/* animation */
.fade-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.fade-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-enter-active {
	transition: all 0.5s ease 100ms;
}
</style>
