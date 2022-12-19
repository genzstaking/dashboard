var account;
var chainId;
var provider;
var web3;
import Web3  from "web3";
//create and return web3 
async function useWeb3(){
    if(web3) return web3
    var provider = window.ethereum;
    web3 = new Web3(provider);
    await provider.send('eth_requestAccounts');
    return web3
}
async function useAccount(){
    await useWeb3();
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    return account
}
async function useContract(id, addr, abi){
    await useWeb3()
    let chainId = await window.ethereum.request({ method: "eth_chainId" })
    
    if (chainId !== id) {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: id }],
            })
        
        } catch (err) {
            console.log(err)
            err.value = 'You are not connected to the csc Test Network!'
        }
    }
    return  await new web3.eth.Contract(abi, addr);


}
export {useAccount, useContract}