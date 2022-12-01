import {
	Component,
	xml,
	useState,
	onRendered,
	onMounted,
	useRef,
} from "@odoo/owl";




export class OCard extends Component {

	static template = xml`
	<canvas t-ref="chartCanvas" />
	`;
}
