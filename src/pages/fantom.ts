/*
Network name
 Fantom Opera
New RPC URL
https://rpc.ankr.com/fantom/
Chain ID
250
Currency symbol
FTM
Block explorer URL
(Optional)
https://ftmscan.com/


===============================

Network Name: Fantom testnet
New RPC Url: https://rpc.testnet.fantom.network/
ChainID: 0xfa2
Symbol: FTM

*/ 


import { Component, xml, useState, reactive, useRef, } from "@odoo/owl";
import { useContract, useWallet, switchChain } from "@web/core/wallet";
import {OPage} from "@web/components/page";

import img06 from "@web/img/fantom.svg";
import FantomABI from "@web/data/fantom.json"


const genzAdderss = "0x5a1b57f87b59e093d332c945c66b602843099f97";
const testAddress = "0xaa3a160e91f63f1db959640e0a7b8911b6bd5b95";
const FantomContract = "0xFC00FACE00000000000000000000000000000000";
const weiRate = 1000000000000000000;
const testnetChainId = "0xfa2";
const mainnetChainId = "0xFA";



export class FantomStaking extends OPage {
	static route = '/staking/fantom';
    static template = xml`
    <div class="container-lg bg-white justify-content-center align-items-center">
    <div class="row justify-content-center align-items-center">
        <img class="figure-img img-fluid p-3" 
            style="width:128px;"
            src="${img06}" />
    </div>

    <div class="row p-5 justify-content-center align-items-center nav-justified ">
    <!-- Nav tabs -->
        <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="stake-tab" data-bs-toggle="tab"
                data-bs-target="#stake" type="button" role="tab" aria-controls="stake"
                aria-selected="true"
                style="color:#19e1ff;;"
                >
                Stake
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="unstake-tab" data-bs-toggle="tab" 
                data-bs-target="#unstake" type="button" role="tab" aria-controls="unstake" 
                aria-selected="false"
                style="color:#19e1ff;"
                >
                Unstake
            </button>
        </li>
        </ul>
    
        <!-- Tab panes -->
        <div class="tab-content justify-content-center align-items-center m-5">
            <div class="tab-pane active" id="stake" role="tabpanel" aria-labelledby="stake-tab">     
                <div class="row justify-content-center align-items-center">
                    <div class="card mb-5" 
                        style="width: 800px; border: none; ">
                        <div class="card-body">
                            <h2 class="text-center">
                                <t t-if="wallet.chainId === '${mainnetChainId}'">Stake Fantom</t>
                                <t t-if="wallet.chainId === '${testnetChainId}'">Stake Fantom TestNet</t>
                                <t t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'">Not Connected/Unsupported Network !!</t>
                            </h2> 
                            <div class="p-2">
                                <div class="input-group justify-content-center align-items-center">
                                    <input class="form-control"
                                        id="myInp" 
                                        placeholder="Enter Fantom Amount" 
                                        t-model="state.value"
                                        type="number"
                                        aria-label="Example text with two button addons" />
                                    <button class="btn btn-outline-secondary text-center"
                                    type="button">
                                    <img class=""
                                        src="${img06}" 
                                        style="width: 16px" />
                                    </button>
                                </div>
                            </div> 
                            <div class="d-flex flex-row justify-content-center align-items-center"
                            style="border-color:#1969ff; color:#1969ff;"                   id="actions">
                                <button class="btn text-white m-2"
                                style="background-color:#1969ff"
                                t-on-click="stakeit"
                                t-if="wallet.chainId === '${mainnetChainId}' or wallet.chainId === '${testnetChainId}'"
                                id="stakeBtn">
                                    <span t-if="wallet.isConnected and wallet.chainId === '${mainnetChainId}'">Stake <t t-esc="state.value" /> Fantom
                                    </span>
                                    <span t-if="wallet.isConnected and wallet.chainId === '${testnetChainId}'">Stake <t t-esc="state.value" /> Fantom
                                        Test</span>
                                    <span t-if="state.staking"><span class="spinner-border spinner-grow spinner-grow-sm"
                                        role="status" 
                                        aria-hidden="true"></span>Loading...</span>
                                </button>
                                <button class="btn  text-white m-2"
                                style="background-color:#1969ff"
                                    t-on-click="stakeit"
                                    t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'"
                                    id="switch-to-Fantom-network">
                                    <span>Switch Network</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="unstake" role="tabpanel" aria-labelledby="unstake-tab"><div class="row justify-content-center align-items-center p-2 ml-5">
                <h2 class="text-center">
                <t t-if="wallet.chainId === '${mainnetChainId}'">Un-stake Fantom</t>
                <t t-if="wallet.chainId === '${testnetChainId}'">Un-stake Fantom Test Net</t>
                <t t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'">Not Connected/Unsupported Network !!</t>
                </h2> 
                <div class="card mb-3 " style="width: 700px; border: none;">
                    <div class="card-body ">
                        <div id="actions" class="d-flex flex-row justify-content-center align-items-center">
                            <button class="btn btn-outline" 
                                t-on-click="unstakeit" 
                                style="border-color:#1969ff; color:#1969ff;"
                                t-if="wallet.chainId === '${mainnetChainId}' or wallet.chainId === '${testnetChainId}'"
                                id="unstakeBtn">
                                <span t-if="wallet.isConnected and wallet.chainId === '${mainnetChainId}'">Un-stake Fantom</span>
                                <span t-if="wallet.isConnected and wallet.chainId === '${testnetChainId}'">Un-stake Fantom Test</span>
                                <span t-if="state.unstaking"><span class="spinner-border spinner-grow spinner-grow-sm"
                                    role="status" 
                                    aria-hidden="true"></span>Loading...</span>
                            </button>
                            <button class="btn  text-white m-2"
                                t-on-click="stakeit"
                                style="background-color:#1969ff"
                                t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'"
                                id="switch-to-Fantom-network">
                                <span>Switch Network</span>
                            </button>
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
        </div>          
    </div>
</div>
</div>
    
    
    `;

