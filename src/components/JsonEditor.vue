<script setup>
import { defineProps, ref } from "vue";
import { Vue3JsonEditor } from "vue3-json-editor";

const props = defineProps({
	model: Object,
	onChange: Function,
});
</script>

<template>
	<Vue3JsonEditor
		v-model="props.model"
		mode="form"
		@json-change="props.onChange"
	/>
</template>

<style lang="scss">
div.jsoneditor {
	border: none !important;
}

div.jsoneditor-outer {
	margin: 0 !important;
	padding: 1.5rem 1rem !important;
}

div.jsoneditor-field,
div.jsoneditor-value,
div.jsoneditor td,
div.jsoneditor th,
div.jsoneditor textarea,
.jsoneditor-schema-error {
	font-size: 1rem;
}

.jsoneditor {
	background: white;
	border-radius: 1rem;

	&-menu {
		display: none;
	}
}

.jsoneditor-vue div.jsoneditor-tree {
	min-height: 100px !important;
}
</style>
