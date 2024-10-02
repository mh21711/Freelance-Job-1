<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useAdminUserList } from "@/stores/AdminUserList";
// store variable assign
const adminUserList = useAdminUserList();
// variable to use as model to search for user
let userNameSearch = ref("");
// fn to search for users
let searchUser = (name) => {
	adminUserList.filter = "search";
	adminUserList.searchUsers(name);
};

let getAdmins = () => {
	adminUserList.filter = "admins";
	adminUserList.filterUsers("admins", 1);
};
// function to get all users
let getAllUsers = () => {
	adminUserList.filter = "";
	adminUserList.filterUsers("all", 1);
};
// fn to get non admins users
let getNonAdminsUsers = () => {
	adminUserList.filter = "users";
	adminUserList.filterUsers("users", 1);
};

watchEffect(() => {
	adminUserList.userName = userNameSearch.value;
});
</script>
<template>
	<article class="filter-users position-relative">
		<!-- filter according to status -->
		<div class="btn-cont">
			<button
				class="btn btn-light m-1"
				@click="getAllUsers()"
				:class="{ 'btn-dark': adminUserList.filter === '' }"
			>
				الكل
			</button>
			<button
				class="btn btn-light m-1"
				@click="getAdmins()"
				:class="{ 'btn-dark': adminUserList.filter === 'admins' }"
			>
				المشرفون
			</button>
			<button
				class="btn btn-light m-1"
				@click="getNonAdminsUsers()"
				:class="{ 'btn-dark': adminUserList.filter === 'users' }"
			>
				المستخدمون
			</button>
			<!-- search for users -->
			<input
				required
				v-model="userNameSearch"
				placeholder=" أدخل كلمة البحث"
				type="text"
				class="btn m-1 search_bar"
			/>
			<button
				class="btn btn-danger ms-1"
				type="reset"
				@click="(userNameSearch = ''), getAllUsers()"
				:disabled="!userNameSearch"
			>
				إلغاء
			</button>
			<button
				class="btn btn-primary"
				type="submit"
				@click="searchUser(userNameSearch)"
				:disabled="!userNameSearch"
			>
				بحث
			</button>
		</div>
	</article>
</template>

<style scoped>
.filter-users {
	transform: translateY(50px);
}
.filter-users .btn-cont {
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
</style>
