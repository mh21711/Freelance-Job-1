<script setup>
import { useAdminData } from "@/stores/AdminData";
import { ref, watchEffect } from "vue";
// store variable assign
let adminData = useAdminData();

// file name to use as model for  search
let searchData = ref("");
// other filter
let otherFilter = ref(false);
// filter according to file type
let showFileType = ref(false);
let fileType = ref(null);
// filter according to id
let showUserId = ref(false);
let userId = ref(null);
// filter according to date
let showDateFilter = ref(false);
let startDate = ref(null);
let endDate = ref(null);

// watch for any filter values change
watchEffect(() => {
	adminData.otherFilter = otherFilter.value;
	adminData.fileType = fileType.value;
	adminData.userId = userId.value;
	adminData.startDate = startDate.value;
	adminData.endDate = endDate.value;
});

// function to show form of file type
let showFileTypefn = () => {
	showFileType.value = true;
	otherFilter.value = true;
	showUserId.value = false;
	showDateFilter.value = false;

	userId.value = null;
	startDate.value = null;
	endDate.value = null;
	searchData.value = null;
	adminData.search = false;
};

// function to show form of user id
let showUserIdFn = () => {
	showUserId.value = true;
	otherFilter.value = true;

	showFileType.value = false;
	showDateFilter.value = false;

	startDate.value = null;
	endDate.value = null;
	fileType.value = null;
	searchData.value = null;
	adminData.search = false;
};
// function to show date filetr
let showDateFilterFn = () => {
	otherFilter.value = true;

	showDateFilter.value = true;
	showUserId.value = false;
	showFileType.value = false;

	userId.value = null;
	fileType.value = null;
	searchData.value = null;
	adminData.search = false;
};

// function to filter according to date
function submitIdFilter() {
	adminData.FilterFiles("user", userId.value);
	adminData.filter = "";
}
// function to filter according to file type
function submitFileTypeFilter() {
	adminData.FilterFiles("file_type", fileType.value);
	adminData.filter = "";
}

// function to filter according to date
function submitDateFilter() {
	adminData.FilterFiles(startDate.value, endDate.value, 1, true);
	adminData.filter = "";
}

// function to filter according to search
function searchFilter() {
	adminData.search = true;
	adminData.filter = "";
	otherFilter.value = false;
	showDateFilter.value = false;
	showUserId.value = false;
	showFileType.value = false;
	adminData.searchFiles(searchData.value, 1);
}

