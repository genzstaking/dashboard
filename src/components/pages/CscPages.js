import { Component, xml, useState, reactive } from "@odoo/owl";

import img06 from "./csc-img/csc.svg";
import Web3 from 'web3'



var account = null
var contract = null
const cetABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "AddToValidatorCandidate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "valdiator",
                "type": "address"
            }
        ],
        "name": "RemoveFromValidatorCandidate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "validators",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "rewards",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "rewardCount",
                "type": "uint256"
            }
        ],
        "name": "RewardDistributed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "Staking",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "unLockHeight",
                "type": "uint256"
            }
        ],
        "name": "Unstake",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "rewardAddr",
                "type": "address"
            }
        ],
        "name": "ValidatorCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "validators",
                "type": "address[]"
            }
        ],
        "name": "ValidatorSetUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "ValidatorSlash",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "ValidatorUnjailed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "rewardAddr",
                "type": "address"
            }
        ],
        "name": "ValidatorUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "rewardAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "nextWithdrawBlock",
                "type": "uint256"
            }
        ],
        "name": "WithdrawRewards",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "validator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "WithdrawStaking",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "BlockEpoch",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MaxValidatorNum",
        "outputs": [
            {
                "internalType": "uint16",
                "name": "",
                "type": "uint16"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MinimalOfStaking",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "MinimalStakingCoin",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "SlashContractAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "StakingLockPeriod",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ValidatorContractAddr",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ValidatorSlashAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "WithdrawRewardPeriod",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "rewardAddr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "moniker",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            }
        ],
        "name": "create",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributeBlockReward",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "rewardAddr",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "moniker",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            }
        ],
        "name": "edit",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getActivatedValidators",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "staker",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "getStakingInfo",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getValidatorCandidate",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "getValidatorDescription",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "getValidatorInfo",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "enum Validators.Status",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "validators",
                "type": "address[]"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "initialized",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "isJailed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "isValidatorActivated",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "who",
                "type": "address"
            }
        ],
        "name": "isValidatorCandidate",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "slashValidator",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "stake",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStaking",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unjailed",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "unstake",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "updateActivatedValidators",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "moniker",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "website",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "details",
                "type": "string"
            }
        ],
        "name": "validateDescription",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "validatorCandidateSet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "validatorSet",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "withdrawRewards",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "validator",
                "type": "address"
            }
        ],
        "name": "withdrawStaking",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const cetContract = "0x0000000000000000000000000000000000001000"

async function connectwallet() {
    var provider = window.ethereum;
    var web3 = new Web3(provider);
    await provider.send('eth_requestAccounts');
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];

    //check if network is right
    let chainId = await window.ethereum.request({ method: "eth_chainId" })
    const CSCtest = '0x34'
    if (chainId !== CSCtest) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: CSCtest }],
            })
        } catch (err) {
            console.log(err)
            err.value = 'You are not connected to the csc Test Network!'
        }
    }
    contract = await new web3.eth.Contract(cetABI, "0x0000000000000000000000000000000000001000");
}

async function mint() {
    var _mintAmount = Number(5);
    var mintRate = Number(await contract.methods.cost().call());
    var totalAmount = mintRate * _mintAmount;
    contract.methods.mint(account, _mintAmount).send({ from: account, value: String(totalAmount) });
}


