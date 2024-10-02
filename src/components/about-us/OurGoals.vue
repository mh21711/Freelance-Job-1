<script setup>
import { ref, onMounted } from "vue";

let goals = [
	{ goal: "وضع قاعدة بيانات شاملة لمعلومات   القطاع المجتمعي." },
	{ goal: "تحويل المعلومات إلى معارف وتقارير يتم الاستفادة منها." },
	{
		goal: "توظيف الذكاء الاصطناعي لتحليل هذه المعلومات والمعارف لتساهم في حل المشاكل الاجتماعية بصورة وكفاءة عالية.",
	},
	{
		goal: "إصدار التقارير الدورية والإحصاءات على واقع العمل المجتمعي.",
	},
	{
		goal: "بناء توجهات واستشراف المستقبلات للقطاع المجتمعي في المنطقة.",
	},
	{
		goal: "ربط التحليلات والمعارف والتوجهات بالتجار العالمية.",
	},
];
import { useObserverStore } from "@/stores/observerStore";
// stores
const observeStore = useObserverStore();

// variable
// component ref assigned to parent
let goalsRef = ref(null);
// variable to use in observe store to toggle our vision
let showGoals = ref(false);
// on mpounted
onMounted(() => {
	observeStore.observeElement(goalsRef, showGoals);
});
</script>
<template>
	<section class="text-container container-fluid text-center">
		<Transition name="fade-title">
			<h2 class="title" v-if="showGoals">أهدافي</h2>
		</Transition>
		<!-- vison card  -->
		<article
			class="goal-container d-flex flex-wrap justify-content-center justify-content-md-evenly align-items-center"
			ref="goalsRef"
		>
			<TransitionGroup name="fade-group">
				<div
					class="goal col-8 col-md-5 d-flex flex-wrap justify-content-center align-items-center mb-5"
					v-for="goal in goals"
					:key="goal.id"
					v-if="showGoals"
				>
					<p>{{ goal.goal }}</p>
				</div>
			</TransitionGroup>
		</article>
	</section>
</template>

<style scoped>
h2 {
	margin-bottom: 30px;
}

.text-container {
	line-height: 1.6;
	transition-duration: 1s;
	min-height: 100vh;
	margin-top: 50px;
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

/* style  goal container */
.goal-container .goal {
	padding: 10px;
	margin-top: 20px;
	/* background-color: #fefefe; */
	height: 200px;
	border-radius: 20px;
	border: 1px solid #eee;
	transition-duration: 0.3s;
}
.goal-container .goal:hover {
	border-color: rgba(2, 114, 2, 0.611);
	transform: scale(1.1);
	background-color: #fefefa;
}
/* handle title animation */
.fade-title-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.fade-title-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-title-enter-active {
	transition: all 0.5s ease;
}
/* cards animation*/
.fade-group-enter-from {
	opacity: 0;
	transform: translateY(50%);
}
.fade-group-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-group-enter-active {
	transition: all 0.5s ease 100ms;
}
</style>
