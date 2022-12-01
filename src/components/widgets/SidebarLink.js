import { Component, xml, useState } from "@odoo/owl";

export class SidebarLink extends Component {
	static template = xml`
	<li class="nav-item active">
		<a class="nav-link" 
			t-att-href="props.href">
			<t t-slot="default"/>
		</a>
	</li>
	`;
	
	static props = ['title', 'href'];
	
	setup() { 
		console.log(this.props);
	}
}