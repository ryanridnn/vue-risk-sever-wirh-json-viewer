<script setup>
import { defineProps, watchEffect, computed, toRef } from "vue";
import JsonViewer from "./JsonViewer.vue";
import { updateParam } from "../connection";
import { STATUS } from "../constants";

const props = defineProps({
	node: Object,
	status: String,
	nodeIndex: Number,
});

const node = computed(() => props.node);
const status = toRef(props, "status");

const nodeClass = computed(() => {
	if (status.value === STATUS.NOT_READY) {
		return "node--not-ready";
	} else if (status.value === STATUS.IN_PROGRESS) {
		return "node--in-progress";
	} else if (status.value === STATUS.COMPLETED) {
		return "node--completed";
	} else {
		return "";
	}
});

const handleSubmit = (e, key) => {
	if (
		(e.code === "Enter") & (e.target.value !== "") &&
		!!Number(e.target.value)
	) {
		updateParam(props.nodeIndex, key, e.target.value);
	} else {
		return;
	}
};
</script>

<template>
	<div class="node" :class="nodeClass">
		<div class="node__heading">
			<span class="node__name">Node: {{ node.name }}</span>
			<input type="text" class="node__status" disabled :value="status" />
		</div>
		<div class="node__inputs">
			<div
				v-for="key in Object.keys(node.input_params)"
				:key="key"
				class="node__input"
			>
				<span class="node__input__name">
					{{ key }}
				</span>
				<input
					type="number"
					:value="node.input_params[key]"
					@keydown="(e) => handleSubmit(e, key)"
				/>
			</div>
		</div>
		<div class="node__outputs">
			<div class="node__outputs__title">Outputs Params</div>
			<JsonViewer :schema="node.output_params" mode="view" />
		</div>
	</div>
</template>

<style lang="scss">
.node {
	margin-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	&--not-ready {
		color: red;

		.node__status {
			color: red;
		}
	}

	&--in-progress {
		color: #ffa500;

		.node__status {
			color: #ffa500;
		}
	}

	&--completed {
		color: green;

		.node__status {
			color: green;
		}
	}

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	&__outputs {
		margin-top: 0.5rem;
	}

	&__outputs__title {
		margin-bottom: 0.5rem;
	}

	&__heading,
	&__input {
		width: 500px;
		display: flex;
		justify-content: space-between;
	}
}
</style>
