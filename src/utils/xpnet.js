import Web3 from "web3"
import XPNET from "../ABI/XPToken.json"
import { store } from "../redux/store"
import { updateBalance, updateApproved, updateAllowence, updateAproveButtonsLoader } from "../redux/counterSlice"
import { stakeAddress } from "./stake"
import { useSelector } from "react-redux"

export let xpAddress = "0x3241Ae82AB966176bd760632BFC9A13D22Cf8C88"
const W3 = new Web3(window.ethereum)
const state = store.getState()
// Create xpNet smart contract.
const xpContract = async () => {
    try{
        const Contract = await new W3.eth.Contract(XPNET, xpAddress)
        return Contract
    }
    catch(error){
        console.log(error)
    }
}

// Log XPNet smart contract to console.
export const logXPContract = async () => {
    const XPContract = await xpContract()
    console.log("xp contract", XPContract)
}

// Check balance on this account.
export const checkBalance = async (address) => {
    // debugger
    try{
        const Contract = await xpContract()
        const weiBalance = await Contract.methods.balanceOf(address).call()
        console.log("wei balance: ",weiBalance)
        const balance = parseInt(Web3.utils.fromWei(weiBalance, 'ether'));
        console.log("Balance:", balance)
        store.dispatch(updateBalance(balance))
        return balance
    }
    catch(error){
        console.log(error)
    }
}

// Aprove this account.
export const approve = async (account) => {
    debugger
    try{
        store.dispatch(updateAproveButtonsLoader(true))
        const Contract = await xpContract()
        // console.log("approve", Contract)
        Contract.methods.approve(stakeAddress, '10000000000000000000000000000000000000000000000000').send({from: account})
        .once('receipt', function(receipt){
            debugger
            console.log(receipt) 
            store.dispatch(updateAproveButtonsLoader(false))
            store.dispatch(updateApproved(true))
            checkAllowence(state.data.allowence)
        })
        .on('error', () => {
            debugger
            console.log("reject")
            store.dispatch(updateAproveButtonsLoader(false))
        })
    }
    catch(error){
        debugger
        store.dispatch(updateAproveButtonsLoader(false))
        console.log(error)
    }
}

// Check the allowence on this account.
export const checkAllowence = async (owner) => {
    // debugger
    if(owner){
        try{
            const Contract = await xpContract()
            // console.log(owner, 'hello', stakeAddress)
            const allowence = await Contract.methods.allowance(owner, stakeAddress).call()
            // console.log("allowence: ",typeof allowence, allowence, parseInt(allowence))
            if(parseInt(allowence)) store.dispatch(updateAllowence(allowence))
            
        }
        catch(error){
            console.log(error)
        }
    }
}

