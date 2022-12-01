import { Component, xml, useState } from "@odoo/owl";
import { Collapse } from "bootstrap";
import { v4 as uuidv4 } from 'uuid';


export class SidebarCollapse extends Component {

	static template = xml`
	<li class="nav-item">
		<a class="nav-link collapsed" 
			href="#" 
			data-bs-toggle="collapse"
			t-att-data-bs-target="sid"
			aria-expanded="true" 
			aria-controls="collapseTwo">
			<t t-slot="title" />
		</a>
		<div 
			t-att-id="id" 
			class="collapse" 
			aria-labelledby="headingTwo" 
			data-parent="#accordionSidebar">
			<t t-slot="content"/>
		</div>
	</li>
	`;


	setup() {
		this.id = uuidv4().replaceAll('\-', '_');
		this.sid = "#" + this.id;
	}
}