<script setup>
import { onMounted, watchEffect, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { useAdminData } from "@/stores/AdminData.js";

const adminData = useAdminData();
const router = useRouter();

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

let fileTitle = ref("");
let fileDate = ref("");
// اسم الجهة المصدرة
let publisher = ref("");
let city = ref("");
let authorName = ref("");
let fileType = ref("");
let fileNotes = ref("");

function resetData() {
	fileTitle.value = "";
	fileDate.value = "";
	city.value = "";
	publisher.value = "";
	authorName.value = "";
	fileType.value = "";
	fileNotes.value = "";
}

onMounted(() => {
	fileTitle.value = adminData.editFileData.file_name;
	fileDate.value = adminData.editFileData.release_date;
	city.value = adminData.editFileData.city;
	publisher.value = adminData.editFileData.source_entity_name;
	authorName.value = adminData.editFileData.author;
	fileType.value = adminData.editFileData.file_type;
	fileNotes.value = adminData.editFileData.overview;
});
</script>

<template>
	<div
		class="edit-file-container d-flex justify-content-center align-items-center"
	>
		<div class="form-upload-cont">
			<form
				@submit.prevent="
					adminData.updateFileInformation(
						fileTitle,
						fileDate,
						city,
						publisher,
						authorName,
						fileType,
						fileNotes
					)
				"
			>
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
				<div class="city my-2">
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
				</div>

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
						@click="router.back()"
					>
						إلغاء
					</button>
					<button class="btn btn-primary">
						<span class="spinner-border" role="status" v-if="adminData.loading">
						</span>
						<span v-else>ارسال</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<style scoped>
.edit-file-container {
	min-height: calc(100vh - 92px);
	margin-top: 40px;
	margin-bottom: 40px;
	/* width: 100vw; */
}

.file-name,
.date,
.author,
.file-type,
.publisher,
.city {
	width: 55vw;
}

.city {
	position: relative;
}
.city .search {
	position: absolute;
	top: 0;
	left: 0;
}
/* make max height option is 50vh */
select.form-select option {
	max-height: 50vh;
	overflow-y: auto; /* Add scroll bar if options exceed 50vh */
}

.no-file {
	border: 1px solid red;
}
.alert-success {
	bottom: 100px;
	transition-duration: 0.3s;
}
.alert-danger {
	bottom: 100px;
	transition-duration: 0.3s;
}
</style>
