import { Component, xml, useState } from "@odoo/owl";
import { Collapse } from "bootstrap";
import { v4 as uuidv4 } from 'uuid';


import rocket from "@web/img/undraw_rocket.svg";


export class SidebarBrand extends Component {
	static template = xml`
	<a 
		class="sidebar-brand d-flex align-items-center justify-content-center" 
		href="#/">
		<div class="sidebar-brand-icon rotate-n-15">
			<i class="fas fa-laugh-wink"></i>
		</div>
		<div class="sidebar-brand-text mx-3">GenZ Staking</div>
	</a>
	`;
}


export class SidebarCollapse extends Component {

	static template = xml`
	<li class="nav-item">
		<a class="nav-link collapsed" 
			href="#" 
			data-bs-toggle="collapse"
			t-att-data-bs-target="sid"
			aria-expanded="true" 
			aria-controls="collapseTwo">
			<t t-slot="title" />
		</a>
		<div 
			t-att-id="id" 
			class="collapse" 
			aria-labelledby="headingTwo" 
			data-parent="#accordionSidebar">
			<t t-slot="content"/>
		</div>
	</li>
	`;

	id: string;
	sid: string;

	public setup(): void {
		this.id = 'collapse' + uuidv4().replaceAll('\-', '');
		this.sid = '#' + this.id;
	}
}

export class SidebarDivider extends Component {
	static template = xml`
	<hr class="sidebar-divider my-0" />
	`;
}

export class SidebarHeading extends Component {
	static template = xml`
	<div class="sidebar-heading">
		<t t-slot="default"/>
	</div>
	`;
}

export class SidebarLink extends Component {
	static template = xml`
	<li class="nav-item active">
		<a class="nav-link" 
			t-att-href="props.href">
			<t t-slot="default"/>
		</a>
	</li>
	`;

	static props = ['title', 'href'];

	public setup(): void {
		// Todo check props
	}
}

export class SidebarMessage extends Component {
	static template = xml`
	<div class="sidebar-card d-none d-lg-flex"><t t-slot="default"/></div>
	`;
}

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
			href="'#/staking/CSC'">
			<i class="fas fa-fw fa-tachometer-alt"></i>
			<span>Coinex Smart Coin</span>
		</SidebarLink>
		
		
		

		<SidebarMessage>
			<img 
				class="sidebar-card-illustration mb-2" 
				src="${rocket} TODO: replace with image" 
				alt="Stack with GenZ Staking" />
			<p class="text-center mb-2"><strong>GenZ Staking</strong> group supports with premium features, partnership program, and more!</p>
			<a 
				class="btn btn-success btn-sm" 
				href="//genzstaking.com/">Stake With Us!</a>
		</SidebarMessage>

	</ul>
	`;
}
