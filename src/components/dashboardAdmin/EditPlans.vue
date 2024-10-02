<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

import VueCookies from "vue-cookies";
import axios from "axios";
let loading = ref(false);

let planType = ref(null);
let monthlyPrice = ref(null);
let wordsNumber = ref(null);
let audioNumber = ref(null);
let imageNumber = ref(null);

// function to fire error
let FireError = () => {
	Swal.fire({
		icon: "error",
		title: "عذراً...",
		text: "حدث خطأ ما!",
		confirmButtonColor: "#ff0000", //<==>
	});
};

// reset data
let resetData = () => {
	planType.value = null;
	monthlyPrice.value = null;
	wordsNumber.value = null;
	audioNumber.value = null;
	imageNumber.value = null;
};

// send request to modify plans
let updatePlan = () => {
	loading.value = true;
	// start fetch datas
	let body = {};

	// check the avilable variables
	function checkVariables() {
		if (wordsNumber.value) {
			body.words_limit = wordsNumber.value;
		}
		if (monthlyPrice.value) {
			body.monthly_price = monthlyPrice.value;
		}
		if (audioNumber.value) {
			body.audio_limit = audioNumber.value;
		}
		if (imageNumber.value) {
			body.image_media_limit = imageNumber.value;
		}
	}

	checkVariables();
	// make request to back end to post question
	let jwtToken = VueCookies.get("jwt");

	axios
		.patch(`${import.meta.env.VITE_UPDATE_PLAN}${planType.value}/`, body, {
			withCredentials: true,

			headers: {
				Authorization: `Bearer ${jwtToken}`,
				"Content-Type": "application/json",
				"Content-Type": "multipart/form-data",
			},
		})
		.then((res) => {
			Swal.fire({
				title: "تم",
				text: "تم تعديل الخطة بنجاح",
				icon: "success",
			});
		})
		.catch((err) => {
			FireError();
		})
		.finally(() => {
			resetData();
			loading.value = false;
		});
};
</script>
<template>
	<section class="container">
		<form class="edit-plan" @submit.prevent="updatePlan">
			<!-- choose which plan to modify  -->
			<h1>تعديل الخطط</h1>
			<div class="mb-3">
				<label for="plan-select" class="form-label"> نوع الخطة</label>
				<select
					class="form-select form-select-lg"
					id="plan-select"
					required
					v-model="planType"
					style="padding: 1rem 2.5rem;"
				>
					<option value="1">الخطة المجانية</option>
					<option value="2">الخطة الأساسية</option>
					<option value="3">الخطة الاحترافية</option>
				</select>
			</div>
			<!-- monthly price plan -->
			<div class="mb-3">
				<label for="price" class="form-label"> السعر الشهري للخطة</label>
				<input
					min="0"
					type="number"
					class="form-control p-3"
					id="price"
					v-model="monthlyPrice"
				/>
			</div>

			<!-- word limits -->
			<div class="mb-3">
				<label for="word-limit" class="form-label">عدد الكلمات المتاحة</label>
				<input
					min="0"
					type="number"
					class="form-control p-3"
					id="word-limit"
					v-model="wordsNumber"
				/>
			</div>

			<!-- audio limits -->
			<div class="mb-3">
				<label for="audio-limit" class="form-label"
					>عدد المحادثة الصوتية المتاحة</label
				>
				<input
					min="0"
					type="number"
					class="form-control p-3"
					id="audio-limit"
					v-model="audioNumber"
				/>
			</div>
			<!--  image limit -->
			<div class="mb-3">
				<label for="image-limit" class="form-label">عدد الصور المتاحة</label>
				<input
					min="0"
					type="number"
					class="form-control p-3"
					id="image-limit"
					v-model="imageNumber"
				/>
			</div>
			<div class="button-group d-flex justify-content-center">
				<button type="reset" class="btn btn-danger">حذف</button>
				<button type="submit" class="btn btn-primary me-2">حفظ</button>
			</div>
		</form>
	</section>
</template>

<style scoped>
.container {
    background-color: #333; /* Darker background for contrast */
    padding: 40px;
    border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    max-width: 850px; /* Centering the form */
    margin: 50px auto; /* Center the form in the container */
}

h1 {
    margin-bottom: 30px;
    text-align: center;
    color: #fff; /* White text for better contrast */
}

.edit-plan {
    background-color: #333; /* Background for the form */
    padding: 20px;
    border-radius: 8px;
}

.mb-3 {
    margin-bottom: 1.5rem; /* Increased spacing between fields */
}

.form-label {
    color: #ddd; /* Light color for labels */
}

.form-select, .form-control {
    background-color: #555; /* Dark background for input fields */
    color: #fff; /* White text for better readability */
    border: 1px solid #777; /* Light border for inputs */
    border-radius: 5px; /* Rounded corners for inputs */
}

.form-select:focus, .form-control:focus {
    border-color: #007bff; /* Blue border on focus */
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Light blue glow */
}

.button-group {
    margin-top: 20px; /* Space above button group */
}

.btn {
    padding: 10px 20px; /* Increased button padding */
    border-radius: 5px; /* Rounded corners for buttons */
}

.btn-danger {
    background-color: #e74c3c; /* Red color for delete button */
}

.btn-primary {
    background-color: #3498db; /* Blue color for save button */
}

.btn-danger:hover {
    background-color: #c0392b; /* Darker red on hover */
}

.btn-primary:hover {
    background-color: #2980b9; /* Darker blue on hover */
}
</style>
