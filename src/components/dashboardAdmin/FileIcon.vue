<script setup>
import { addIcons, OhVueIcon } from "oh-vue-icons";
import {
	BiFiletypeDoc,
	BiFiletypeDocx,
	BiFiletypeCsv,
	BiFiletypePdf,
	BiFiletypeTxt,
	BiFileText,
} from "oh-vue-icons/icons";

/**{
	// BiFiletypeDoc ==> doc
	// fill: rgb(80, 190, 232)
	// BiFiletypeDocx ==> docx
	// fill: rgb(80, 190, 232)
	// BiFiletypeCsv ==> csv
	// rgb(247, 184, 78);
	// BiFiletypePdf ==> pdf
	// style="fill: rgb(241, 86, 66)"
	// BiFiletypeTxt ==> text
	//fill: rgb(87, 109, 126);
	// BiFileText ==> others
	//fill: rgb(87, 109, 126);
} **/

// variables
let props = defineProps(["type"]);

addIcons(
	BiFiletypeDoc,
	BiFiletypeDocx,
	BiFiletypeCsv,
	BiFiletypePdf,
	BiFiletypeTxt,
	BiFileText
);
</script>

<template>
	<!-- file icons -->
	<!-- start if condition to see diffrent files according to file type  -->
	<!-- show doc -->
	<!-- open pdf in browser -->
	<span class="mb-1 p-3" v-if="props.type === 'doc'">
		<OhVueIcon
			name="bi-filetype-doc"
			scale="4"
			style="fill: rgb(80, 190, 232)"
		/>
	</span>
	<!-- show docs -->
	<span class="mb-1 p-3" v-else-if="props.type === 'docx'">
		<OhVueIcon
			name="bi-filetype-docx"
			scale="4"
			style="fill: rgb(80, 190, 232)"
		/>
	</span>
	<!--show pdf -->
	<span class="mb-1 p-3" v-else-if="props.type === 'pdf'">
		<OhVueIcon
			name="bi-filetype-pdf"
			scale="4"
			style="fill: rgb(241, 86, 66)"
		/>
	</span>
	<!--show csv -->
	<span class="mb-1 p-3" v-else-if="props.type === 'csv'">
		<OhVueIcon
			name="bi-filetype-csv"
			scale="4"
			style="fill: rgb(247, 184, 78)"
		/>
	</span>
	<!--show txt -->
	<span class="mb-1 p-3" v-else-if="props.type === 'txt'">
		<OhVueIcon
			name="bi-filetype-txt"
			scale="4"
			style="fill: rgb(87, 109, 126)"
		/>
	</span>
	<!-- other files -->
	<span class="mb-1 p-3" v-else>
		<OhVueIcon name="bi-file-text" scale="4" style="fill: rgb(87, 109, 126)" />
	</span>
</template>
