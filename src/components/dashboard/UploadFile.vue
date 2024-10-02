<script setup>
// oh vue icons
import {
	RiArrowDropDownFill,
	BiUpload,
	BiFileEarmarkText,
} from "oh-vue-icons/icons";
import { addIcons, OhVueIcon } from "oh-vue-icons";
// vueuse
import { useFileDialog } from "@vueuse/core";

import { onMounted, onUpdated, ref, watch } from "vue";
import { useUploadFile } from "@/stores/UploadFile.js";
const FileUpload = useUploadFile();
// variable for options
const arabicCountries = [
	"المملكة العربية السعودية",
	"البحرين",
	"الجزائر",
	"الأردن",
	"الكويت",
	"لبنان",
	"ليبيا",
	"مصر",
	"موريتانيا",
	"المغرب",
	"عمان",
	"قطر",
	"تونس",
	"الإمارات العربية المتحدة",
	"اليمن",
	"أفغانستان",
	"أذربيجان",
	"أرمينيا",
	"باكستان",
	"بنغلاديش",
	"تركمانستان",
	"تركيا",
	"جورجيا",
	"جزر المالديف",
	"جزر سليمان",
	"جزر القمر",
	"سوريا",
	"سيراليون",
	"صربيا",
	"طاجيكستان",
	"عُمان",
	"فلسطين",
	"فيتنام",
	"قيرغيزستان",
	"كازاخستان",
	"كوريا الجنوبية",
	"كوريا الشمالية",
	"كيرغيزستان",
	"ليبيريا",
	"مالي",
	"منغوليا",
	"نيبال",
	"هندوراس",
	"هولندا",
	"ياباني",
	"زامبيا",
	"زيمبابوي",
	"الأرجنتين",
	"البحرين",
	"البرازيل",
	"البرتغال",
	"البوسنة والهرسك",
	"الدنمارك",
	"السلفادور",
	"السويد",
	"الصومال",
	"العراق",
	"الفلبين",
	"المكسيك",
	"النرويج",
	"الهند",
	"اليابان",
	"اليونان",
	"بوليفيا",
	"بولندا",
	"بيرو",
	"تشيلي",
	"جمهورية الدومينيكان",
	"جنوب السودان",
	"جورجيا",
	"رواندا",
	"روسيا",
	"رومانيا",
	"ساحل العاج",
	"سانت كيتس ونيفيس",
	"سانت فنسنت والغرينادين",
	"سانت لوسيا",
	"ساو تومي وبرينسيبي",
	"سريلانكا",
	"سوازيلاند",
	"سويسرا",
	"شيلى",
	"صربيا",
	"عمان",
	"فرنسا",
	"فنزويلا",
	"فنلندا",
	"فيجي",
	"قبرص",
	"قرغيزستان",
	"كرواتيا",
	"كمبوديا",
	"لاتفيا",
	"لبنان",
	"ليتوانيا",
	"ليسوتو",
	"ليبيريا",
	"مالطا",
	"ماليزيا",
	"مدغشقر",
	"موريتانيا",
	"موريشيوس",
	"موزمبيق",
	"مولدوفا",
	"ناميبيا",
	"نيجيريا",
	"هايتي",
	"هندوراس",
	"هنغاريا",
	"هولندا",
	"ويلز",
];
// let city = ref(null);

// file type options
const fileTypeOptions = [
	"تقرير",
	"وثيقة مشروع",
	"أنظمة وتشريعات",
	"أبحاث وإصدارات",
	"خطط استراتيجية",
	"خطط تشغيلية",
	"ميزانيات",
	"تدريب",
];

// set max date fir input field
var today = new Date().toISOString().split("T")[0];

let file = ref("");
let fileTitle = ref("");
let fileDate = ref("");
// اسم الجهة المصدرة
let publisher = ref("");
let city = ref(null);
let authorName = ref("");
let fileType = ref(null);
let fileNotes = ref("");
// no file var to handle erro
let noFile = ref(false);
const filteredCountries = ref([]);

// vueuse handle file upload
let { files, open, reset, onChange } = useFileDialog({
	accept: ".pdf,.doc,.docx",
	multiple: false, // Set to accept only one file
});