// watch if search is empty remove search
watchEffect(() => {
	if (!searchData.value) {
		adminData.search = false;
	}
	adminData.searchValue = searchData.value;
});
</script>
<template>
	<article class="filter-files position-relative">
		<!-- filter according to status -->
		<div class="btn-cont">
			<button
				class="btn btn-light m-1"
				@click="adminData.getFileList(1), (searchData = null)"
				:class="{ 'btn-dark': adminData.filter === '' }"
			>
				الكل
			</button>
			<button
				class="btn btn-light m-1"
				@click="
					(adminData.filter = 'approved'),
						adminData.FilterFiles('status', 'approved', 1),
						(searchData = null)
				"
				:class="{ 'btn-dark': adminData.filter === 'approved' }"
			>
				مقبول
			</button>
			<button
				class="btn btn-light m-1"
				@click="
					(adminData.filter = 'pending'),
						adminData.FilterFiles('status', 'pending', 1),
						(searchData = null)
				"
				:class="{ 'btn-dark': adminData.filter === 'pending' }"
			>
				قيد الإنتظار
			</button>
			<button
				class="btn btn-light m-1"
				@click="
					(adminData.filter = 'rejected'),
						(searchData = null),
						adminData.FilterFiles('status', 'rejected', 1)
				"
				:class="{ 'btn-dark': adminData.filter === 'rejected' }"
			>
				مرفوض
			</button>

			<!-- more filter   options -->
			<div class="dropdown d-inline-block">
				<a
					class="btn dropdown-toggle"
					href="#"
					role="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					المزيد من الخيارات
				</a>
				<ul class="dropdown-menu">
					<li>
						<a @click.prevent="showFileTypefn" class="dropdown-item" href="#"
							>نوع الملف</a
						>
					</li>

					<!--  -->
					<li>
						<a @click.prevent="showUserIdFn" class="dropdown-item" href="#"
							>معرف المستخدم</a
						>
					</li>
					<!--  -->
					<li>
						<a @click.prevent="showDateFilterFn" class="dropdown-item" href="#"
							>تاريخ الرفع</a
						>
					</li>
				</ul>
				<!-- file type filter form -->
				<span>
					<form
						class="file-type-form d-inline-block d-inline-flex flex-column justify-content-center"
						@submit.prevent="submitFileTypeFilter()"
						v-if="showFileType"
					>
						<label for="file-type">تصنيف حسب نوع الملف</label>
						<select
							placeholder=" تصنيف حسب نوع الملف"
							v-model="fileType"
							id="file-type"
							data-v-294d27b4=""
							class="form-select form-select-lg d-inline-block"
							aria-label="Default select example"
							required=""
						>
							<option value="تقرير">تقرير</option>
							<option value="وثيقة مشروع">وثيقة مشروع</option>
							<option value="أنظمة وتشريعات">أنظمة وتشريعات</option>
							<option value="أبحاث وإصدارات">أبحاث وإصدارات</option>
							<option value="خطط استراتيجية">خطط استراتيجية</option>
							<option value="خطط تشغيلية">خطط تشغيلية</option>
							<option value="ميزانيات">ميزانيات</option>
							<option value="تدريب">تدريب</option>
						</select>
						<div class="d-flex justify-content-between mt-1">
							<button type="submit" class="btn btn-primary col-5">حفظ</button>
							<button
								type="reset"
								class="btn btn-danger col-5"
								@click="
									(fileType = null),
										(showFileType = false),
										(otherFilter = false),
										adminData.getFileList()
								"
							>
								الغاء
							</button>
						</div>
					</form>
				</span>
				<!-- user id  filter form -->
				<span>
					<form
						class="user-id-form d-inline-block d-inline-flex flex-column justify-content-center"
						@submit.prevent="submitIdFilter()"
						v-if="showUserId"
					>
						<label for="user-id">تصنيف حسب معرف المستخدم</label>
						<input
							required
							class="form-control"
							type="text"
							id="user-id"
							v-model="userId"
							placeholder="أدخل معرف المستخدم"
						/>
						<div class="d-flex justify-content-between mt-1">
							<button type="submit" class="btn btn-primary col-5">حفظ</button>
							<button
								type="reset"
								class="btn btn-danger col-5"
								@click="
									(userId = null),
										(showUserId = false),
										(otherFilter = false),
										adminData.getFileList()
								"
							>
								الغاء
							</button>
						</div>
					</form>
				</span>

				<!-- date  filter -->
				<span>
					<form
						class="user-id-form d-inline-block d-inline-flex flex-column justify-content-center"
						@submit.prevent="submitDateFilter"
						v-if="showDateFilter"
					>
						<input
							required
							class="form-control"
							type="date"
							id="date-filter-start"
							v-model="startDate"
						/>

						<input
							required
							class="form-control"
							type="date"
							id="date-filter-end"
							v-model="endDate"
						/>
						<div class="d-flex justify-content-between mt-1">
							<button type="submit" class="btn btn-primary col-5">حفظ</button>
							<button
								type="reset"
								class="btn btn-danger col-5"
								@click="
									(showDateFilter = false),
										(startDate = null),
										(endDate = null),
										(otherFilter = false),
										adminData.getFileList()
								"
							>
								الغاء
							</button>
						</div>
					</form>
				</span>
			</div>
			<!-- search files filters -->
			<input
				required
				v-model="searchData"
				placeholder=" أدخل كلمة البحث "
				type="text"
				class="btn m-1 search_bar"
			/>
			<!-- cancel button -->
			<button
				class="btn btn-danger ms-1 d-sm-inline-block d-none"
				type="reset"
				@click="(searchData = ''), adminData.getFileList()"
				:disabled="!searchData"
			>
				إلغاء
			</button>
			<!-- save button -->
			<button
				class="btn btn-primary"
				type="submit"
				@click="searchFilter()"
				:disabled="!searchData"
			>
				بحث
			</button>
		</div>
	</article>
</template>

<style scoped>
.filter-files {
	transform: translateY(50px);
}
.filter-files .btn-cont {
	width: fit-content;
	padding: 5px;
	background-color: #f0f0f0;
	border-radius: 15px;
}

.search_bar {
	border: 1px solid #aaa;
	background-color: white !important;
}
.search_bar:focus {
	border: 1px solid blue;
}
/* .form-select {
	transform: rotateY("90deg");
	width: 200px;
} */

.file-type-form {
	background-color: #f0f0f0;
	padding: 10px;
	border-radius: 10px;
	position: absolute;
	width: 300px;
	right: 100%;
	transform: translateX(100%);
	top: 130%;
}

.user-id-form {
	background-color: #f0f0f0;
	padding: 10px;
	border-radius: 10px;
	position: absolute;
	width: 300px;
	right: 100%;
	transform: translateX(100%);
	top: 130%;
}
/* modify more filter in small screen */
@media only screen and (max-width: 600px) {
	form {
		transform: translate(50%, 30%) !important;
		/* background-color: #aaa !important; */
		border: 1px solid black;
	}
}
</style>
