<script setup>
import { ref, onMounted } from "vue";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaBrain, AiAcclaim, LaPuzzlePieceSolid } from "oh-vue-icons/icons";
import { useObserverStore } from "@/stores/observerStore";
// stores
const observeStore = useObserverStore();
// dat to show in ability
let data = [
	{
		title: "موثوق",
		description:
			"يُعَدّ الجيل الجديد من الذكاء الاصطناعي مصدر الثقة لمشروعك، حيث يُظهر فهما عميقا للمحتوى المبني على البيانات الضخمة.",
		icon: "ai-acclaim",
	},
	{
		title: "ذكي",
		description:
			"يتمتع بقدرة فائقة على التعامل مع مجموعات ضخمة من البيانات بأشكال متعددة، حيث يحللها ويفهمها بشكل ذكي.",
		icon: "fa-brain",
	},
	{
		title: "مخصص",
		description:
			"ذكاء متخصص بالمعرفة المجتمعية، مما يجلعه مثاليا لتلبية تفكرك التنموي ويتكيف بسهولة مع ما تصبوا إليه.",

		icon: "la-puzzle-piece-solid",
	},
];

// show card to toggle abilitys
let showCard = ref(false);
// ref for section to interact with after mount
const modelAbilityRef = ref(null);

onMounted(() => {
	observeStore.observeElement(modelAbilityRef, showCard);
});

addIcons(FaBrain, AiAcclaim, LaPuzzlePieceSolid);
</script>

<template>
	<section
		class="d-flex flex-column flex-md-row justify-content-center align-items-center my-5 mt-md-0"
		ref="modelAbilityRef"
	>
		<!-- loop over data to ability cards  -->
		<TransitionGroup name="fade-group">
			<article
				v-for="item in data"
				:key="item.title"
				class="d-flex justify-content-center align-items-center flex-column col-8 col-md-3 text-center m-3"
				v-if="showCard"
			>
				<OhVueIcon :name="item.icon" class="custom-icon" />
				<h2>{{ item.title }}</h2>
				<p>{{ item.description }}</p>
			</article>
		</TransitionGroup>
	</section>
</template>

<style scoped>
section {
	min-height: 70vh;
	overflow: hidden;
}

article svg {
	height: 200px;
	width: 200px;
	transition-duration: 0.5s;
}
h2 {
	font-size: 32px;
}
p {
	font-size: 22px;
}
/* change svg clolor whne hover  */
.custom-icon {
	color: #49a67b;
}
.custom-icon:hover {
	transform: translatey(-10px);
	color: green;
}
/* animate cards  */
/* animate all article */

.fade-group-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.fade-group-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-group-enter-active {
	transition: all 0.5s ease;
}
</style>
