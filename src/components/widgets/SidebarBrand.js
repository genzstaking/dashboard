import { Component, xml, useState } from "@odoo/owl";

export class SidebarBrand extends Component {
	static template = xml`
	<a 
		class="sidebar-brand d-flex align-items-center justify-content-center" 
		href="'#/'">
		<div class="sidebar-brand-icon rotate-n-15">
			<i class="fas fa-laugh-wink"></i>
		</div>
		<div class="sidebar-brand-text mx-3">GenZ Staking</div>
	</a>
	`;
}