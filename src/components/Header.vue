<script setup>
import { ref } from "vue";
import { useConnection, disconnect } from "../connection";
import { useConnectionStore } from "../store";
import { CONNECTION_URL } from "../constants";
import { copy } from "../utils";

const url = ref(CONNECTION_URL);
const connection = useConnectionStore();

const handleConnect = () => {
	useConnection(url.value);
};

const handleDisconnect = () => {
	disconnect();
};

const handleCopy = () => {
	copy(url.value);
};
</script>

<template>
	<header>
		<div class="connection">
			<label for="connection__input"> Dag Server 0.0.1 </label>
			<input
				type="text"
				placeholder="Connection Url here..."
				class="conection__input"
				id="conenction__input"
				v-model="url"
			/>
			<button
				:disabled="connection.connected"
				@click="handleConnect"
				class="connection__connect"
			>
				Connect
			</button>
			<button
				@click="handleDisconnect"
				:disabled="!connection.connected"
				class="connection__disconnect"
			>
				Disconnect
			</button>
			<button @click="handleCopy" class="connection__copy">
				URL to clipboard
			</button>
		</div>
	</header>
</template>

<style lang="scss">
header {
	margin-top: 2rem;
}

.connection {
	display: flex;
	gap: 0.5rem;

	input,
	button {
		padding: 0 0.2rem;
	}
}
</style>
