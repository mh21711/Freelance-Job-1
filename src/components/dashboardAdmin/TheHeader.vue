<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	BiFileEarmark,
	MdUploadfile,
	PrUsers,
	LaUserPlusSolid,
	CoHamburgerMenu,
	RiCloseFill,
	OiGear,
	BiGraphUp,
} from "oh-vue-icons/icons";

// variables
let showSideBar = ref(true);
//

addIcons(
	BiFileEarmark,
	MdUploadfile,
	PrUsers,
	LaUserPlusSolid,
	CoHamburgerMenu,
	RiCloseFill,
	OiGear,
	BiGraphUp
);
</script>
<template>
	<aside v-bind="$attrs">
		<Transition name="slide-fade">
			<div class="links-container" v-show="showSideBar">
				<br />
				<!-- get file link in aside  -->
				<div class="files-parent d-flex">
					<span class="close-icon d-lg-none" @click="showSideBar = false">
						<OhVueIcon name="ri-close-fill" scale="2" fill="#333" />
					</span>

					<!-- link to get all files -->
					<RouterLink :to="{ name: 'files-list' }" class="d-flex p-3">
						<OhVueIcon
							name="bi-file-earmark"
							scale="1.5"
							fill=""
						/>
						<p class="me-3 h5">قائمة الملفات</p>
					</RouterLink>
				</div>

				<!-- admin files  list   -->
				<div class="file-list-parent">
					<RouterLink :to="{ name: 'users-list' }" class="d-flex p-3">
						<OhVueIcon name="pr-users" scale="1.5" fill="" />
						<h4 class="me-3 h6">قائمة المستخدمين</h4>
					</RouterLink>
				</div>

				<!-- admin upload file page link -->
				<div class="file-upload-parent">
					<RouterLink :to="{ name: 'upload-files' }" class="d-flex p-3">
						<OhVueIcon
							name="md-uploadfile"
							scale="1.5"
							fill=""
						/>
						<h4 class="me-3 h5">رفع الملفات</h4>
					</RouterLink>
				</div>

				<!-- modify the plans -->
				<div class="add-admin-parent">
					<RouterLink :to="{ name: 'modify-plans' }" class="d-flex p-3">
						<OhVueIcon name="oi-gear" scale="1.5" fill="" />
						<h4 class="me-3 h5">تعديل الخطط</h4>
					</RouterLink>
				</div>
				<!--  add  admins -->
				<div class="add-admin-parent">
					<RouterLink :to="{ name: 'statistics' }" class="d-flex p-3">
						<OhVueIcon
							name="bi-graph-up"
							scale="1.5"
							fill=""
						/>
						<h4 class="me-3 h5">الإحصائيات</h4>
					</RouterLink>
				</div>

				<!--  add  admins -->
				<div class="add-admin-parent">
					<RouterLink :to="{ name: 'add-admin' }" class="d-flex p-3">
						<OhVueIcon
							name="la-user-plus-solid"
							scale="1.5"
							fill=""
						/>
						<h4 class="me-3 h5">أضف مشرف</h4>
					</RouterLink>
				</div>
			</div>
		</Transition>
	</aside>
	<Transition>
		<span class="open-icon d-lg-none" @click="showSideBar = true">
			<OhVueIcon name="co-hamburger-menu" scale="2" v-show="!showSideBar" />
		</span>
	</Transition>
</template>
<style scoped>
.router-link-exact-active {
	background-color: #00FFFF;
	color: #2c2c2c;
}
.router-link-exact-active .svg {
	color: #2c2c2c;
}
a {
	color: white;
	text-decoration: none;
	width: 100%;
	transition-duration: 0.3s;
}
.links-container {
	top: 100px;
	width: 200px;
	background-color: #333333;
	height: 100vh;
	margin-top: 50px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2), 0 2px 10px rgba(0, 0, 0, 0.5);
}

@media only screen and (max-width: 991px) {
	.links-container {
		/* width: 100px; */
		position: fixed;
		right: 0;
		top: 40px;
		height: 100vh;
		z-index: 100;
	}
}
.close-icon {
	position: absolute;
	right: 190px;
	top: 0;
	background-color: #eee;
	border: 1px solid #aaa;
	border-radius: 5px;
}
.open-icon {
	transform: translate(-10px, -10px);
	margin-top: 20px;

	position: absolute;
	z-index: 88;
}

/* animation  */
.slide-fade-enter-active {
	transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
	transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
	transform: translateX(20px);
	opacity: 0;
}

/* transition open button */

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
