import { xml, useState } from "@odoo/owl";
import { OChart } from "@web/components/chart";
import {OPage} from "@web/components/page";


import csc from "@web/img/csc.svg";
import matic from "@web/img/matic.jpg";
import fantom from "@web/img/fantom.svg";
import avax from "@web/img/avax.svg"
export class Dashboard extends OPage {
	static route = '/';
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
				<div class="card border-left-success shadow h-100 py-2 ">
					<div class="card-body">
						<div class="row no-gutters align-items-center">
							<div class="col mr-2">
								<div class="text-xs font-weight-bold text-success text-uppercase mb-1">
								CET</div>
								<div class="h5 mb-0 font-weight-bold text-gray-800">CoinEx</div>
							</div>
							<div class="col-auto">
							<img src="${csc}" alt="logo" style="width:64px" class="ms-3"/>
							</div>
						</div>
						<br/>
						<a href="#/staking/CSC" class="btn btn btn-success" style="color:white;">Stake CET</a>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card  shadow h-100 py-2" style="border-left:  .25rem solid #8247e5">
					<div class="card-body">
						<div class="row no-gutters align-items-center">
							<div class="col mr-2">
								<div class="text-xs font-weight-bold  text-uppercase mb-1" style="color:#8247e5;">
								MATIC(Polygon)</div>
								<div class="h5 mb-0 font-weight-bold text-gray-800">MATIC</div>
							</div>
							<div class="col-auto">
							<img src="${matic}" alt="logo" style="width:54px" class="ms-3"/>
							</div>
						</div>
						<br/>
						<a href="#/staking/matic" class="btn btn" style="color:white;background-color:#8247e5;">Stake MATIC</a>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card  shadow h-100 py-2" style="border-left:  .25rem solid #19e1ff">
					<div class="card-body">
						<div class="row no-gutters align-items-center">
							<div class="col mr-2">
								<div class="text-xs font-weight-bold  text-uppercase mb-1" style="color:#19e1ff;">
								Fantom</div>
								<div class="h5 mb-0 font-weight-bold text-gray-800">FTM</div>
							</div>
							<div class="col-auto">
							<img src="${fantom}" alt="logo" style="width:64px" class="ms-3"/>
							</div>
						</div>
						<br/>
						<a href="#/staking/fantom" class="btn btn" style="color:white;background-color:#19e1ff;">Stake Fantom</a>
					</div>
				</div>
			</div>

			<div class="col-xl-3 col-md-6 mb-4">
				<div class="card  shadow h-100 py-2" style="border-left:  .25rem solid #6d6df2">
					<div class="card-body">
						<div class="row no-gutters align-items-center">
							<div class="col mr-2">
								<div class="text-xs font-weight-bold  text-uppercase mb-1" style="color:#6d6df2;">
								Avalanche</div>
								<div class="h5 mb-0 font-weight-bold text-gray-800">Avax</div>
							</div>
							<div class="col-auto">
							<img src="${avax}" alt="logo" style="width:64px" class="ms-3"/>
							</div>
						</div>
						<br/>
						<a href="#/staking/fantom" class="btn btn" style="color:white;background-color:#6d6df2;">Stake avax</a>
					</div>
				</div>
			</div>

		</div>
		<!-- Content Row -->
		<div class="row"></div>
	</div>
	`;

}
