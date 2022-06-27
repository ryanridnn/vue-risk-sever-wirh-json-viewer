<script setup>
import { defineProps, watchEffect, toRef } from "vue";
import JsonViewer from "vue-json-viewer";

const props = defineProps({
	content: Object,
});
</script>

<template>
	<JsonViewer :value="props.content" />
</template>

<style lang="scss">
.jv-container {
	border-radius: 1rem;
}

.jv-node {
	padding: 0.5rem 0;
}
</style>
