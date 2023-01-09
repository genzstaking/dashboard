import { Component, onMounted } from "@odoo/owl";
import { Modal } from "bootstrap";
import { useWallet, Wallet } from "@web/core/wallet";

import "./topbar.xml";
import "./topbar.scss";

export class Topbar extends Component {
    static template = "components.topbar";

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
    disconnect() {
        this.wallet.disconnect();
    }


}
