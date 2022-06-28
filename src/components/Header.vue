<script setup>
import { ref } from "vue";
import { useConnection, disconnect } from "../connection";
import { useConnectionStore } from "../store";
import { CONNECTION_URL } from "../constants";
import { copy } from "../utils";

import JsonViewer from "vue-json-viewer";

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
			<h1 class="connection__heading" for="connection__input">
				Dag Server 0.0.1
			</h1>
			<input
				type="text"
				placeholder="Connection Url here..."
				class="connection__input"
				v-model="url"
				:disabled="connection.connected"
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

		<div class="header__divider"></div>
	</header>
</template>

<style lang="scss">
header {
	margin-top: 1rem;
}

.connection {
	display: flex;
	gap: 0.75rem;
	align-items: center;

	button {
		font-weight: 600;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		transition: all 0.2s ease;

		&:hover:not(:disabled) {
			transform: scale(0.9);
		}
	}

	&__heading {
		font-size: 1.125rem;
		margin-right: 0.5rem;
	}

	&__input {
		padding: 0.5rem;
		background: white;
		border-radius: 0.25rem;
		min-width: 400px;
	}

	&__connect {
		background-color: rgb(37 99 235);
		color: #eee;

		&:disabled {
			background-color: rgb(161 161 170);
			color: #ddd;
		}
	}

	&__disconnect {
		background-color: rgb(220 38 38);
		color: #eee;

		&:disabled {
			background-color: rgb(252 165 165);
		}
	}

	&__copy {
		background-color: rgb(39 39 42);
		color: white;
	}
}

.header__divider {
	margin-top: 1rem;
	border-bottom: 2px dashed #aaa;
}
</style>
