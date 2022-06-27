<script setup>
import { defineProps, ref } from "vue";
import { MULTIPLE_VIEW_TYPES } from "../constants";
import { ChevronUpIcon } from "@heroicons/vue/solid";

import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";
import JsonViewer from "./JsonViewer.vue";

const selectedView = ref(MULTIPLE_VIEW_TYPES.LINE);

const toggled = ref(false);

const props = defineProps({
	jsonOnly: Boolean,
	label: String,
	content: Object,
});

const handleSelect = (view) => {
	selectedView.value = view;
};

const invertToggled = () => {
	toggled.value = !toggled.value;
};
</script>

<template>
	<div class="multiple">
		<div class="multiple__top">
			<div class="multiple__label">
				{{ props.label }}
			</div>
			<div class="multiple__action">
				<div v-if="!props.jsonOnly && toggled" class="multiple__views">
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
				<button
					@click="invertToggled"
					class="multiple__toggler"
					:class="{ 'multiple__toggler--toggled': toggled }"
				>
					<ChevronUpIcon class="icon" />
				</button>
			</div>
		</div>
		<div class="multiple__bottom" v-if="toggled">
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
	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	&__action {
		display: flex;
		align-items: center;
		gap: 1.5rem;
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

	&__toggler {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.25rem;
		height: 2.25rem;
		background: rgb(219 234 254);
		border-radius: 100%;
		transition: all 0.2s ease;

		.icon {
			transition: all 0.2s ease;
		}

		&:hover {
			transform: scale(0.9);
		}

		&--toggled {
			background: rgb(37, 99, 235);
			.icon {
				color: white;
				transform: rotate(180deg);
			}
		}
	}

	&__bottom {
		padding: 1rem 0;
	}
}

.icon {
	height: 4rem;
}
</style>
