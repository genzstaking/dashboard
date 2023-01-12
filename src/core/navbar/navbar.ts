import { Component, onMounted } from "@odoo/owl";
import { Modal } from "bootstrap";
import { useWallet, Wallet } from "../wallet";

import "./navbar.xml";
import "./navbar.scss";

export class Navbar extends Component {
    static template = "components.topbar";

    wallet: Wallet;
    accountInfoModal: Modal;
    selectProviderModal: Modal;

    setup() {
        this.wallet = useWallet();
        onMounted(() => {
            // TODO: replace with dialog
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
    disconnect() {
        this.wallet.disconnect();
    }


}
