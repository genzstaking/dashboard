import { Component, xml, useState } from "@odoo/owl";
import metamaskIcon from "./img/MetaMaskIcon.svg"

export class Topbar extends Component {

	static template = xml`
    <nav class="navbar justify-content-between navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <!--  -->
        <img alt="logo"/>
        <button class="btn btn-info text-white rounded-pill " t-on-click="openTopBarModal" data-bs-toggle="modal" data-bs-target="#TopBarModal">
            unlock wallet
        </button>
        
       
        <!-- Topbar Search -->
        

        <!-- Topbar Navbar -->
        
    </nav>
    <!-- The Modal -->
        <div class="modal" id="TopBarModal">
        <div class="modal-dialog">
            <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title text-dark">Select a wallet provider</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body ">
                <div class="card border-5 text-center my-4 mx-5" >
                    <img src="${metamaskIcon}" class="card-img-top" alt="meta mask logo"/>
                    
                    <div class="card-body">
                        <h5 class="card-title text-dark my-5">Metamask</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-info text-white w-75">Connect</a>
                    </div>
                </div>
            </div>

            <!-- Modal footer -->
            

            </div>
        </div>
        </div>
    `;

    openTopBarModal(){

    };
	state = useState({ text: "Owl" });

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
