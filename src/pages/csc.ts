/*
CSC Network


 */
import { xml, useState, reactive, useRef, } from "@odoo/owl";
import { useContract, useWallet, switchChain } from "@web/core/wallet"
import { OPage } from "@web/components/page";

import img06 from "@web/img/csc.svg";
import cetABI from "@web/data/csc-validators.json"


const genzAdderss = "0xEAfF084e6da9aFE8EcAB4d85de940e7d3153296F";
const testAddress = "0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca";
const cetContract = "0x0000000000000000000000000000000000001000";
const weiRate = BigInt(1000000000000000000);
const testnetChainId = "0x35";
const mainnetChainId = "0x34";



export class CscStakingPage extends OPage {
	static route = '/staking/CSC';
    static template = xml`
	<div class="container-lg bg-white">
		<div class="row justify-content-center align-items-center">
			<img class="figure-img img-fluid p-3" 
				style="width:128px;"
				src="${img06}" />
                <div class="row justify-content-center align-items-center">
                    <div class="card mb-5"
                        style="width: 800px; border: none;  border-bottom: 6px solid green;">
                        <div class="card-body">
                        <h2 class="text-center">
                            <t t-if="wallet.chainId === '${mainnetChainId}'">Stake CET</t>
                            <t t-if="wallet.chainId === '${testnetChainId}'">Stake CET TestNet</t>
                            <t t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'">Not Connected/Unsupported Network !!</t>
                        </h2> 
                        <div class="p-2" >
                            <div class="input-group justify-content-center align-items-center">
                                <input class="form-control"
                                    id="myInp" 
                                    placeholder="Enter Cet Amount" 
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
                            id="actions">
                            <button class="btn btn-success text-white m-2"
                                t-on-click="stakeit"
                                t-if="wallet.chainId === '${mainnetChainId}' or wallet.chainId === '${testnetChainId}'"
                                id="stakeBtn">
                                <span t-if="wallet.isConnected and wallet.chainId === '${mainnetChainId}'">Stake <t t-esc="state.value" /> CET</span>
                                <span t-if="wallet.isConnected and wallet.chainId === '${testnetChainId}'">Stake <t t-esc="state.value" /> CET Test</span>
                                <span t-if="state.staking"><span class="spinner-border spinner-grow spinner-grow-sm"
                                    role="status" 
                                    aria-hidden="true"></span>Loading...</span>
                            </button>
                            <button class="btn btn-success text-white m-2"
                                t-on-click="stakeit"
                                t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'"
                                iOPaged="switch-to-cet-network">
                                <span>Switch Network</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center p-2 ml-5">
                    <h2 class="text-center">
                        <t t-if="wallet.chainId === '${mainnetChainId}'">Un-stake CET</t>
                        <t t-if="wallet.chainId === '${testnetChainId}'">Un-stake CET Test Net</t>
                        <t t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'">Not Connected/Unsupported Network !!</t>
                    </h2> 
                    <div class="card mb-3 " style="width: 700px; border: none;">
                        <div class="card-body ">
                            <div id="actions" class="d-flex flex-row justify-content-center align-items-center">
                                <button class="btn btn-outline-success" 
                                    t-on-click="unstakeit" 
                                    t-if="wallet.chainId === '${mainnetChainId}' or wallet.chainId === '${testnetChainId}'"
                                    id="unstakeBtn">
                                    <span t-if="wallet.isConnected and wallet.chainId === '${mainnetChainId}'">Un-stake CET</span>
                                    <span t-if="wallet.isConnected and wallet.chainId === '${testnetChainId}'">Un-stake CET Test</span>
                                    <span t-if="state.unstaking"><span class="spinner-border spinner-grow spinner-grow-sm"
                                        role="status" 
                                        aria-hidden="true"></span>Loading...</span>
                                </button>
                                <button class="btn btn-success text-white m-2"
                                    t-on-click="stakeit"
                                    t-if="wallet.chainId !== '${mainnetChainId}' and wallet.chainId !== '${testnetChainId}'"
                                    id="switch-to-cet-network">
                                    <span>Switch Network</span>
                                </button>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
		</div>
	</div>`;

    wallet = useWallet();
    state = useState({
        staking: false,
        unstaking: false,
        value: 0,
    });


    public setup() : void{
        //
    }

    /**
     * Stake the amount value from the input
     * 
     * @returns promise | undefinde
     */
    async stakeit() {
        if (this.state.staking || !this._checkChainId()) {
            await switchChain(mainnetChainId, 'coinex smart chain', 'https://rpc.coinex.net')
            return;
        }
        this.state.staking = true;
        let contract = useContract(this.wallet.chainId, cetContract, cetABI);
        var amount = BigInt(this.state.value) * weiRate;
        return contract.methods
            .stake(this.getVerifierAddress())
            .send({
                from: this.wallet.account,
                // Minimum 1000CET (1 CET = 1000?)
                value: "0x" + amount.toString(16)
            }).catch((ex) => {
                alert("Fail to performe the stake action")
            }).finally(() => this.state.staking = false);
    }

    /**
     * Unstake all CET from the default Validator
     * 
     * @returns promise to performe
     */
    unstakeit() {
        if (this.state.unstaking || !this._checkChainId()) {
            // wait for end 
            return;
        }
        this.state.unstaking = true;
        let contract = useContract(this.wallet.chainId, cetContract, cetABI);
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
        let contract = useContract(this.wallet.chainId, cetContract, cetABI);
        return contract.methods
            .withdrawStaking(this.getVerifierAddress())
            .send({
                from: this.wallet.account
            }).catch(ex => {
                alert("Fail to unstake!!");
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









