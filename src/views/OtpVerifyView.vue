<!-- <script setup>
import { onMounted, ref, watch } from "vue";
import { useEmailStore } from "@/stores/EmailStore";
let EmailStore = useEmailStore();
// tem refs to inputs
const otpInput0 = ref("");
const otpInput1 = ref("");
const otpInput2 = ref("");
const otpInput3 = ref("");
const otpInput4 = ref("");
const otpInput5 = ref("");

const otp = ref(["", "", "", "", "", ""]);
let isButtonActive = ref(false);

const verify = () => {
	let otpCode = ref(parseInt(otp.value.join("")));
	EmailStore.verfiyOtp(otpCode.value);
};

const checkButtonState = () => {
	const allFilled = otp.value.every((value) => value !== "");
	isButtonActive.value = allFilled;
};

function sendOtpAgain() {
	EmailStore.sendOtpAgain();
}

const watchOtp = () => {
	checkButtonState();
};

watch(() => otp, watchOtp, { deep: true });

onMounted(() => {
	otpInput0.value.focus();
});


</script>

<template>
	<div class="container-fluid bg-body-tertiary d-block" dir="ltr">
		<div class="row justify-content-center">
			<div class="col-12 col-md-6 col-lg-4" style="min-width: 500px">
				<div
					class="card bg-white mb-5 mt-5 border-0"
					style="box-shadow: 0 12px 15px rgba(0, 0, 0, 0.02)"
				>
					<div class="card-body p-5 text-center">
						<h4>تحقق</h4>
						<p>تم إرسال الرمز عبر البريد الإلكتروني</p>

						<div class="otp-field mb-4">
							<input
								v-model="otp[0]"
								type="number"
								@input="otpInput1.focus()"
								ref="otpInput0"
								min="0"
								max="9"
							/>
							<input
								v-model="otp[1]"
								type="number"
								@input="otpInput2.focus()"
								ref="otpInput1"
								min="0"
								max="9"
							/>
							<input
								v-model="otp[2]"
								type="number"
								@input="otpInput3.focus()"
								ref="otpInput2"
								min="0"
								max="9"
							/>
							<input
								v-model="otp[3]"
								type="number"
								@input="otpInput4.focus()"
								ref="otpInput3"
								min="0"
								max="9"
							/>
							<input
								v-model="otp[4]"
								type="number"
								@input="otpInput5.focus()"
								ref="otpInput4"
								min="0"
								max="9"
							/>
							<input
								v-model="otp[5]"
								type="number"
								@input="otpInput5.blur()"
								ref="otpInput5"
								min="0"
								max="9"
							/>
						</div>

						<button
							class="btn btn-primary mb-3"
							:class="{ active: isButtonActive }"
							@click="verify"
							type="submit"
							:disabled="!isButtonActive"
						>
							تفعيل
						</button>

						<p class="resend text-muted mb-0">
							لم تتلق الرمز؟
							<span class="resend-again" @click.prevent="sendOtpAgain()"
								>اطلب مرة أخرى</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container-fluid.bg-body-tertiary {
	height: 100vh;
	border-top: 1px solid #eee;
}
.otp-field {
	flex-direction: row;
	column-gap: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.otp-field input {
	caret-color: green;
	height: 45px;
	width: 42px;
	border-radius: 6px;
	outline: none;
	font-size: 1.125rem;
	text-align: center;
	border: 1px solid #ddd;
}
.otp-field input:focus {
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
.otp-field input::-webkit-inner-spin-button,
.otp-field input::-webkit-outer-spin-button {
	display: none;
}

.resend {
	font-size: 12px;
}

.footer {
	position: absolute;
	bottom: 10px;
	right: 10px;
	color: black;
	font-size: 12px;
	text-align: right;
	font-family: monospace;
}

.footer a {
	color: black;
	text-decoration: none;
}

.resend-again {
	color: blue;
	text-decoration: underline;
	cursor: pointer;
}
</style> -->

<script setup>
import { onMounted, ref, watch } from "vue";
import { useEmailStore } from "@/stores/EmailStore";
let EmailStore = useEmailStore();
// tem refs to inputs
let otpInput = ref(null);

let otp = ref("");

let isButtonActive = ref(false);

const verify = () => {
	let otpCode = ref(otp.value);
	EmailStore.verfiyOtp(otpCode.value);
};

const checkButtonState = () => {
	if (otp.value === 0) {
		otp.value = otp.value + "-";
	}
	const isverifyed = otp.value.toString().length >= 6;
	isButtonActive.value = isverifyed;
};

function sendOtpAgain() {
	EmailStore.sendOtpAgain();
}

const watchOtp = () => {
	checkButtonState();
};

watch(() => otp, watchOtp, { deep: true });

onMounted(() => {
	otpInput.value.focus();
});
</script>

<template>
	<div class="container-fluid bg-body-tertiary d-block" dir="ltr">
		<div class="row justify-content-center">
			<div class="col-12 col-md-6 col-lg-4" style="min-width: 500px">
				<div
					class="card bg-white mb-5 mt-5 border-0"
					style="box-shadow: 0 12px 15px rgba(0, 0, 0, 0.02)"
				>
					<div class="card-body p-5 text-center">
						<h4>تحقق</h4>
						<p>تم إرسال الرمز عبر البريد الإلكتروني</p>

						<div class="otp-field mb-4">
							<input
								step="1"
								@input="(event) => (otp = event.target.value)"
								type="number"
								class="form-control p-3"
								ref="otpInput"
							/>
						</div>

						<button
							class="btn btn-primary mb-3"
							:class="{ active: isButtonActive }"
							@click="verify"
							type="submit"
							:disabled="!isButtonActive"
						>
							تفعيل
						</button>

						<p class="resend text-muted mb-0">
							لم تتلق الرمز؟
							<span class="resend-again" @click.prevent="sendOtpAgain()"
								>اطلب مرة أخرى</span
							>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.container-fluid.bg-body-tertiary {
	height: 100vh;
	border-top: 1px solid #eee;
}
.otp-field {
	flex-direction: row;
	column-gap: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
}

/* .otp-field input {
	caret-color: green;
	height: 45px;
	width: 42px;
	border-radius: 6px;
	outline: none;
	font-size: 1.125rem;
	text-align: center;
	border: 1px solid #ddd;
} */
/* .otp-field input:focus {
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
} */
.otp-field input::-webkit-inner-spin-button,
.otp-field input::-webkit-outer-spin-button {
	display: none;
}

.resend {
	font-size: 12px;
}

.footer {
	position: absolute;
	bottom: 10px;
	right: 10px;
	color: black;
	font-size: 12px;
	text-align: right;
	font-family: monospace;
}

.footer a {
	color: black;
	text-decoration: none;
}

.resend-again {
	color: blue;
	text-decoration: underline;
	cursor: pointer;
}
</style>
