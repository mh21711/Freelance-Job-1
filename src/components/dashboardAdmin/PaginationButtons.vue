<script setup>
import { ref } from "vue";

let props = defineProps(["number"]);

let currentPage = ref(1);

const updatePage = () => {
	let totalNumbers = Math.ceil(props.number / 25);
	let start = currentPage.value - 2;
	let end = currentPage.value + 2;

	if (start < 1) {
		start = 1;
		end = Math.min(totalNumbers, 5);
	}

	if (end > totalNumbers) {
		end = totalNumbers;
		start = Math.max(1, end - 4);
	}

	return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

let displayedNumbers = ref(updatePage());

const goToPage = (page) => {
	currentPage.value = page;
	displayedNumbers.value = updatePage();
};

const nextPage = () => {
	if (currentPage.value < Math.ceil(props.number / 25)) {
		currentPage.value += 1;
		displayedNumbers.value = updatePage();
	}
};

const previousPage = () => {
	if (currentPage.value > 1) {
		currentPage.value -= 1;
		displayedNumbers.value = updatePage();
	}
};
</script>

<template>
	<nav
		class="d-flex justify-content-center mt-5"
		aria-label="Page navigation example"
		v-if="props.number > 0"
	>
		<ul class="pagination">
			<li class="page-item">
				<button class="page-link" aria-label="Previous" @click="previousPage">
					<span aria-hidden="true">&laquo;</span>
				</button>
			</li>
			<li class="page-item" v-for="number in displayedNumbers" :key="number">
				<button class="page-link pagination-number" @click="goToPage(number)">
					{{ number }}

					<slot name="button" :number="number"></slot>
				</button>
			</li>
			<li class="page-item">
				<button class="page-link" aria-label="Next" @click="nextPage">
					<span aria-hidden="true">&raquo;</span>
				</button>
			</li>
		</ul>
	</nav>
</template>

<style scoped>
nav {
	width: 80vw;
}

nav .pagination-number {
	min-width: 50px;
}
.pagination-slot {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
}
</style>
