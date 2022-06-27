<script setup>
import { defineProps, ref } from "vue";
import { MULTIPLE_VIEW_TYPES } from "../constants";

import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import JsonViewer from "./JsonViewer.vue";

const selectedView = ref(MULTIPLE_VIEW_TYPES.LINE);

const props = defineProps({
	jsonOnly: Boolean,
	label: String,
	content: Object,
});

const handleSelect = (view) => {
	selectedView.value = view;
};
</script>

<template>
	<div class="multiple">
		<div class="multiple__top">
			<div class="multiple__label">
				{{ props.label }}
			</div>
			<div v-if="!props.jsonOnly" class="multiple__views">
				<button
					v-for="key in Object.keys(MULTIPLE_VIEW_TYPES)"
					class="multiple__view"
					@click="handleSelect(MULTIPLE_VIEW_TYPES[key])"
					:class="{
						'multiple__view--selected':
							selectedView === MULTIPLE_VIEW_TYPES[key],
					}"
				>
					{{ MULTIPLE_VIEW_TYPES[key] }}
				</button>
			</div>
		</div>
		<div class="multiple__bottom">
			<JsonViewer
				v-if="
					selectedView === MULTIPLE_VIEW_TYPES.JSON || props.jsonOnly
				"
				:content="content"
			/>
			<LineChart
				v-if="
					selectedView === MULTIPLE_VIEW_TYPES.LINE && !props.jsonOnly
				"
				:content="props.content"
			/>
			<BarChart
				v-if="
					selectedView === MULTIPLE_VIEW_TYPES.BAR && !props.jsonOnly
				"
				:content="props.content"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.multiple {
	margin-bottom: 1rem;

	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-bottom: 1rem;
	}

	&__views {
		display: flex;
		background: white;
		border-radius: 0.5rem;
		overflow: hidden;
	}

	&__view {
		padding: 0.75rem;
		border-radius: 0.5rem;
		font-weight: 500;

		&--selected {
			background: rgb(37, 99, 235);
			color: #eee;
		}
	}
}
</style>
