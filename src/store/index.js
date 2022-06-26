import { defineStore } from "pinia";

export const useConnectionStore = defineStore("connectionStore", {
	state: () => {
		return {
			ws: null,
			connected: false,
			dagNodes: [],
			dagNodesStatus: [],
			gotInitial: false,
		};
	},
	actions: {
		setWs(ws) {
			this.ws = ws;
		},
		setConnected(bool) {
			this.connected = bool;
		},
		setDagNodes(dagNodes) {
			this.dagNodes = dagNodes;
		},
		setDagNodesInput(params, nodeIndex) {
			this.dagNodes[nodeIndex].input_params = {
				...this.dagNodes[nodeIndex].input_params,
				...params,
			};
		},
		setDagNodesOutput(output, nodeIndex) {
			this.dagNodes[nodeIndex].output_params = output;
		},
		setGotInitial(bool) {
			this.gotInitial = bool;
		},
		setStatus(nodeIndex, status) {
			this.dagNodesStatus[nodeIndex] = status;
		},
	},
	getters: {
		dagNodesLength: (state) => {
			if (!state.dagNodes) {
				return 0;
			} else {
				return state.dagNodes.length;
			}
		},
	},
});
