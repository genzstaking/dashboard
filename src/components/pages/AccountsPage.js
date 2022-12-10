import { Component } from "@odoo/owl";
import { xml } from "@odoo/owl";

export class AccountsPage extends Component{
    static template = xml `
        <button class="btn btn-primary" t-on-click="checkConectToMetamask">info</button>
        <button class="btn btn-info" t-on-click="allowToConect">conect</button>
    `;
    checkConectToMetamask(){
        // a thing realated ethereum is installed
        if (window.ethereum){
            console.log('is exist')
        };
        //check for metamask is install
        if (window.ethereum.isMetaMask){
            console.log('metamask') 
        } 
    };
    allowToConect(){
        // allow to conect wallet to metamask
        ethereum.request({ method: 'eth_requestAccounts' });

    }
}