import {
	Component,
	useState,
} from "@odoo/owl";
import { v4 as uuidv4 } from 'uuid';
import { registry } from "../core/registry";

import "./sidebar.xml";
import "./sidebar.scss";

export class SidebarBrand extends Component {
	static template = "components.sidebar.brand";
}


export class SidebarCollapse extends Component {

	static template = "components.sidebar.collapse";

	id: string;
	sid: string;

	public setup(): void {
		this.id = 'collapse' + uuidv4().replaceAll('\-', '');
		this.sid = '#' + this.id;
	}
}

export class SidebarDivider extends Component {
	static template = "components.sidebar.divider";
}

export class SidebarHeading extends Component {
	static template = "components.sidebar.heading";
}

export class SidebarLink extends Component {
	static template = "components.sidebar.link";
	static props = ['title', 'href'];
}

export class SidebarMessage extends Component {
	static template = "components.sidebar.message";
}

export class Sidebar extends Component {
	static template = "components.sidebar";
	static components = {
		SidebarBrand,
		SidebarDivider,
		SidebarLink,
		SidebarMessage,
		SidebarHeading,
		SidebarCollapse,
	};
	state:{
		routers: any[],
	} = useState({
		routers: [],
	});


	public setup(): void {
		// Load all routs
		this.state.routers = registry.category('routers').getAll();
		registry.category('routers').addEventListener("UPDATE", () => {
			this.state.routers = registry.category('routers').getAll();
		});
	}

}