// function to filter countrys
const filterCities = () => {
	const query = city.value.toLowerCase();
	filteredCountries.value = arabicCountries.filter((country) =>
		country.toLowerCase().includes(query)
	);
};

watch(city, filterCities);
//TODO change to upload file to server
function uploadFiles(
	file,
	fileTitle,
	fileDate,
	publisher,
	city,
	authorName,
	fileType,
	fileNotes
) {
	checkFile();

	FileUpload.submitData(
		file,
		fileTitle,
		fileDate,
		publisher,
		city,
		authorName,
		fileType,
		fileNotes
	);

	// reset file data
	resetData();
}
//
let checkFile = () => {
	if (!files.value && !FileUpload.loading && !FileUpload.success) {
		console.log(FileUpload.loading);
		noFile.value = true;
	} else {
		noFile.value = false;
	}
};

onChange(() => {
	if (files.value && files.value.length > 0) {
		file.value = files.value[0];
	}
	checkFile();
});

function resetData() {
	fileTitle.value = "";
	fileDate.value = "";
	file.value = "";
	city.value = "";
	publisher.value = "";
	authorName.value = "";
	fileType.value = "";
	fileNotes.value = "";
	reset();
}
// check if file exist or not
onUpdated(() => {
	checkFile();
});
// regeister icons
addIcons(RiArrowDropDownFill, BiFileEarmarkText, BiUpload);
</script>

<template>
	<div class="container">
		<div class="form-upload-cont">
			<form
				:disabled="noFile"
				@submit.prevent="
					uploadFiles(
						file,
						fileTitle,
						fileDate,
						publisher,
						city,
						authorName,
						fileType,
						fileNotes
					)
				"
			>
				<h1 class="text-center">اختيار ملف</h1>
				<div class="file">
					<!-- choose file  -->
					<label class="form-label" for="customFile"></label>

					<button
						class="form-control"
						:class="{ 'no-file': noFile }"
						id="customFile"
						@click.prevent="open()"
					>
						<p v-if="file" style="color: green; font-size: 20px">
							{{ file.name }}
						</p>
						<!-- <OhVueIcon
							scale="6"
							name="ri-arrow-drop-down-fill"
							:style="{ color: file ? 'darkgreen' : '' }"
						/> -->
						<OhVueIcon
							v-if="file"
							scale="2"
							name="bi-file-earmark-text"
							class="my-3"
							:style="{ color: file ? 'darkgreen' : '' }"
						/>

						<OhVueIcon v-else scale="2" name="bi-upload" class="my-3" />
					</button>
				</div>
				<!-- file name  -->
				<div class="file-name my-2">
					<!--file name   -->
					<label>اسم الملف</label>
					<input
						v-model="fileTitle"
						type="text"
						id="file-name"
						class="form-control p-3"
						placeholder="اسم الملف"
						required
					/>
				</div>
				<!-- date  -->
				<div class="date my-2">
					<!-- date  -->
					<label for="date">تاريخ إصدار الملف</label>
					<input
						class="form-control p-3"
						type="date"
						id="date"
						required
						v-model="fileDate"
						:max="today"
					/>
				</div>

				<!--  اسم الجهة المصدرة-->
				<div class="publisher my-2">
					<!--file name   -->
					<label> اسم الجهة الناشرة</label>
					<input
						v-model="publisher"
						type="text"
						class="form-control p-3"
						placeholder="اسم الجهة الناشرة"
						required
					/>
				</div>

				<!--  اسم الجهة المصدرة-->
				<div class="author my-2">
					<!--file name   -->
					<label>المؤلف</label>
					<input
						v-model="authorName"
						type="text"
						class="form-control p-3"
						placeholder="المؤلف"
					/>
				</div>

				<!-- file type  options-->
				<!-- file type  options-->
				<div class="file-type my-2">
					<!-- file type  -->
					<label>نوع الملف</label>
					<select
						class="form-select form-select-lg"
						aria-label="Default select example"
						v-model="fileType"
						required
					>
						<option
							:value="FileType"
							:key="FileType"
							v-for="FileType in fileTypeOptions"
						>
							{{ FileType }}
						</option>
					</select>
				</div>
				<!-- <div class="search-country">
					<input type="text" class="form-control"  placeholder=""/>
				</div> -->
				<!--city options -->
				<!-- <div class="city my-2">
					<label>المنطقة/المدينة</label>
					<select
						v-model="city"
						class="form-select form-select-lg"
						aria-label="Default select example"
					>
						<option
							:value="country"
							:key="country"
							v-for="country in arabicCountries"
						>
							{{ country }}
						</option>
					</select>
				</div> -->

				<label for="country_dataList" class="form-label">المنطقة/المدينة</label>
				<input
					class="form-control"
					list="datalistOptions"
					id="country_dataList"
					placeholder="ابحث عن المدينة"
					v-model="city"
				/>
				<datalist id="datalistOptions">
					<option
						:value="country"
						:key="country"
						v-for="country in arabicCountries"
					>
						{{ country }}
					</option>
				</datalist>

				<!-- text area for notes -->
				<div class="my-2">
					<label for="note" class="form-label">نبذة عن الملف</label>
					<textarea
						class="form-control"
						id="note"
						rows="3"
						required
						v-model="fileNotes"
					></textarea>
				</div>
				<!-- sumit and reset buttons -->
				<div class="btn-cont d-flex justify-content-center mt-4">
					<button
						class="btn btn-danger mx-5"
						type="button"
						:disabled="!files"
						@click="resetData()"
					>
						حذف
					</button>
					<button class="btn btn-primary" :disabled="noFile">
						<span
							class="spinner-border"
							role="status"
							v-if="FileUpload.loading"
						>
						</span>
						<span v-else>ارسال</span>
					</button>

					<!-- alerts when submit file -->
					<!-- success alert when upload file -->
					<!-- <div
						class="alert alert-success position-absolute"
						role="alert"
						v-if="FileUpload.success"
					>
						تم رفع الملف بنجاح.
					</div> -->
					<!--  fail to upload file  -->
					<div
						class="alert alert-danger position-absolute"
						role="alert"
						v-if="FileUpload.errorUpload"
					>
						حدث خطأ أثناء تحميل الملف.
					</div>
				</div>
			</form>
		</div>
	</div>
