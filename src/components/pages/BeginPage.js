import { Component, xml, useState } from "@odoo/owl";
import { OChart } from "../widgets/OChart";

import { CHART_DATA } from "./ChartPage";

import img01 from "./img/undraw_posting_photo.svg";
import img02 from "./img/undraw_profile_1.svg";
import img03 from "./img/undraw_profile_2.svg";
import img04 from "./img/undraw_profile_3.svg";
import img05 from "./img/undraw_profile.svg";
import img06 from "./img/undraw_rocket.svg";
import csc from "../img/csc.svg";
export class BeginPage extends Component {
	static components = {
		OChart,
	};
	static template = xml`
	<div class="container-fluid">

		<!-- Page Heading -->
		<div class="d-sm-flex align-items-center justify-content-between mb-4">
			<h1 class="h3 mb-0 text-gray-800">Dashboard</h1>

		</div>

		<!-- Content Row -->
		<div class="row">
			
			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card border-left-success shadow h-100 py-2">
					<div class="card-body">
						<div class="row no-gutters align-items-center">
							<div class="col mr-2">
								<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
								CET</div>
								<div class="h5 mb-0 font-weight-bold text-gray-800">CoinEx Token</div>
							</div>
							<div class="col-auto">
							<img src="${csc}" alt="logo" style="width:64px" class="ms-3"/>
							</div>
						</div>
						<br/>
						<a href="#/csc/staking" class="btn btn btn-success" style="color:white;">Stake CET</a>
					</div>
				</div>
			</div>

	
			

		</div>

		<!-- Content Row -->

		<div class="row">


		</div>

	</div>
	`;

	state = useState({
		text: "Owl",
		...CHART_DATA
	});

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
 