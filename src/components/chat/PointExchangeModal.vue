<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	MdImagesearchrollerOutlined,
	BiMegaphone,
	BiChatLeftText,
} from "oh-vue-icons/icons";
// stores
// import modals
import { useToggleModals } from "@/stores/ToogleModals";
import { useExchangePoints } from "@/stores/ExchangePoints";
import { useUserData } from "@/stores/UserData";

const toggleModals = useToggleModals();
const exchangePoint = useExchangePoints();
const userData = useUserData();
addIcons(MdImagesearchrollerOutlined, BiMegaphone, BiChatLeftText);
</script>
<template>
	<Teleport to="#points">
		<section
			v-if="toggleModals.showExchangeModel"
			@click.self="toggleModals.toggleShowExchangeModal"
			class="modal-container-parent d-flex justify-content-evenly align-items-center flex-wrap"
		>
			<!-- words -->
			<div class="modal-container col-8 col-md-3">
				<div class="icon mb-2">
					<OhVueIcon name="bi-chat-left-text" fill="#49A67B" scale="3" />
				</div>
				<h4>استبدل نقاطك بالنصوص</h4>
				<p>100 نقطة مقابل 1000 كلمة</p>
				<button
					class="btn btn-primary"
					@click.prevent="exchangePoint.exchangePoints('words')"
					:disabled="userData.pointsNum < 100"
				>
					استبدال
				</button>
			</div>

			<!--  -->
			<div class="modal-container col-8 col-md-3">
				<div class="icon mb-2">
					<OhVueIcon name="bi-megaphone" fill="#49A67B" scale="3" />
				</div>
				<h4>استبدل نقاطك بمحادثة صوتية</h4>
				<p>150 نقطة مقابل 20 تسجيل صوتي</p>
				<button
					class="btn btn-primary"
					@click.prevent="exchangePoint.exchangePoints('audio')"
					:disabled="userData.pointsNum < 150"
				>
					استبدال
				</button>
			</div>

			<!--  -->
			<div class="modal-container col-8 col-md-3">
				<div class="icon mb-2">
					<OhVueIcon
						name="md-imagesearchroller-outlined"
						fill="#49A67B"
						scale="3"
					/>
				</div>
				<h4>استبدل نقاطك بالصور</h4>
				<p>200 نقطة مقابل 10 صور</p>
				<button
					class="btn btn-primary"
					@click.prevent="exchangePoint.exchangePoints('image')"
					:disabled="userData.pointsNum < 200 || exchangePoint.loading"
				>
					استبدال
				</button>
			</div>
		</section>
	</Teleport>
</template>
<style scoped>
.modal-container-parent {
	text-align: center;
	height: 100vh;
	width: 100vw;
	background-color: #16191e9f;
	top: -100vh;
	position: absolute;
	z-index: 1000;
}
.modal-container {
	background-color: white;
	border: 1px solid #aaa;
	border-radius: 10px;
	height: 240px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.modal-container h4 {
	color: black;
}
.modal-container p {
	color: #555;
}
</style>
