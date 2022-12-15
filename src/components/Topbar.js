import { Component, xml, useState } from "@odoo/owl";
import metamaskIcon from "./img/MetaMaskIcon.svg";
import Web3 from "web3";

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
            <div class="modal-body d-flex">
                <!-- card1 -->
                <div class="card border-5 text-center my-4 mx-2" >
                    <img src="${metamaskIcon}" class="card-img-top w-25 mx-auto" alt="meta mask logo"/>
                    
                    <div class="card-body">
                        <h5 class="card-title text-dark my-5">Metamask</h5>
                        <p class="card-text"></p>
                        <a  class="btn btn-info text-white w-75" t-on-click="connectToMetamask">Connect</a>
                    </div>
                </div>
                <!-- card2 -->
                <div class="card border-5 text-center my-4 mx-2" >
                    <img src="${metamaskIcon}" class="card-img-top w-25 mx-auto" alt="meta mask logo"/>
                    
                    <div class="card-body">
                        <h5 class="card-title text-dark my-5">Coinwallet</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-info text-white w-75 disabled">Connect</a>
                    </div>
                </div>
            </div>

            <!-- Modal footer -->
            

            </div>
        </div>
        </div>
    `;

    connectToMetamask(){
        // const Web3 = require("web3");
        const ethEnabled = async () => {
        if (window.ethereum) {
            await window.ethereum.request({method: 'eth_requestAccounts'});
            window.web3 = new Web3(window.ethereum);
            return true;
        }
        return false;
        }
    };
	state = useState({ text: "Owl" });

	update() {
		this.state.text = this.state.text === "Owl" ? "World" : "Owl";
	}
}
