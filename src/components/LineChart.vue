<script setup>
import { defineProps, computed } from "vue";

import { Line } from "vue-chartjs";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const props = defineProps({
	content: Object,
});

const chartData = computed(() => {
	return {
		labels: Object.keys(props.content),
		datasets: [
			{
				data: Object.values(props.content),
				borderColor: "rgb(37, 99, 235)",
				lineTension: 0.6,
			},
		],
	};
});

const options = {
	responsive: true,
	interaction: {
		intersect: false,
	},
	plugins: {
		scales: {
			y: {},
		},
		title: {
			display: false,
		},
		legend: {
			display: false,
		},
	},
};
</script>

<template>
	<Line :chart-data="chartData" :chart-options="options" :height="200" />
</template>

<style lang="scss"></style>
