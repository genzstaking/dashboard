import { Component, xml, useState } from "@odoo/owl";
import metamaskIcon from "./img/MetaMaskIcon.svg";
import coinbase from "./img/Coinbase.svg";
import logo from "./img/logo.svg";
import Web3 from "web3";

export class Topbar extends Component {

    static template = xml`
    <nav class="navbar justify-content-between navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

        <!--  -->
        <img src="${logo}" alt="logo" style="width:32px" class="ms-3"/>
        <button class="btn btn-info text-white rounded-pill " t-if="state.metaMaskIsInstalled | state.coinBaseIsInstalled"  data-bs-toggle="modal" data-bs-target="#TopBarModal">
            unlock wallet
        </button>
        <button class="btn btn-warning text-white rounded-pill " t-if="!(state.metaMaskIsInstalled | state.coinBaseIsInstalled)" data-bs-toggle="modal" data-bs-target="#TopBarModal">
            install wallet
        </button>
        
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
            <div class="modal-body d-flex  flex-column flex-md-row">
                <!-- card1 -->
                <div class="card border-5 text-center my-4 mx-2" >
                    <img src="${metamaskIcon}" class="card-img-top w-25 h-25 mx-auto pt-4" alt="meta mask logo"/>
                    
                    <div class="card-body">
                        <h5 class="card-title text-dark my-5">Metamask</h5>
                        <p class="card-text"></p>
                        <a  class="btn btn-info text-white w-75" t-if="state.metaMaskIsInstalled" t-on-click="connectToMetamask">Connect</a>
                        <a href="https://metamask.io/download/" class="btn btn-warning text-white w-75" t-if="!state.metaMaskIsInstalled" >Install</a>

                        </div>
                </div>
                <!-- card2 -->
                <div class="card border-5 text-center my-4 mx-2" >
                    <img src="${coinbase}" class="card-img-top w-25 h-25 mx-auto pt-4" alt="meta mask logo"/>
                    
                    <div class="card-body">
                        <h5 class="card-title text-dark my-5">Coinwallet</h5>
                        <p class="card-text"></p>
                        <a class="btn btn-info text-white w-75" t-if="state.coinBaseIsInstalled">Connect</a>
                        <a href="https://www.coinbase.com/" class="btn btn-warning text-white w-75" t-if="!state.coinBaseIsInstalled" >Install</a>

                        </div>
                </div>
            </div>

            <!-- Modal footer -->
            

            </div>
        </div>
        </div>
    `;
    state = useState({ 
        text: "Owl",
        metaMaskIsInstalled: false,
        coinBaseIsInstalled: false,
    });
    setup(){
        if (window.ethereum && window.ethereum.isMetaMask){
            this.state.metaMaskIsInstalled = true;
        }
        if (window.ethereum && window.ethereum.isCoinbaseWallet){
            this.state.coinBaseIsInstalled = true;
        }
    };
    connectToMetamask() {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(() => {
                    window.web3 = new Web3(window.ethereum);
                    return true;
                });
        }
    };
   

    update() {
        this.state.text = this.state.text === "Owl" ? "World" : "Owl";
    }
}
