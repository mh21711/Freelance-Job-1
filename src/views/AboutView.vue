<script setup>
import AboutUs from "@/components/about-us/AboutUs.vue";
import OurGoals from "@/components/about-us/OurGoals.vue";
import TheFooter from "@/components/TheFooter.vue";
import RedirectSection from "@/components/RedirectSection.vue";
</script>
<template>
	<section class="about">
		<AboutUs />
		<OurGoals />
		<RedirectSection
			header="هل تحلم برفع عملك إلى مستوى جديد؟ دعنا نساعدك في تحقيق ذلك!"
		/>
		<TheFooter class="bg-black" />
	</section>
</template>

<style></style>
