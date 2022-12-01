import {
	Component,
	xml
} from "@odoo/owl";

export class SidebarHeading extends Component {
	static template = xml`
	<div class="sidebar-heading">
		<t t-slot="default"/>
	</div>
	`;
}