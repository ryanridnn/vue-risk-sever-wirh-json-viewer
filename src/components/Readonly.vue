<script setup>
import { defineProps } from "vue";

const props = defineProps({
	label: String,
	content: Number || String || Boolean,
});
</script>

<template>
	<div class="readonly">
		<div class="readonly__label">
			{{ props.label }}
		</div>
		<input
			type="text"
			:value="props.content"
			disabled
			class="readonly__input"
		/>
	</div>
</template>

<style lang="scss">
.readonly {
	display: flex;
	justify-content: space-between;
	align-items: center;

	max-width: 520px;

	&__input {
		min-width: 280px;
		padding: 0.5rem;
		border-radius: 0.25rem;
	}
}
</style>
