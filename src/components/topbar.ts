import { Component, xml, useState, onMounted } from "@odoo/owl";
import Web3 from "web3";
import { Modal } from "bootstrap";

import { useWallet, Wallet } from "@web/core/wallet";

import metamaskIcon from "@web/img/MetaMaskIcon.svg";
import coinbase from "@web/img/Coinbase.svg";
import logo from "@web/img/logo.svg";
 
export class Topbar extends Component {

    static template = xml`
    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 shadow sticky-top">
        <div class="d-flex flex-row w-100">
            <img class="ms-3"
                src="${logo}" 
                alt="logo" 
                style="width:32px"/>
            <spam class="flex-grow-1" />
            <button class="btn btn-warning text-white rounded-pill mx-2" 
                t-if="!wallet.provider" 
                data-bs-toggle="modal" 
                data-bs-target="#TopBarModal">Install Wallet</button>
            <button class="btn btn-info text-white rounded-pill mx-2" 
                t-if="wallet.provider and !wallet.unlocked"
                t-on-click="unlockWallet">Unlock Wallet</button>
            <button class="btn btn-info text-white rounded-pill mx-2" 
                t-if="wallet.chainId"
                t-on-click="showAccountInfo"><spam t-esc="wallet.chainId"/></button>
            <button class="btn btn-info text-white rounded-pill mx-2" 
                t-if="wallet.unlocked"
                t-on-click="showAccountInfo"><spam t-esc="wallet.account.slice(20)+'...'"/></button>
        </div>
    </nav>
    
    
    
    <div class="modal" 
        id="selectProviderModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Select a Wallet Provider</h5>
                    <button class="btn-close" 
                        type="button"
                        data-bs-dismiss="modal" />
                </div>
                <div class="modal-body d-flex flex-column flex-md-row align-content-center align-items-center">
                    <div class="card border-5 text-center my-4 mx-2"
                        style="width: 18rem;">
                        <img class="card-img-top mx-auto pt-4"
                            height="128px" 
                            width="128px" 
                            src="${metamaskIcon}" 
                            alt="meta mask logo" />
                        
                        <div class="card-body">
                            <h5 class="card-title text-dark my-5">Metamask</h5>
                            <p class="card-text"></p>
                            <a  class="btn btn-info text-white w-75" 
                                t-if="wallet.isMetaMask" 
                                t-on-click="connectWallet">Connect</a>
                            <a class="btn btn-warning text-white w-75" 
                                t-if="!wallet.isMetaMask"
                                href="https://metamask.io">Install</a>
                        </div>
                    </div>
                    <div class="card border-5 text-center my-4 mx-2"
                        style="width: 18rem;">
                        <img class="card-img-top mx-auto pt-4"
                            height="128px" 
                            width="128px" 
                            src="${coinbase}" 
                            alt="meta mask logo"/>
                        <div class="card-body">
                            <h5 class="card-title text-dark my-5">Coinwallet</h5>
                            <p class="card-text"></p>
                            <a class="btn btn-info text-white w-75" 
                                t-if="wallet.isCoinbaseWallet"
                                t-on-click="connectWallet">Connect</a>
                            <a class="btn btn-warning text-white w-75"
                                href="https://www.coinbase.com" 
                                t-if="!wallet.isCoinbaseWallet">Install</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="modal" 
        id="accountInfoModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Account</h5>
                    <button class="btn-close" 
                        type="button"
                        data-bs-dismiss="modal" />
                </div>
                <div class="modal-body d-flex flex-column flex-md-row align-content-center align-items-center">
                    TODO: show account info
                </div>
            </div>
        </div>
    </div>`;

    wallet: Wallet;
    accountInfoModal: Modal;
    selectProviderModal: Modal;

    setup() {
        this.wallet = useWallet();
        onMounted(() => {
            this.accountInfoModal = new Modal(document.getElementById('accountInfoModal'));
            this.selectProviderModal = new Modal(document.getElementById('selectProviderModal'));
        });
    }

    unlockWallet() {
        this.selectProviderModal.show();
    }

    showAccountInfo() {
        this.accountInfoModal.show();
    }

    connectWallet() {
        this.wallet.connect()
            .then(() => {
                this.selectProviderModal.hide();
            });
    }

}
