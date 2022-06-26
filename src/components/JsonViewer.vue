<script setup>
import { defineProps, watchEffect, toRef } from "vue";
import { Vue3JsonEditor } from "vue3-json-editor";

const props = defineProps({
	schema: Object,
	mode: String,
});

const schema = toRef(props, "schema");

watchEffect(() => {
	console.log(schema);
});
</script>

<template>
	<Vue3JsonEditor
		v-model="schema"
		:expandedOnStart="true"
		:mode="props.mode"
	/>
</template>

<style></style>
