import { Component, xml, useState } from "@odoo/owl";

export class SidebarMessage extends Component {
	static template = xml`
	<div class="sidebar-card d-none d-lg-flex"><t t-slot="default"/></div>
	`;
}