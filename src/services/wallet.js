import { reactive, useState } from "@odoo/owl";
import Web3 from "web3";

class Wallet {
    _provider;
    _account;
    chainId;
    web3;

    set account(account) {
        this._account = account;
        // update chain id if account changed
        if (this.isConnected) {
            ethereum.request({
                method: 'eth_chainId'
            }).then(chinId => this.chainId = chinId);
        } else {
            this.chainId = undefined;
        }
    }

    get account() {
        return this._account;
    }

    get isConnected() {
        return this._account;
    }

    get unlocked() {
        return this.account;
    }

    set provider(provider) {
        this._provider = provider;
        this.web3 = new Web3(this._provider);
    }

    get provider() {
        return this._provider;
    }

    /**
     * Connect wallet to the current provider
     */
    connect() {
        return this.provider.request({
            method: 'eth_requestAccounts'
        }).then((accounts) => {
            this.account = (accounts?.length > 0) ? accounts[0] : undefined;
        });
    }
}

/**
 * Global wallet store.
 */
const wallet = reactive(new Wallet());


if (window.ethereum?.isMetaMask) {
    _connectToMetaMask(wallet);
} else if (window.ethereum?.isCoinbaseWallet) {
    _connectToCoinbaseWallet(wallet);
}


/**
 * Creates and publish new store of the wallet.
 * 
 * @returns wallet store
 */
function useWallet() {
    return useState(wallet);
}


/*
Add listener to MetaMask and follows changes.
*/
function _connectToMetaMask(wallet) {
    wallet.isMetaMask = true;
    wallet.provider = window.ethereum;
    // Check current account
    wallet.provider.request({
        method: 'eth_accounts'
    }).then(accounts => {
        wallet.account = (accounts?.length > 0) ? accounts[0] : undefined;
    });

    // handle account change
    wallet.provider.on('accountsChanged', (accounts) => {
        wallet.account = (accounts?.length > 0) ? accounts[0] : undefined;
    });

    // TODO: handle chain id change
    wallet.provider.on('chainChanged', (chainId) => {
        wallet.chainId = chainId;
    });
}


/*
Add listener to CoinbaseWallet and follows changes.
*/
function _connectToCoinbaseWallet(wallet) {
    wallet.isCoinbaseWallet = true;
    wallet.provider = window.ethereum;
}

function useContract(id, addr, abi) {
    if (wallet.chainId !== id) {
        throw {
            message: `Current chain id (${wallet.chinId}) deffers from requested (${id})`
        };
    }
    return new wallet.web3.eth.Contract(abi, addr);
}

export {
    useContract,
    useWallet
}