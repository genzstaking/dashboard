import { Component } from "@odoo/owl";
import { v4 as uuidv4 } from 'uuid';

import "./sidebar.xml";

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

	public setup(): void {
		// Todo check props
	}
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
}
