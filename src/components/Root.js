import { Component, xml, useState } from "@odoo/owl";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";
import { Router } from "./Router";


import { BeginPage } from "./pages/BeginPage";
import { WalletsPage } from "./pages/WalletsPage";
import { ChartPage } from "./pages/ChartPage";
import { TablesPage } from "./pages/TablesPage";
import { ButtonsPage } from "./pages/ButtonsPage";


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


export class Root extends Component {

	static components = {
		Sidebar,
		Topbar,
		Footer,
		Router,
	};

	static template = ROOT_TEMPLATE;

	state = useState({
		text: "Owl",
	});

	routeType = 'hash';
	routes = {
		'/': {
			component: BeginPage
		},
		'/wallets': {
			component: WalletsPage
		},
		'/charts': {
			component: ChartPage
		},
		'/tables': {
			component: TablesPage
		},
		'/buttons': {
			component: ButtonsPage
		}
	};

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
