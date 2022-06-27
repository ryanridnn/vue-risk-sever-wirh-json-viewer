<script setup>
import { defineProps, computed } from "vue ";

const props = defineProps({
	label: String,
	content: Array,
});

const tableHeadings = computed(() => {
	return Object.keys(props.content[0]);
});
</script>

<template>
	<div class="table">
		<div class="table__label">
			{{ props.label }}
		</div>
		<table class="table__element">
			<tr class="table__row table__row-heading">
				<th
					v-for="heading in tableHeadings"
					:key="heading"
					class="table__heading"
				>
					{{ heading }}
				</th>
			</tr>
			<tr v-for="data in props.content" class="table__row">
				<td v-for="key in Object.keys(data)" class="table__data">
					{{ data[key] }}
				</td>
			</tr>
		</table>
	</div>
</template>

<style lang="scss">
.table {
	margin-bottom: 1rem;

	&__label {
		margin-bottom: 0.75rem;
	}

	&__element {
		display: flex;
		flex-direction: column;
		color: #222;
		border-radius: 0.75rem;
		overflow-y: auto;
		max-height: 600px;
		position: relative;
	}

	&__row {
		display: flex;
		width: 100%;
	}

	&__row-heading {
		top: 0;
		position: sticky;
	}

	&__heading,
	&__data {
		flex: 1;
		padding: 0.75rem;
		border: 0.5px solid #eee;
	}

	&__heading {
		font-weight: 500;
		background: rgb(37, 99, 235);
		color: white;
	}

	&__data {
		background: white;
	}
}
</style>
