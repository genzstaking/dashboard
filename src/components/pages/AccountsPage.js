import { Component } from "@odoo/owl";
import { xml } from "@odoo/owl";

export class AccountsPage extends Component{
    static template = xml `
        <button class="btn btn-primary" t-on-click="toggleTask">info</button>
        
    `;
    toggleTask(){
        alert('hhklkj')
    }
}