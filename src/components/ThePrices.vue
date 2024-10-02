<script setup>
let props = defineProps(["plan", "name"]);
</script>

<template>
	<div class="col-lg-4" v-if="props.plan">
		<div class="card mb-5 mb-lg-0">
			<div class="card-body">
				<h5 class="card-name">
					{{ props.name }}
				</h5>
				<h6 class="card-price">
					SAR {{ props.plan.monthly_price }}<span class="period">/الشهر</span>
				</h6>
				<hr />
				<!-- subscribe list -->
				<ul class="fa-ul">
					<li>
						<span class="fa-li"><i class="fas fa-check"></i></span>
						عدد الكلمات: {{ props.plan.words_limit }}
					</li>
					<li v-if="props.plan.audio_limit">
						<span class="fa-li"><i class="fas fa-check"></i></span>
						الدردشة الصوتية :{{ props.plan.audio_limit }} تسجيل
					</li>
					<li v-if="props.plan.image_media_limit">
						<span class="fa-li"><i class="fas fa-check"></i></span>
						عدد الصور :{{ props.plan.image_media_limit }}
					</li>
				</ul>
				<div class="d-grid">
					<slot></slot>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
ul {
    list-style-type: none; /* Remove the default bullet points */
    padding-left: 0; /* Remove default padding */
}

ul li::before {
    content: "✔"; /* Use the checkmark symbol */
    color: green; /* Set the color of the checkmark */
    font-weight: bold; /* Make it bold if needed */
    display: inline-block; /* Make sure the symbol is inline */
    width: 1.5em; /* Adjust space between the checkmark and the text */
}

.card-name {
	background-color: #7E57C2;
	width: fit-content;
	padding: 10px;
	border-radius: 10px;
	color: white;
	margin-bottom: 20px;
}

section.pricing {
	background: #007bff;
	background: linear-gradient(to right, #0062e6, #33aeff);
}

.pricing .card {
	border: none;
	border-radius: 1rem;
	transition: all 0.2s;
	box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
	height: 500px;
}

.pricing hr {
	margin: 1.5rem 0;
}

.pricing .card-title {
	margin: 0.5rem 0;
	font-size: 0.9rem;
	letter-spacing: 0.1rem;
	font-weight: bold;
}

.pricing .card-price {
	font-size: 1.7rem;
	margin: 0;
}

.pricing .card-price .period {
	font-size: 1rem;
}

.pricing ul li {
	margin-bottom: 1rem;
}

.pricing .text-muted {
	opacity: 0.7;
}

.pricing .btn {
	font-size: 80%;
	border-radius: 5rem;
	letter-spacing: 0.1rem;
	font-weight: bold;
	padding: 1rem;
	opacity: 0.7;
	transition: all 0.2s;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
	.pricing .card:hover {
		margin-top: -0.25rem;
		margin-bottom: 0.25rem;
		box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
	}

	.pricing .card:hover .btn {
		opacity: 1;
	}
}
</style>