export class CscStakingPage extends Component {
    static template = xml`
	<div class="container-lg bg-white">
		<div class="row  justify-content-center align-items-center">
			<img class="figure-img img-fluid p-3" 
				style="width:128px;"
				src="${img06}" />
                <div class="row  justify-content-center align-items-center">
                <h2 class="text-center">Stake CET</h2> 
                <div class="card mb-3" style="width: 700px;">
                    <div class="card-body ">
                        <div class="p-5">
                            <div class="input-group justify-content-center align-items-center">
                                <input id="myInp" placeholder="Enter Cet Amount" value="" type="number" class="form-control"
                                 aria-label="Example text with two button addons" />
                                <button class="btn btn-outline-secondary text-center" type="button">
                                    <img src="${img06}" style="width: 16px" />
                                </button>
                            </div>
                        </div> 
                        <div id="actions"
        class="d-flex flex-row justify-content-center align-items-center">
        <button class="btn btn-success text-white m-2" t-on-click="stakeit">Stake</button>
        <button class="btn btn-outline-success " t-on-click="unstakeit">UnStake</button>
    </div>
                    </div>
                </div>
            </div>

            <h2 class="text-center ">Why Stake with GenzStaking?</h2>
			<div class="d-flex flex-column flex-md-row justify-content-around">
				<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABIBAMAAACnw650AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURUdwTCLNzx/LzCHMzB/MzBnN0iLLzSPMzSPMzSLNzSPMzSPMzSPMzSLMzSTMzWap9k4AAAAOdFJOUwAuGDokDESBv0/w1Jhox73QbAAAArlJREFUSMftlctrE0EYwNdH7cMHrim+QCnLCqL0EAbWVO0hIQdbqgSpKHppWVlJaUpVsAohYO2hQgiRamw85FBQyMGhFhQhsAhqetHQUhEqJSBKHrvb729wdnYTyWyaVihe9Mfu7MD349vZmW9mOe4/f07LzAakPeW/KrX92IC0Pb5JM9C6Mh8320/LazseDKBNTANBv7WGcwUgkzGNTEYFmKjrbFP1e4nkUxUeJhPJMNbe1ZN6tTuJYDB4A6eVoEIeeofT2aq+VCjf9KD5GIY5p7RL+2pJIZy15dpULZnP3IWiYpNLK+FMlsiztasBEM+9kSSJKMvKkBECeCFJ+WLtaqxMduD3siwjdFZHHr1rcn5Kloc1x9BhCSEkoYiBuoH0iI8wOwutZgShbvwAIZiifRRh63QHkbpuoyGdpKBJCadXHZnc7jMGUtNuN5FcFE+JXRQYdJ+CaVh0ufYD76Yc0diB40WeV3GR5/kDGk9xHQL282L3ef4ZkIY/WKIKuWGAkUYKJIduhkdWeRvMSm1E8A62k5D6yhRIz6sOOObgppfSB4/87RYxVuIiZT8lX/S3Wz2/uuA4B0p2ZMJfITbq2HPw2Az0wPWqlJt1lF3sgxnoK/n8ouX4Uj8dUmRcIBw3RFEUKL5z7LpwTTGglPaJAknm8/mEHmC3/U6wGbfyCKIg5p6zU562YvmCUKXXYKS8neFk+bfUCYx01EhSct+PVRD6YS+z8Spj+njRpn/sLltRV7VJCp67ZHMZgD0eU3bwRLkqaVF2hVOvrdC1QlUqOU8V3XqdOtNA2o2tcWtPmmyanRJ3fozyhQs0cQHzrpOpAgnbNNeXOgM1M2fUlSKVUtxiNodXG0sReBsN49nGEq0tPbCOlA2FowvcOtLo2j+OTZSyiiSTS1YbSZXCgwZSqipt1i/0n+IXUAF4UiPZCBkAAAAASUVORK5CYII=" />
					<h3 class="text-center">Staking Easier</h3> 
					<p>IFPool make you staking more easier than directly staking to CoinEx Smart Chain Node. Spend less time on limit condition.</p>
				</div>
				<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTCPd3SPMzSTLyyTP0iPLyyPMzSPMzSPMzSPJzSPMzCLNzSPMzSPMzSLMzSPMzSPMzXVFqcoAAAAQdFJOUwAGTiQQN8ZBgBovZ/HgsZiteM3zAAAC7klEQVRYw+2W25LbIAyGYyAgznr/p+0vgbvetuvT5mKnEzljAhYfQhKyH4+3vOULcYZ8ZYj3ZNxtTG78SVq+hxFTaiMyEKKm3euogHmlZ7OR3Av2GK5xCKt3Y8K4xg8XAUVXfOyZOyZPGSRlmQ6j3AVOySslU4fQ2je5nCaBU+e8rC5WqW0dq2dJ4IxtGS8ALxZpNvk5XLid8zP29cSFLCrtY4sNju76ALs7kQYJcXlCAsxp4bkRIXsdQUztiY01nVVh2PMPQfSrkhr7w0TkMlXrX5xngqPHMoXDoUE9QToXk6ZkRH/twNE0nvsjD5Uw9POcKT6W4NHo01CASWkX1LmJOnww55XfZ78Oq/yq0XdBlU2yKTBjWZssafFI6UmIoWx2PrMpc93jWC4WQtxwTxY7LNkOkWMsY9YzSX8/AzJ7UZq6aNnYVXBc6WMVPDO7Wd3Hakkaw9oN3fdgEw6JWoeMHdy9etJ0USObsDZ2BRrxd5FzJ8+itUXNpN0DB3tjjIY97hHWVzQgiKdz6TooA1PpCGQFZBUhQFgSg3hdx+IE2ROg1aINKOPAlxA3oEOL8gbUdGv6Tiob0gDlXRAxOedwcJ1IRvSds1reguwu6DBCgDvtRi1zE9XKmBKdlfIsQMpWZsrDOJeBoXm3iFSZ2dSwde4QMSyMQR3z+4WEOeqe6pgtoU/6T/PIDXOxX4e03D20sGWBVM7SOEkixlu7S+3vMrRgkcUtCx28ABALUYN2lHaR7F6riJCXONfwB/XfoYYOvbYMsVJB8FKLo4vSKI14/OhlpIoImC68PPQnt9EgicZCR58Abpb1rw73DNahQWJSnqm5Bwonvm7C4wToygeSgILvWSuqzd2nb4Bo+wlJt0BJDUAMvb6Qivc3QVu7nPtw2rdA27+XQS67f4KoXvxuz9PZ9A/jbkXtR4PyLR8NxMimjffvZvbLztpPAtmWPvvoLugru14GasW+BvRwjxeBHv8JyOx+A7/lLav8AjPDNT4dgpQ1AAAAAElFTkSuQmCC" />
					<h3 class="text-center">Staking with Liquidity</h3> 
					<p>Staking CET on IFPool you get iCET, you can using iCET to do more things. Exchange or staking on lending platform.</p>
				</div>
				<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
					<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAzUExURUdwTCLMzR/O0SLMzSLMzSHMzCDJzCLMzyLMzRbIyCHLzSPMzSPMzSLMzSPMzSLMzSTMzetEilgAAAAQdFJOUwCAEF9OLxs5QwkmxZfy37FnlycVAAACnElEQVRYw+2Y7YKjIAxFCwFEQMj7P+0mAb92WoVpd3/1Yi2meiaSEHEej6+++sdS/jOcgov7iD+4YNbvcwAXFTG+zZkWVAAZy5sct2ACEuEaOKvfcDS5AmAA1IKmGWpnUDQ4zKFGQz4JJ0tnOPAZjJENEoeuYDRpPIbkBVQMi6gVXEZJHHhzUEQGS6eMBv7IMZQEce2kgYBR4E8c42EzLQgjgTd+a3UH4mTtmO6AFU8y7dN2PPxyoHqTINFAk/iqjccGitiK7AsdVi1+V2q2VA8J2RX6xMrYIJOAihhNs40kQcRJ5LklBOZNq8xAEhBIGAJj0EZlm+9JAhOOHolW0C5KgrvQhXr/NyB7nwSm1lYC2a0xyJ4ak26SwK8ga+mKuhFo62/bbRLUgiqgVQz6qb4kuAIpXAXvgAId5lg19YDCLgKF06Efqf1yjT2BbP10gwIUqq0nF3JJMOiRVrkN5K5S60GBARDlPhYFLuJJ9HQr9AeKdaQN5PVFOi5JToZ4VAVw5XdhB02oLp5nyl0I89EjfwGayKPwCkNlqPC36gDpOkb+B2SCxGPkdKdHWocatRwLV3wDvI916IvR2mmtezya6TztJUIn5agg6KquW5udXk831RvyykyrUQusB6RQLpr1c5XcDzLzPBNontt37TVFZOsKeiR7AfLbVfrYq5uAZtUxRQCjm19KYewF6UgZSXf34O3crOI1JNtV1+ynRSxiTMr7sE1ADyqyOYX1/rvKkUl/Tf1WRJTbB7J7rUU+pH3uK5ozh19tuV/W6Ovngu9esd94HZdPgbAfdOl87vbI0pLz9QjFgUU2UKATuCdx5MIWB14gQuLUQ6lrsmak7yTpSKvmwTeaJ4WNch1++XJrxRdV/fr+3+Kr/6Y/fk40uKbBmO8AAAAASUVORK5CYII=" />
					<h3 class="text-center">Higher APY</h3> 
					<p>IFPool switch to higher APY node using smart strategy, this make you get a higher APY than staking to nodes directly.</p>
				</div>
			</div>
		</div>
		<div class="row d-flex flex-column p-5">
			
		</div>



		<div>
			<h2>CSC Reward Calculator</h2> 
			<div class="card">
				<div class="card-body d-flex flex-column">
					<div class="d-flex flex-row justify-content-between">
						<div>Enter your amount</div> 
						<div>0 CET</div>
					</div> 
					<div>
						<div class="input-group">
							<input placeholder="Enter Cet Amount" value="" type="text" class="form-control" aria-label="Example text with two button addons" />
							<button class="btn btn-outline-secondary" type="button">
								<img src="${img06}" style="width: 16px" />
							</button>
						</div>
					</div> 
					<div class="card-body d-flex flex-column flex-md-row justify-content-around p-5">
						<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
							<div>Rewards</div> 
							<div>7.73%</div> 
							<div>More info</div>
						</div> 
						<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
							<div>Monthly earnings</div> 
							<div>0 CET</div> 
							<div>$ 0</div>
						</div> 
						<div class="d-flex flex-column m-1 p-1 justify-content-center align-items-center">
							<div>Yearly eamings</div> 
							<div>0 CET</div> 
							<div>$ 0</div>
						</div>
					</div> 
					<button class="btn btn-primary">Stake now</button>
				</div>
			</div>
		</div>

	</div>
	`;
    async stakeit() {
        await connectwallet();
        console.log("contract", contract)
        var verifierAddress = "0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca";
        contract.handleRevert = true
        contract.methods
            .stake(verifierAddress)
            .send({ 
                from: account, 
                // Minimum 1000CET (1 CET = 1000?)
                value: "0x3635c9adc5dea00000" 
            });
        contract.handleRevert = false
        console.log(document.getElementById("myInp").value.type)
    }
    async  unstakeit() {
        await connectwallet();
        var verifierAddress = "0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca";
        contract.handleRevert = true
        contract.methods.unstake(verifierAddress).send({from: account});
        contract.handleRevert = false
    }

}








