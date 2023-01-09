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

import FantomABI from "@web/data/fantom.json"
import "./fantom.xml";
import "./fantom.scss";


const genzAdderss = "0x5a1b57f87b59e093d332c945c66b602843099f97";
const testAddress = "0xaa3a160e91f63f1db959640e0a7b8911b6bd5b95";
const FantomContract = "0xFC00FACE00000000000000000000000000000000";
const weiRate = 1000000000000000000;
const testnetChainId = "0xfa2";
const mainnetChainId = "0xfa";



export class FantomStaking extends OPage {
    static title = "Fantom";
    static logo = "./img/fantom.svg";
	static route = '/staking/fantom';
    static template = 'pages.fantom';

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
            await switchChain(mainnetChainId, 'Fantom Opera', 'https://rpcapi.fantom.network/')
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








