import { Component, useState, xml } from "@odoo/owl";
import { Footer } from "@web/components/footer";
import { Sidebar } from "@web/components/sidebar";
import { Topbar } from "@web/components/topbar";
import { Router } from "@web/core/router";

import { Dashboard } from "@web/pages/dashboard";
import { CscStakingPage } from "@web/pages/csc";
import { MaticStaking } from "@web/pages/polygon";
import { FantomStaking } from "@web/pages/fantom";



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
		Topbar,
		Router,
	};

	static template = "web.WebClient";

	state?: RootState;
	routeType: string;
	routes: any;

	public setup(): void {
		this.routeType = 'hash';
		this.state = useState(new RootState());
		this.routes = [
			Dashboard, CscStakingPage, MaticStaking, FantomStaking
		];
	}
}
