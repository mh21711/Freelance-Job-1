<script setup>
import { onMounted } from "vue";
import FilterUsersList from "./FilterUsersList.vue";
import PaginationButtons from "./PaginationButtons.vue";
// stores
import { useAdminUserList } from "@/stores/AdminUserList";
import { useEditUser } from "@/stores/AdminUsersEdit";
// oh vue icons
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { FaCrown, BiThreeDotsVertical } from "oh-vue-icons/icons";

const AdminUserList = useAdminUserList();
const editUser = useEditUser();
onMounted(() => {
	AdminUserList.getUsersList(1);
});
addIcons(FaCrown, BiThreeDotsVertical);
</script>

<template>
	<section class="user-list-parent">
		<FilterUsersList />
		<article class="table-container" v-if="AdminUserList.usersList.length > 0">
			<table class="table table-hover">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">اسم المستخدم</th>
						<th scope="col">البريد الالكتروني</th>
						<th class="d-none d-md-table-cell" scope="col">عدد الكلمات</th>
						<th class="d-none d-md-table-cell" scope="col">عدد الصوتيات</th>
						<th class="d-none d-md-table-cell" scope="col">عدد الصور</th>
						<th class="d-none d-md-table-cell" scope="col">النقاط المتاحة</th>
						<th class="d-none d-md-table-cell" scope="col">الرقم التعريفي</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(user, index) in AdminUserList.usersList" :key="user.id">
						<th scope="row">{{ index + 1 }}</th>
						<!-- TODO -->
						<td>
							<span v-if="user.is_staff"
								><OhVueIcon name="fa-crown" fill="green"
							/></span>
							{{ user.name }}
						</td>
						<td class="user-email text-trunc">{{ user.email }}</td>
						<td class="d-none d-md-table-cell">{{ user.words_limit }}</td>
						<td class="d-none d-md-table-cell">{{ user.audio_limit }}</td>
						<td class="d-none d-md-table-cell">{{ user.image_media_limit }}</td>
						<td class="d-none d-md-table-cell">{{ user.points }}</td>
						<td class="d-none d-md-table-cell">{{ user.id }}</td>
						<!-- edit user information button -->
						<td>
							<span
								class="edit_icon p-1 rounded-5 dropdown-toggle"
								data-bs-toggle="dropdown"
								data-bs-display="static"
								aria-expanded="false"
							>
								<OhVueIcon name="bi-three-dots-vertical" />
							</span>
							<div class="btn-group">
								<ul class="dropdown-menu dropdown-menu-lg-start">
									<li>
										<RouterLink class="reboot-text" to="edit-user">
											<!-- !todo -->
											<span
												class="dropdown-item"
												@click="editUser.userData = user"
												>تعديل
											</span>
										</RouterLink>
									</li>
								</ul>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</article>
		<!-- pagination buttons -->
		<div class="pagination-buttons">
			<PaginationButtons
				:number="AdminUserList.usersCount"
				v-if="!AdminUserList.loading && !AdminUserList.noUsers"
			>
				<template #button="{ number }">
					<span
						class="pagination-slot"
						@click="AdminUserList.paginateUsers(number)"
					></span
				></template>
			</PaginationButtons>
		</div>
		<!-- if no user at all -->
		<article class="no-user-parent" v-if="AdminUserList.noUsers">
			<img src="/images/undraw_void_-3-ggu.svg" alt="no-users-logo" />
			<h1>لا يوجد مستخدمين</h1>
		</article>
		<!-- loader -->
		<section
			class="d-flex justify-content-center mt-5"
			v-if="AdminUserList.loading"
		>
			<div class="loader"></div>
		</section>
	</section>
</template>
<style scoped>
.table-container {
	transform: translateY(70px);
}

.pagination-buttons {
	transform: translateY(100px);
}

.no-user-parent {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	transform: translateY(200px);
}

.no-user-parent img {
	height: 50vh;
	width: 50vw;
}

/* start loader */
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

@media only screen and (max-width: 600px) {
	tr {
		font-size: 12px !important;
	}
}

.pagination-slot {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
}

.edit_icon:hover {
	background-color: #aaaa;
	transition: 0.3s;
}

.reboot-text {
	text-decoration: none;
}
</style>
