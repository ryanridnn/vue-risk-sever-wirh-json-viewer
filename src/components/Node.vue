<script setup>
import { defineProps, computed } from "vue";
import Output from "./Output.vue";
import JsonEditor from "./JsonEditor.vue";
import { useConnectionStore, useAlertStore } from "../store";
import { updateParam } from "../connection";
import { STATUS } from "../constants";

const props = defineProps({
	node: Object,
	status: String,
	nodeIndex: Number,
	progress: Number,
});

const alert = useAlertStore();

const connection = useConnectionStore();

const progress = computed(() => (props.progress * 100).toFixed() + "%");

const nodeClass = computed(() => {
	if (props.status === STATUS.NOT_READY) {
		return "node--not-ready";
	} else if (props.status === STATUS.IN_PROGRESS) {
		return "node--in-progress";
	} else if (props.status === STATUS.COMPLETED) {
		return "node--completed";
	} else {
		return "";
	}
});

const handleSubmit = (val) => {
	Object.keys(val).map((inputKey) => {
		if (val[inputKey].match(new RegExp("\n"))) {
			const value = Number(val[inputKey].replace("\n", ""));

			if (value !== "" && !isNaN(Number(value))) {
				if (
					inputKey === "parallel_shift" &&
					(isNaN(Number(value)) ||
						Number(value) < -0.05 ||
						Number(value) > 0.05)
				) {
					alert.showAlert(
						"Alert: Insert value between -0.05 and 0.05"
					);
					return;
				} else {
					updateParam(props.nodeIndex, inputKey, value);
					if (document.activeElement) {
						document.activeElement.textContent =
							document.activeElement.textContent.replace(
								"\n",
								""
							);
					}
				}
			}
		}
	});
};
</script>

<template>
	<div class="node" :class="nodeClass">
		<div class="node__heading">
			<span class="node__name">Node: {{ props.node.name }}</span>
			<div class="node__status">
				<div class="node__status__text">
					{{
						status === STATUS.IN_PROGRESS
							? `${STATUS.IN_PROGRESS}: ${progress}`
							: status
					}}
				</div>
				<div
					class="node__status__bar"
					:style="{ width: progress }"
				></div>
			</div>
		</div>
		<div class="node__inputs">
			<h2>Input params</h2>

			<JsonEditor
				class="node__input-editor"
				:model="props.node.input_params"
				:onChange="handleSubmit"
			/>
		</div>
		<div class="node__outputs">
			<h2>Output Params</h2>
			<Output
				v-for="key in Object.keys(props.node.output_params)"
				:output="{ [key]: props.node.output_params[key] }"
			/>
		</div>
	</div>
</template>

<style lang="scss">
.node {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	&--not-ready {
		color: rgb(220 38 38);
	}

	&--in-progress {
		color: #ffa500;

		.node__status {
			color: white;
			background: rgb(251 191 36);

			&__bar {
				opacity: 1;
				background: rgb(245 158 11);
			}
		}
	}

	&--completed {
		color: #177d59;
	}

	&__heading {
		margin-bottom: 1rem;
		align-items: center;
	}

	&__name {
		font-size: 1rem;
		font-weight: 600;
	}

	&__status {
		padding: 0.5rem;
		min-width: 280px;
		font-weight: 500;
		background: #fbfbfb;
		font-size: 0.875rem;
		position: relative;
		border-radius: 0.25rem;
		overflow: hidden;
	}

	&__status__bar {
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background: #ffa500;
		transition: all 0.2s ease;
	}

	&__status__text {
		position: relative;
		z-index: 2;
	}

	&__inputs {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		font-weight: 500;

		h2 {
			font-size: 1rem;
			font-weight: 600;
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

	&__input-editor {
		margin-top: 0.5rem;
	}

	&__outputs {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		font-size: 0.875rem;
		font-weight: 500;

		h2 {
			font-size: 1rem;
			font-weight: 600;
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
