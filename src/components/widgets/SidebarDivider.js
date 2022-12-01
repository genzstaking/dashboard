import { Component, xml, useState } from "@odoo/owl";

export class SidebarDivider extends Component {
	static template = xml`
	<hr class="sidebar-divider my-0" />
	`;
}