import { Component, useState, xml } from "@odoo/owl";
import { Footer } from "@web/components/footer";
import { Sidebar } from "@web/components/sidebar";
import { Topbar } from "@web/components/topbar";
import { Router } from "@web/core/router";

import { Dashboard } from "@web/pages/dashboard";
import { CscStakingPage } from "@web/pages/csc";
import { AvaxStaking } from "@web/pages/avax";
import { MaticStaking } from "@web/pages/polygon";
import { FantomStaking } from "@web/pages/fantom";


const ROOT_TEMPLATE = xml`
<div id="wrapper">
	<Sidebar />
	<div id="content-wrapper" class="d-flex flex-column">
		<div id="content">
			<Topbar />
			<Router
				types="routeType" 
				routes="routes" />
		</div>
		<Footer />
	</div>
</div>
`;

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
export class Root extends Component {

	static components = {
		Footer,
		Sidebar,
		Topbar,
		Router,
	};

	static template = ROOT_TEMPLATE;

	state?: RootState;
	routeType: string;
	routes: any;

	public setup(): void {
		this.routeType = 'hash';
		this.state = useState(new RootState());
		this.routes = [
			Dashboard, CscStakingPage,AvaxStaking, MaticStaking, FantomStaking, 
		];
	}
}