    wallet = useWallet();
    state = useState({
        staking: false,
        unstaking: false,
        value: 0,
    });


    /**
     * Stake the amount value from the input
     * 
     * @returns promise | undefinde
     */
    async stakeit() {
        if (this.state.staking || !this._checkChainId()) {
            await switchChain(mainnetChainId, 'Fantom Opera', 'https://rpc.ankr.com/fantom/')
            return;
        }
        this.state.staking = true;
        let contract = useContract(this.wallet.chainId, FantomContract, FantomABI);
        var amount = this.state.value*weiRate;
        var val = "0x" + amount.toString(16)
        return contract.methods
            .delegate( this.getVerifierAddress())
            .send({
                from: this.wallet.account,val
                
            }).catch(ex => {
                alert("Fail to performe the stake action");
                console.error(ex);
            }).finally(() => this.state.staking = false);
    }

    /**
     * Unstake all m from the default Validator
     * 
     * @returns promise to performe
     */
    unstakeit() {
        if (this.state.unstaking || !this._checkChainId()) {
            // wait for end 
            return;
        }
        this.state.unstaking = true;
        let contract = useContract(this.wallet.chainId, FantomContract, FantomABI);
        contract.handleRevert = true
        contract.methods
            .unstake(this.getVerifierAddress())
            .send({
                from: this.wallet.account
            }).catch(ex => {
                alert("Fail to unstake!!");
            }).finally(async() => {
                
                this.state.unstaking = false;
            });
            this.withdrawStaking()
    }
    withdrawStaking(){
        let contract = useContract(this.wallet.chainId, FantomContract, FantomABI);
        return contract.methods
            .withdrawStaking(this.getVerifierAddress())
            .send({
                from: this.wallet.account
            }).catch(ex => {
                alert("Fail to unstake!!",ex);
            });
    }

    _checkChainId() {
        if (this.wallet.chainId !== mainnetChainId && this.wallet.chainId !== testnetChainId) {
            alert("Unsupported Chain ID :" + this.wallet.chainId);
            return false;
        }
        return true;
    }

    getVerifierAddress() {
        if (this.wallet.chainId === mainnetChainId) {
            return genzAdderss;
        }
        return testAddress;
    }
}








