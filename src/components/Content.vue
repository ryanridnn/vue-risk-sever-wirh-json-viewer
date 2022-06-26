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
		/>
	</div>
</template>

<style lang="scss">
.nodes {
	margin-top: 2rem;
}
</style>
