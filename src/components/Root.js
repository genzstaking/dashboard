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
import { CardsPage } from "./pages/CardsPage";
import { UtilitiesAnimationPage } from "./pages/UtilitiesAnimationPage";
import { UtilitiesBorderPage } from "./pages/UtilitiesBorderPage";
import { UtilitiesColorPage } from "./pages/UtilitiesColorPage";
import { UtilitiesOtherPage } from "./pages/UtilitiesOtherPage";
import { AccountsPage } from "./pages/AccountsPage";
import { CscStakingPage } from "./pages/CscPages";

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
		},
		'/cards': {
			component: CardsPage
		},
		'/utilities-animation': {
			component: UtilitiesAnimationPage
		},
		'/utilities-border': {
			component: UtilitiesBorderPage
		},
		'/utilities-color': {
			component: UtilitiesColorPage
		},
		'/utilities-other': {
			component: UtilitiesOtherPage
		},
		'/accounts': {
			component: AccountsPage
		},
		// NOTE: we must use network symbol in the path directly, See the main site for symbol list
		'/staking/CSC': {
			component: CscStakingPage
		},
		// '/staking/ETH': {
		// 	component: CscStakingPage
		// }
	};

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
