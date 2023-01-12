import { Component, useState, xml } from "@odoo/owl";
import { Footer } from "@web/components/footer";
import { Sidebar } from "../core/sidebar";
import { Navbar } from "../core/navbar";
import { Router } from "@web/core/router";


import "./webclient.scss";
import "./webclient.xml";

/**
 * State holder of the root Component
 */
class RootState {
	title: string;
}

/**
 * Root component of the application
 * 
 * This is the mani module and responsilbe to launch the app.
 */
export class WebClient extends Component {

	static components = {
		Footer,
		Sidebar,
		Navbar,
		Router,
	};

	static template = "web.WebClient";

	state?: RootState;
	routeType: string;
	routes: any;

	public setup(): void {
		this.routeType = 'hash';
		this.state = useState(new RootState());
		this.routes = [];
	}
}
