import { Component, xml, useState } from "@odoo/owl";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Footer } from "./Footer";
import { Router } from "./Router";


import { BeginPage } from "./pages/BeginPage";
import { WalletsPage } from "./pages/WalletsPage"

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
			name: "Dashboard",
			component: BeginPage
		},
		'/wallets': {
			name: "Wallets",
			component: WalletsPage
		},
	};

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
