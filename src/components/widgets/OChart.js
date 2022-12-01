import {
	Component,
	xml,
	useState,
	onRendered,
	onMounted,
	useRef,
} from "@odoo/owl";
import Chart from 'chart.js/auto';


// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#858796';


export class OChart extends Component {

	static props = ['data'];
	static template = xml`
	<canvas t-ref="chartCanvas" />
	`;

	canvas = useRef("chartCanvas");

	setup() {
		onRendered(() => {
			console.log(this.canvas);
			//this.chart = new Chart(this.canvas, this.props.data);
		});
		onMounted(() => {
			console.log(this.canvas);
			this.chart = new Chart(this.canvas.el, this.props.data);
		});
	}
}