</template>
<style scoped>
.container {
	margin-top: 50px;
}

.form-upload-cont {
  background-color: #333; /* White background for form */
  color: white;
  padding: 30px; /* Increased padding */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
}

h1 {
  color: white; /* Darker text for the title */
  margin-bottom: 20px; /* Space below title */
}

.file {
  margin-bottom: 20px; /* Spacing between fields */
}

.file-control {
  display: flex;
  align-items: center;
}

.file-control p {
  margin-left: 10px; /* Space between text and icon */
  font-size: 18px; /* Slightly smaller font size */
}

::placeholder {
	color: white;
}

.form-control,
.form-select {
  border: 1px solid #777; /* Border color */
  background-color: #555;
  border-radius: 4px; /* Slightly rounded corners */
  color: white;
  padding: 12px; /* Increased padding */
  transition: border-color 0.3s; /* Smooth transition for focus */
}

.form-control:focus,
.form-select:focus {
  border-color: #007bff; /* Change border color on focus */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Focus shadow */
}

label {
  font-weight: bold; /* Bold labels */
  margin-bottom: 5px; /* Space below labels */
  display: block; /* Labels take full width */
}

.btn-cont {
  margin-top: 30px; /* Increased spacing above buttons */
}

.btn {
  padding: 10px 20px; /* Increased button padding */
  font-size: 16px; /* Font size adjustment */
}

.alert {
  margin-top: 20px; /* Space above alerts */
  position: relative; /* Required for positioning */
}

.spinner-border {
  width: 1.5rem; /* Spinner size */
  height: 1.5rem; /* Spinner size */
}

@media (max-width: 768px) {
  .btn-cont {
    flex-direction: column; /* Stack buttons vertically */
    align-items: center; /* Center buttons */
  }

  .btn {
    margin-bottom: 10px; /* Space between stacked buttons */
    width: 100%; /* Full width buttons */
  }
}
</style>

