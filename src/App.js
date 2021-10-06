import './App.css';
import './Normalize.css'
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Main from "./Pages/Main/Main"
import { initMetaMask } from "../src/utils/metamask"
import { getActualTime, updateCurrentPrice, updateAccount} from "./redux/counterSlice"
import { useDispatch, useSelector } from "react-redux"
import { logXPContract, checkBalance, checkAllowence } from "../src/utils/xpnet"
import { logStakeContract, showAvailableRewards } from "../src/utils/stake"
import moment from 'moment';
import axios from 'axios';
import Web3 from "web3"


const W3 = new Web3(window.ethereum)
const { ethereum } = window
let accounts


function App() {

if(ethereum){
  window.ethereum.on("accountsChanged", accounts => {
    if (accounts.length > 0) {
       dispatch(updateAccount(accounts[0]))
       showAvailableRewards()
     }
 });
}


const dispatch = useDispatch()
const address = useSelector(state => state.data.account)

const getCurrentPrice = async () => {
  const currentPrice = (await axios.get("https://api.xp.network/current-price")).data
  console.log("price", currentPrice)
  dispatch(updateCurrentPrice(currentPrice))
}
const updateBalance = async () => {
  const balance = await checkBalance(address)
  // console.log(balance)
}
const doDate = () => {
    let str = moment().format('YYYY-MM-DD hh:mm')
    dispatch(getActualTime(str))
}

useEffect(() => {
 if(address) updateBalance()
 checkAllowence(address)
}, [address])

useEffect(() => {
  getCurrentPrice()
  setInterval(getCurrentPrice, 200000)
}, [])

useEffect(() => {
  doDate()
  setInterval(doDate, 1000);
  initMetaMask()
  logXPContract()
  logStakeContract()
}, [])

  return (
    <div className="app__wraper">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
