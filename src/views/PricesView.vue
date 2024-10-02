<script setup>
import ThePrices from "@/components/ThePrices.vue";
import VueCookies from "vue-cookies";
import { useRouter } from "vue-router";
import { ref, onMounted, watchEffect } from "vue";

//stores
import { useFetchPlans } from "@/stores/FetchPlansData.js";
import { useSubscribePlan } from "@/stores/SubscribePlan.js";
const fetchPlans = useFetchPlans();
const subscribePlan = useSubscribePlan();
// get jwt
let jwtToken = VueCookies.get("jwt");
const router = useRouter();

let plan1 = ref("");
let plan2 = ref("");
let plan3 = ref("");

let active = ref(false);

let checkActive = () => {
	if (subscribePlan.active) {
		active.value = true;
	} else if (
		subscribePlan.subscribePlan === "enterprise" ||
		subscribePlan.subscribePlan === "premium"
	) {
		active.value = true;
	} else {
		active.value = false;
	}
};

// functions
// subscribe to free plan fn
function subFree() {
	let jwtToken = VueCookies.get("jwt");
	if (!jwtToken) {
		router.push("/login");
	} else {
		subscribePlan.subscribeFree();
	}
	checkActive();
	router.push("/chat");
}

checkActive();
function subPayed(plan, duration) {
	let jwtToken = VueCookies.get("jwt");

	if (!jwtToken) {
		router.push("/login");
	} else {
		subscribePlan.subscribe(plan, duration);
	}
}
// get plans
onMounted(() => {
	subscribePlan.getSubscribe();
	fetchPlans.fetchPlanData();
});

watchEffect(() => {
	plan1.value = fetchPlans.basicPlan;
	plan2.value = fetchPlans.premiumPlan;
	plan3.value = fetchPlans.enterprisePlan;
	active.value = subscribePlan.active;
});

setInterval(() => {
	if (router.path === "/prices") {
		window.onfocus = function () {
			subscribePlan.getSubscribe();
		};
	}
}, 500);
</script>

<template>
	<section class="pricing py-5">
		<h1 style="text-align: center; margin-bottom: 50px;">اختر خطتك</h1>
		<div class="container">
			<div class="row" v-if="plan1 && plan2 && plan3">
				<!-- basic (free) -->
				<ThePrices :plan="plan1" name="الخطة المجانية">
					<button
						@click="subFree"
						:disabled="
							(subscribePlan.subscribePlan === 'basic' && active) ||
							subscribePlan.subscribePlan === 'premium' ||
							subscribePlan.subscribePlan === 'enterprise'
						"
						class="btn btn-primary text-uppercase"
					>
						سجل مجانا
					</button>
				</ThePrices>
				<!--  -->
				<ThePrices :plan="plan2" name="الخطة الأساسية ">
					<button
						:disabled="
							subscribePlan.subscribePlan === 'premium' ||
							subscribePlan.subscribePlan === 'enterprise'
						"
						@click="subPayed('premium', 'm')"
						class="btn btn-primary text-uppercase"
						:class="{
							'btn-success': subscribePlan.subscribePlan === 'premium',
						}"
					>
						{{ subscribePlan.subscribePlan === "premium" ? "مشترك" : "اشترك" }}
					</button>
				</ThePrices>
				<ThePrices :plan="plan3" name="الخطة الاحترافية">
					<button
						:disabled="
							subscribePlan.subscribePlan === 'enterprise' ||
							subscribePlan.subscribePlan === 'premium'
						"
						@click="subPayed('enterprise', 'm')"
						class="btn btn-primary text-uppercase"
						:class="{
							'btn-success': subscribePlan.subscribePlan === 'enterprise',
						}"
					>
						{{
							subscribePlan.subscribePlan === "enterprise" ? "مشترك" : "اشترك"
						}}
					</button>
				</ThePrices>
			</div>
			<div v-else class="d-flex justify-content-center">
				<div class="loader"></div>
			</div>
		</div>
	</section>
</template>
<style scoped>
button {
	margin-top: 240px;
}
.loader {
	width: 50px;
	aspect-ratio: 1;
	display: grid;
}
.loader::before,
.loader::after {
	content: "";
	grid-area: 1/1;
	--c: no-repeat radial-gradient(farthest-side, #25b09b 92%, #0000);
	background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%,
		var(--c) 0 50%;
	background-size: 12px 12px;
	animation: l12 1s infinite;
}
.loader::before {
	margin: 4px;
	filter: hue-rotate(45deg);
	background-size: 8px 8px;
	animation-timing-function: linear;
}

@keyframes l12 {
	100% {
		transform: rotate(0.5turn);
	}
}
</style>
