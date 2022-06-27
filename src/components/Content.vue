<script setup>
import { watchEffect } from "vue";
import Node from "./Node.vue";

import { useConnectionStore } from "../store";

const connection = useConnectionStore();
</script>

<template>
	<div class="nodes">
		<Node
			v-for="(node, index) in connection.dagNodes"
			:key="node.name"
			:node="node"
			:nodeIndex="index"
			:status="connection.dagNodesStatus[index]"
			class="node"
		/>
	</div>
</template>

<style lang="scss">
.nodes {
	display: flex;
	flex-direction: column;
	gap: 2rem;
	margin-top: 2rem;
}

.node:not(:last-child) {
	border-bottom: 2px dashed #aaa;
	padding-bottom: 3rem;
}
</style>
