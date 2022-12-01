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
			href="'#/'">
			<i class="fas fa-fw fa-tachometer-alt"></i>
			<span>Dashboard</span>
		</SidebarLink>
		<SidebarLink
			href="'#/wallets'">
			<i class="fas fa-fw fa-tachometer-alt"></i>
			<span>Wallets</span>
		</SidebarLink>
		
		<SidebarDivider />
		<SidebarHeading>Interface</SidebarHeading>
		<SidebarCollapse>
			<t t-set-slot="title">
				<i class="fas fa-fw fa-cog"></i>
				<span>Components</span>
			</t>
			<t t-set-slot="content">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Custom Components:</h6>
					<a class="collapse-item" href="buttons.html">Buttons</a>
					<a class="collapse-item" href="cards.html">Cards</a>
				</div>
			</t>
		</SidebarCollapse>
		<SidebarCollapse>
			<t t-set-slot="title">
				<i class="fas fa-fw fa-wrench"></i>
				<span>Utilities</span>
			</t>
			<t t-set-slot="content">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Custom Utilities:</h6>
					<a class="collapse-item" href="utilities-color.html">Colors</a>
					<a class="collapse-item" href="utilities-border.html">Borders</a>
					<a class="collapse-item" href="utilities-animation.html">Animations</a>
					<a class="collapse-item" href="utilities-other.html">Other</a>
				</div>
			</t>
		</SidebarCollapse>

		<SidebarDivider />
		<SidebarHeading>Addons</SidebarHeading>
		<SidebarCollapse>
			<t t-set-slot="title">
				<i class="fas fa-fw fa-folder"></i>
				<span>Pages</span>
			</t>
			<t t-set-slot="content">
				<div class="bg-white py-2 collapse-inner rounded">
					<h6 class="collapse-header">Login Screens:</h6>
					<a class="collapse-item" href="login.html">Login</a>
					<a class="collapse-item" href="register.html">Register</a>
					<a class="collapse-item" href="forgot-password.html">Forgot Password</a>
					<div class="collapse-divider"></div>
					<h6 class="collapse-header">Other Pages:</h6>
					<a class="collapse-item" href="404.html">404 Page</a>
					<a class="collapse-item" href="blank.html">Blank Page</a>
				</div>
			</t>
		</SidebarCollapse>
		<SidebarLink
			href="'#/charts'">
			<i class="fas fa-fw fa-chart-area"></i>
			<span>Charts</span>
		</SidebarLink>
		<SidebarLink
			href="'#/tables'">
			<i class="fas fa-fw fa-table"></i>
			<span>Tables</span>
		</SidebarLink>

		<SidebarDivider />
		<!-- Sidebar Toggler (Sidebar) -->
		<div class="text-center d-none d-md-inline">
			<button class="rounded-circle border-0" id="sidebarToggle"></button>
		</div>

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
