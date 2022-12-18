import { Component, xml, useState } from "@odoo/owl";
import { SidebarBrand } from "./widgets/SidebarBrand";
import { SidebarDivider } from "./widgets/SidebarDivider";
import { SidebarLink } from "./widgets/SidebarLink";
import { SidebarMessage } from "./widgets/SidebarMessage";
import { SidebarHeading } from "./widgets/SidebarHeading";
import { SidebarCollapse } from "./widgets/SidebarCollapse";

export class Sidebar extends Component {
	static components = {
		SidebarBrand,
		SidebarDivider,
		SidebarLink,
		SidebarMessage,
		SidebarHeading,
		SidebarCollapse,
	};

	static template = xml`
	<ul id="accordionSidebar"
		class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
		<SidebarBrand />
		<SidebarDivider />

		<SidebarLink
			href="'#/csc/staking'">
			<i class="fas fa-fw fa-tachometer-alt"></i>
			<span>Coinex Smart Coin</span>
		</SidebarLink>
		
		
		

		<SidebarMessage>
			<img 
				class="sidebar-card-illustration mb-2" 
				src="img/undraw_rocket.svg" 
				alt="Stack with GenZ Staking" />
			<p class="text-center mb-2"><strong>GenZ Staking</strong> group supports with premium features, partnership program, and more!</p>
			<a 
				class="btn btn-success btn-sm" 
				href="//genzstaking.com/">Stake With Us!</a>
		</SidebarMessage>

	</ul>
	`;

	state = useState({ text: "Owl" });

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
