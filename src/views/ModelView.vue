<script setup>
import SendMessage from "../components/chat/SendMessage.vue";
import sideBar from "../components/chat/SideBar.vue";
import ChatBody from "../components/chat/ChatBody.vue";
// import point exchange modal
import PointExchangeModal from "../components/chat/PointExchangeModal.vue";
// import stores
import { useToggleSidebar } from "../stores/ToggleSidebar";
// import { useModalToggleEdit } from "../stores/ModalToggleEdit";
const toggleSidebar = useToggleSidebar();

// regester icons
</script>
<template>
	<section class="model-container">
		<Transition name="insert">
			<aside
				class="aside-container container d-block"
				v-if="toggleSidebar.showSidebar"
			>
				<sideBar />
			</aside>
		</Transition>

		<section class="body-container d-flex flex-column">
			<KeepAlive>
				<ChatBody />
			</KeepAlive>

			<!-- modal to exchange points   -->
			<PointExchangeModal />
			<!-- form to send message  -->
			<SendMessage />
		</section>
		<!-- model show to edit message -->
	</section>
</template>
<style scoped>
.model-container {
	position: relative;
	max-height: 100vh;
}
/* controle side in middle to small screen */
.aside-container {
	position: fixed;
	z-index: 110;
	width: 250px;
	height: 96vh;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	border-radius: 20px;
	background-color: #001111;
	transition-duration: 0.5s;
}
.body-container {
	position: relative;
	max-height: 100vh;
}

/* animate sidebar */

.insert-leave-to,
.insert-enter-from {
	opacity: 0;
	transform: translateX(50%) translateY(-50%);
}
.insert-leave-from,
.insert-enter-to {
	opacity: 1;
	transform: translateX(0) translateY(-50%);
}

.insert-enter-active {
	transition: all 0.5s ease-in-out 100ms;
}
</style>
