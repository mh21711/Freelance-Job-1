<script setup>
import { onMounted, ref, watchEffect } from "vue";
import PaginationButtons from "./PaginationButtons.vue";
import FilterHeader from "./FilterHeader.vue";
import { useAdminData } from "@/stores/AdminData";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { RiEditFill } from "oh-vue-icons/icons";
// store variable assign
let adminData = useAdminData();

// icon file
import FileIcon from "./FileIcon.vue";
import editFileVue from "./editFile.vue";

let filesList = ref(null);

watchEffect(() => {
	filesList.value = adminData.fileList;
});
// show pop up
let showPopOver = ref(null);
let showDetail = ref(false);
// function to edit file status
function editFileStatus(id) {
	showPopOver.value = parseInt(id) || null;
}

//* life cycle hook
onMounted(() => {
	adminData.getFileList(1);
});
addIcons(RiEditFill);
</script>

<template>
	<section class="file-container-parent">
		<!-- ! filter files according to status -->
		<FilterHeader class="mb-5" />
		<!-- show file dteail check box -->

		<span class="show-file-details mt-5">
			<span class="form-check form-switch">
				<input
					v-model="showDetail"
					class="form-check-input"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckChecked"
				/>
				<label class="form-check-label" for="flexSwitchCheckChecked"
					>عرض المزيد من تفاصيل الملف</label
				>
			</span>
		</span>

		<!--! file list container -->
		<section
			v-if="filesList"
			class="file-list-container container d-flex flex-wrap justify-content-start"
		>
			<div
				v-for="file in filesList"
				class="file-container d-flex flex-column justify-content-center align-items-center position-relative m-2 p-2 col-12 col-md-5 col-lg-2"
			>
				<!--  send message for update files status -->
				<span class="toggle-span" @click="editFileStatus(file.id)"
					><OhVueIcon name="ri-edit-fill"
				/></span>
				<!-- file status -->
				<span class="file-status">
					<p v-if="file.status === 'pending'" style="color: orange">انتظار</p>
					<p v-if="file.status === 'approved'" style="color: green">مقبول</p>
					<p v-if="file.status === 'rejected'" style="color: red">مرفوض</p>
				</span>
				<!-- file icons -->
				<!-- start if condition to see diffrent files according to file type  -->
				<!-- file place -->
				<a :href="file.file" target="_blank" rel="noopener noreferrer">
					<FileIcon
						:type="file.file.split('.')[file.file.split('.').length - 1]"
					/>
				</a>
				<div
					class="file-name-container w-100 overflow-hidden d-flex justify-content-evenly"
				>
					<p class="file-name">{{ file.file_name }}</p>
				</div>
				<!-- user name or admin -->
				<!-- date -->
				<div class="date-user-cont">
					<!-- <div class="date">
						<p>{{ file.release_date }}</p>
					</div> -->
					<div class="user-name text-truncate">
						<p>{{ file.user_name }}</p>
					</div>
					<!-- dive to show more data on pdf -->
				</div>
				<!--! class pop over  -->
				<div v-if="showPopOver === parseInt(file.id)">
					<editFileVue
						:style="{ top: showDetail ? '150px' : '' }"
						@closePopUp="showPopOver = null"
						:id="file.id"
						:file="file"
					/>
				</div>
				<!--! div to hold more information -->
				<div dir="rtl" class="info-container" v-if="showDetail">
					<p>اسم الملف: {{ file.file_name }}</p>
					<hr />
					<p>المؤلف : {{ file.author }}</p>
					<hr />
					<p>نوع الملف : {{ file.file_type }}</p>
					<hr />
					<p>المنطقة: {{ file.city }}</p>
					<hr />
					<p>تاريخ الإصدار : {{ file.release_date }}</p>
					<hr />
					<p>اسم الجهة المصدرة : {{ file.source_entity_name }}</p>
					<hr />
					<p>نبذة عن الملف: {{ file.overview }}</p>
				</div>
			</div>

			<PaginationButtons
				:number="adminData.filesNumber"
				v-if="!adminData.loading"
			>
				<template #button="{ number }">
					<span
						class="pagination-slot"
						@click="adminData.PaginateFile(number)"
					></span
				></template>
			</PaginationButtons>
		</section>

		<section class="no-file" v-if="filesList.length <= 0 && !adminData.loading">
			<img src="/images/undraw_no_data_re_kwbl.svg" alt="no file" />
			<h1>لا يوجد ملفات</h1>
		</section>
		<!-- loader -->
		<section
			class="d-flex justify-content-center mt-5"
			v-if="adminData.loading"
		>
			<div class="loader"></div>
		</section>
		<!-- modal to update file info -->
	</section>
</template>

<style scoped>
.filter-files {
	transform: translateY(50px);
}
.filter-files div {
	width: fit-content;
	padding: 5px;
	background-color: #f0f0f0;
	border-radius: 15px;
}
.show-file-details {
	display: inline-block;
	margin-top: 10px;
}

.file-list-container {
	margin-top: 80px;
}

.file-status {
	position: absolute;
	top: 10px;
	right: 10px;
	padding: 5px;
	text-align: center;
	height: 35px;
	font-weight: bold;
	border-radius: 5px;
}
.date-user-cont {
	border-top: 1px solid #eee;
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: flex-start;
	font-size: 14px;
	color: #666;
}

.file-name-container {
	font-size: 14px;
	margin-bottom: 10px;
	color: #222;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.file-container {
	min-height: 200px;
	border-radius: 15px;
	/* background-color: #f1f5f9; */
	background-color: #f9f9f9;
}
.info-container {
	width: 100%;
	padding: 1px 5px;
}
.file-name {
	position: relative;
}
.toggle-span {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 10%;
	font-weight: bold;
	padding: 5px;
	border-radius: 50%;
}

.no-file {
	width: 100%;
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.no-file img {
	height: 50vh;
}

/*start loader animation */
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
.pagination-slot {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
}
</style>
