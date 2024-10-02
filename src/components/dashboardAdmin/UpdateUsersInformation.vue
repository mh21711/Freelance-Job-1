<script setup>
import { useEditUser } from "@/stores/AdminUsersEdit";
import { useRouter } from "vue-router";
const EditUser = useEditUser();
let userData = EditUser.userData;
const router = useRouter();
</script>
<template>
	<section class="container">
		<form @submit.prevent="EditUser.EditUser(userData.id)" v-if="userData">
			<div class="mb-3">
				<!-- name -->
				<div class="mb-3">
					<label for="user-name" class="form-label">اسم المستخدم</label>
					<input
						type="text"
						class="form-control p-3"
						id="user-name"
						:value="userData.name"
						disabled
					/>
				</div>
				<!-- email -->
				<div class="mb-3">
					<label for="user-email" class="form-label"
						>عنوان البريد الإلكتروني</label
					>
					<input
						type="email"
						class="form-control p-3"
						id="user-email"
						aria-describedby="emailHelp"
						:value="userData.email"
						disabled
					/>
				</div>
				<!-- words limits -->
				<div class="mb-3">
					<label for="words_limit" class="form-label"
						>عدد الكلمات المتاحة</label
					>
					<input
						type="number"
						class="form-control p-3"
						id="words_limit"
						v-model="EditUser.userData.words_limit"
						min="0"
					/>
				</div>
			</div>
			<!-- audio limits -->
			<div class="mb-3">
				<label for="audio_limit" class="form-label">عدد التسجلات المتاحة</label>
				<input
					type="number"
					class="form-control p-3"
					id="audio_limit"
					v-model="EditUser.userData.audio_limit"
					min="0"
				/>
			</div>
			<!-- images limits -->
			<div class="mb-3">
				<label for="image_media_limit" class="form-label"
					>عدد الصور المتاحة</label
				>
				<input
					type="number"
					class="form-control p-3"
					id="image_media_limit"
					v-model="EditUser.userData.image_media_limit"
					min="0"
				/>
			</div>
			<!-- points limits -->
			<div class="mb-3">
				<label for="points" class="form-label">عدد النقاط المتاحة</label>
				<input
					type="number"
					class="form-control p-3"
					id="points"
					min="0"
					v-model="EditUser.userData.points"
				/>
			</div>

			<!-- buttons groups -->
			<div class="d-flex justify-content-center me-2">
				<button
					type="reset"
					class="btn btn-danger"
					@click="router.push('/users-list')"
				>
					إلغاء
				</button>
				<button
					type="submit"
					class="btn btn-primary me-2"
					:disabled="!userData.id"
				>
					حفظ
				</button>
			</div>
		</form>
	</section>
</template>

<style scoped>
.container {
	margin-top: 100px;
}
</style>
