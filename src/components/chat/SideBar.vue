<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { IoClose } from "oh-vue-icons/icons";
// import HistoryMessage from "./HistoryMessage.vue";
import UserName from "./UserName.vue";
import UpgradePlans from "./UpgradePlans.vue";
import NewChat from "./NewChat.vue";
import ModelName from "./ModelName.vue";
import ChatHistoryVue from "./ChatHistory.vue";
import ShareFile from "./ShareFile.vue";
import ThePlanLimits from "./ThePlanLimits.vue";
// stores
// import stores
import { useToggleSidebar } from "../../stores/ToggleSidebar";
import { useFetchHistory } from "@/stores/FetchDataHistory";
import { useToggleChat } from "@/stores/ToggleChat.js";
import router from "@/router";

const toggleSidebar = useToggleSidebar();
const fetchHistory = useFetchHistory();
const ToggleChat = useToggleChat();

// register icons
addIcons(IoClose);
</script>
<template>
	<section class="history-container">
		<!-- close icon -->
		<span
			class="cancel-btn"
			@click="toggleSidebar.ToggleSidebar()"
			v-if="toggleSidebar.showSidebar"
		>
			<OhVueIcon name="io-close" class="cancel-icon" />
		</span>
		<!-- ModelName -->
		<div class="mb-2">
			<ModelName />
		</div>
		<hr />
		<!-- new chat -->
		<div class="new-chat-cont mb-2" @click="ToggleChat.showChat">
			<NewChat />
		</div>

		<div class="old-chat-cont mb-2" @click="ToggleChat.showHistory">
			<ChatHistoryVue @click="fetchHistory.getHistory()" />
		</div>

		<div class="share-knowlage-cont mb-2" @click="router.push('/dashboard')">
			<ShareFile />
		</div>
		<!-- history  -->
		<!-- <div class="history">
      <HistoryMessage />
    </div> -->
		<!-- plans -->
		<div class="plan-info position-absolute">
			<ThePlanLimits />
		</div>
		<UpgradePlans />
		<!-- username -->
		<div class="position-fixed bottom-0 mb-4 mt-2">
			<UserName show />
		</div>
	</section>
</template>

<style scoped>
.history-container {
	position: relative;
	color: white;
	height: 100vh;
}

.prices-cont {
	bottom: 100px;
}
@media only screen and (max-height: 750px) {
	.share-knowlage-cont {
		display: none;
	}
}

.history {
	max-height: 80%;
	overflow-y: auto;
}
.cancel-icon {
	color: white;
}
.cancel-btn {
	position: absolute;
	left: -60px;
	width: 40px;
	height: 40px;
	background-color: #001111;
	border: 1px solid #444;
	border-radius: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transition-duration: 0.3s;
}
.light {
	background-color: #fdfeff;
	color: black;
}
.cancel-btn:hover {
	background-color: #222;
}
.new-chat-cont:hover,
.old-chat-cont:hover,
.share-knowlage-cont:hover {
	background-color: #122;
	border-radius: 10px;
	cursor: pointer;
}

.plan-info {
	bottom: 200px;
	width: 100%;
}
</style>
