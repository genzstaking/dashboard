import { xml, useState, Component } from "@odoo/owl";
import { OPage, route, template, title } from "../../components/page";
import { registry } from "../../core/registry";
import { Button } from "../../core/buttons";

import "./dashboard.xml";

@route('/')
@title('Dashboard')
@template('pages.dashboard')
export class Dashboard extends Component {
	static components = {Button};
	state: {
		pages: OPage[]
	} = useState({
		pages: []
	});

	public setup(): void {
		// Load registerd pages
		this.state.pages = registry.category('pages').getAll();

		// Gets list of pages if any updates
		registry.category('pages').addEventListener('UPDATE', ()=>{
			this.state.pages = registry.category('pages').getAll();
		});
	}
}