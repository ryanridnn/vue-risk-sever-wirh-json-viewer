<script setup>
import { defineProps, watchEffect, computed, toRef } from "vue";
import Output from "./Output.vue";
import { useAlertStore } from "../store";
import { updateParam } from "../connection";
import { STATUS } from "../constants";

const props = defineProps({
	node: Object,
	status: String,
	nodeIndex: Number,
});

const node = computed(() => props.node);
const status = toRef(props, "status");

const alert = useAlertStore();

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
		if (
			key === "parallel_shift" &&
			(!Number(e.target.value) ||
				Number(e.target.value) < -0.05 ||
				Number(e.target.value) > 0.05)
		) {
			alert.showAlert("Alert: Insert value between -0.05 and 0.05");
			return;
		}

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
			<h2>Input params</h2>

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
					:max="key === 'parallel_shift' ? 0.05 : false"
					:min="key === 'parallel_shift' ? -0.05 : false"
				/>
			</div>
		</div>
		<div class="node__outputs">
			<h2>Output Params</h2>
			<Output
				v-for="key in Object.keys(node.output_params)"
				:output="{ [key]: node.output_params[key] }"
			/>
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
		color: rgb(220 38 38);

		.node__status {
			color: rgb(220 38 38);
		}
	}

	&--in-progress {
		color: #ffa500;

		.node__status {
			color: #ffa500;
		}
	}

	&--completed {
		color: rgb(4 120 87);

		.node__status {
			color: rgb(4 120 87);
		}
	}

	&__heading {
		margin-bottom: 1.5rem;
		align-items: center;
	}

	&__name {
		font-size: 1.125rem;
		font-weight: 500;
	}

	&__status {
		padding: 0.5rem;
		min-width: 280px;
		font-weight: 500;
	}

	&__inputs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;

		h2 {
			font-size: 1.125rem;
			font-weight: 500;
			margin-bottom: 0.5rem;
		}

		input {
			min-width: 280px;
			padding: 0.5rem;
			border-radius: 0.25rem;
		}

		input:focus {
			outline: 1px solid rgb(14 165 233);
		}
	}

	&__outputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;

		h2 {
			font-size: 1.125rem;
			font-weight: 500;
			margin-bottom: 0.5rem;
		}
	}

	&__outputs__title {
		margin-bottom: 0.5rem;
	}

	&__heading,
	&__input {
		width: 520px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}
</style>
