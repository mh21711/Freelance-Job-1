<script setup>
import { onMounted, ref } from "vue";
import ModelAbilityCard from "./ModelAbilityCard.vue";
// observe store
import { useObserverStore } from "@/stores/observerStore";

// variables
let cardContent = [
	{
		header: `الإجابة عن الاستفسارات والأسئلة`,
		content: `تشمل الإجابة ع أي تساؤل يخص القطاع المجتمعي وإعطاء التبصر اللازم لهذه الاستفسارات.`,
		icon: "ri-questionnaire-line",
		// RiQuestionnaireLine
	},

	{
		header: `رسم تصورات مشاريع مستقبلية`,
		content: `إعداد تصور عن بعض الأفكار الجديدة وذلك بكاتبة مقترح كامل يشمل التكلفة وتدارس بعض الأجزاء مع المستخدم.`,
		icon: "ai-ideas-repec",
		// AiIdeasRepec
	},

	{
		header: `إعطاء تقارير عن أي موضوع`,
		content: `إصدار تقارير إحصائية أو موضوعية عن أي موضوع يتعلق بالقطاع المجتمعي.`,
		icon: "bi-diagram-3",
		// BiDiagram3
	},

	{
		header: `إعداد الخطط المختلفة للتنفيذ`,
		content: `إعداد مقترحات خطط التنفيذ من خطط استراتيجية وتشغيلية وموازنات مالية وغيرها.`,
		icon: "bi-map",
		// BiMap
	},
];

let showTitle = ref(false);
const titleRef = ref(null);

const observerStore = useObserverStore();
onMounted(() => {
	observerStore.observeElement(titleRef, showTitle);
});
</script>
<template>
	<section class="text-center container">
		<div class="card-header mb-5" ref="titleRef">
			<Transition name="fade">
				<h2 v-if="showTitle">قدراتي</h2>
			</Transition>
		</div>

		<section class="card-container d-flex justify-content-evenly flex-wrap">
			<div
				class="my-3 col-md-5 col-12 d-flex justify-content-center"
				v-for="content in cardContent"
				:key="content.id"
			>
				<ModelAbilityCard
					:header="content.header"
					:paragraph="content.content"
					:icon="content.icon"
				/>
			</div>
		</section>
	</section>
</template>
<style scoped>
h2 {
	font-size: 100px;
}

@media only screen and (max-width: 992px) {
	.card-container h2 {
		font-size: 60px;
	}
}
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
