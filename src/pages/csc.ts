import { Component, xml, useState, reactive, useRef, } from "@odoo/owl";
import { useContract, useWallet } from "@web/core/wallet"

import img06 from "@web/img/csc.svg";
import cetABI from "@web/data/csc-validators.json"


const genzAdderss = "0xEAfF084e6da9aFE8EcAB4d85de940e7d3153296F";
const testAddress = "0x42eAcf5b37540920914589a6B1b5e45d82D0C1ca";
const cetContract = "0x0000000000000000000000000000000000001000";
const weiRate = BigInt(1000000000000000000);
const testnetChainId = "0x35";
const mainnetChainId = "0x34";



export class CscStakingPage extends Component {
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
                                id="switch-to-cet-network">
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
                        
                        
            <h2 class="text-center ">Why Stake with GenzStaking?</h2>
			<div class="d-flex flex-column flex-md-row justify-content-center">
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
    stakeit() {
        if (this.state.staking || !this._checkChainId()) {
            // wait for last operation
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









