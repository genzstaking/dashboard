/*
CSC Network


 */
import { xml, useState, reactive, useRef, } from "@odoo/owl";
import { useContract, useWallet, switchChain } from "@web/core/wallet"
import { OPage } from "@web/components/page";

import cetABI from "@web/data/csc-validators.json"

import "./csc.xml";
import "./csc.scss";

const genzAdderss = "0xEAfF084e6da9aFE8EcAB4d85de940e7d3153296F";
const testAddress = "0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca";
const cetContract = "0x0000000000000000000000000000000000001000";
const weiRate = BigInt(1000000000000000000);
const testnetChainId = "0x35";
const mainnetChainId = "0x34";



export class CscStakingPage extends OPage {
	static route = '/staking/CSC';
    static template = 'pages.csc';

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









