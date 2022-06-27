<script setup>
import { defineProps, computed } from "vue";
import Readonly from "./Readonly.vue";
import Table from "./Table.vue";
import MultipleViewer from "./MultipleViewer.vue";

import { OUTPUT_TYPES } from "../constants";

const props = defineProps({
	output: Object,
});

const label = computed(() => Object.keys(props.output)[0]);

const content = computed(() => props.output[label.value]);

const type = computed(() => {
	const type = Object.prototype.toString
		.call(content.value)
		.replace("]", "")
		.split(" ")[1];

	if (["Number", "String", "Boolean"].includes(type)) {
		return OUTPUT_TYPES.READONLY;
	} else if (type === "Array") {
		if (typeof content.value[0] === "object") {
			return OUTPUT_TYPES.TABLE;
		} else {
			return OUTPUT_TYPES.MULTIPLE;
		}
	} else if (type === "Object") {
		return OUTPUT_TYPES.MULTIPLE;
	}

	return type;
});
</script>

<template>
	<div>
		<Readonly
			v-if="type === OUTPUT_TYPES.READONLY"
			:label="label"
			:content="content"
		/>
		<Table
			v-if="type === OUTPUT_TYPES.TABLE"
			:label="label"
			:content="content"
		/>
		<MultipleViewer
			v-if="type === OUTPUT_TYPES.MULTIPLE"
			:label="label"
			:content="content"
			:jsonOnly="Object.keys(content).length < 4"
		/>
	</div>
</template>

<style lang="scss"></style>
