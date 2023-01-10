import { xml, useState } from "@odoo/owl";
import { OPage, route, themplate, title } from "../components/page";

import "./dashboard.xml";
import { registry } from "../core/registry";

@route('/')
@title('Dashboard')
@themplate('pages.dashboard')
export class Dashboard extends OPage {
	static components = {};
	state: {
		pages: OPage[]
	} = useState({
		pages: []
	})

	public setup(): void {
		// Load registerd pages
		this.state.pages = registry.category('pages').getAll();

		// Gets list of pages if any updates
		registry.category('pages').addEventListener('UPDATE', ()=>{
			this.state.pages = registry.category('pages').getAll();
		});
	}
}