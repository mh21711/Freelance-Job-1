<script setup>
import WhoUs from "@/components/main page/WhoUs.vue";
import ModelAbility from "@/components/main page/ModelAbility.vue";
import ModelUses from "../components/ModelUses.vue";
import RedirectSection from "@/components/RedirectSection.vue";
import TheFooter from "../components/TheFooter.vue";
</script>

<template>
	<section>
		<!-- component to show who are we -->
		<WhoUs />
		<!-- component to show ability of model  -->
		<ModelAbility />
		<!-- ouer model ability component -->
		<ModelUses />
		<!-- section where i ask user to try services  -->
		<RedirectSection
			header="  ابدأ الآن "
			message="تنمية المجتمع بالاعتماد على المعرفة الذكية فرصة لمستقبل تنموي واعد"
		/>
		<!-- footer -->
		<TheFooter class="bg-black" />
	</section>
</template>
<style scoped></style>
