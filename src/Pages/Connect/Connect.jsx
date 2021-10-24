import React from 'react'
import "./Connect.css"
import MetaMask from "../../assets/MetaMask_Big_Fox.svg"
// import walletconnect from "../../assets/walletconnect.svg"
import { connectMetaMask } from "../../utils/metamask"
import { useDispatch } from 'react-redux'
import { chengeStatus } from "../../redux/counterSlice"

export default function Connect() {
    const dispatch = useDispatch()
    const { ethereum } = window

    const toggleMetaMask = () => {
        connectMetaMask()
        dispatch(chengeStatus(true))
    }

    return (
        <div className="connect__container">
            <div className="connect">
                {
                    window.innerWidth <= 600 ?
                    <>
                    { ethereum ? 
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                            Connect
                        </div>
                        </>
                        :
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div className="connect__title">
                            <div className="connect__button"><a href="https://metamask.app.link/dapp/stake-testing.xp.network/">MetaMask</a></div> 
                        </div>
                        </>
                        }
                    </>
                    :
                    <>
                    { ethereum ?
                        <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                            Connect
                        </div>
                        </>
                        :
                        <div className="required">MetaMask required</div>
                    }
                    </>
                }
            </div>
        </div>
    )
}



{/* <div className="connect__container">
            <div className="connect">
                {
                    window.innerWidth <= 600 ? 
                    <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        { ethereum ? 
                        <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                            Connect
                        </div>
                        :
                        <div className="connect__title">
                            <div className="connect__button"><a href="https://metamask.app.link/dapp/stake-testing.xp.network/">MetaMask</a></div> 
                        </div>
                        }
                        
                    </>
                    :
                    <>
                        <div className="fox">
                            <img src={MetaMask} alt="" />
                        </div>
                        <div className="connect__title">
                            MetaMask is required
                        </div>
                    </>
                }
                <div style={{display:`${ethereum ? "block":"none"}`}} onClick={() => toggleMetaMask()} className="btn-metamask">
                    Connect
                </div>
                { !ethereum ? <div className="required">MetaMask required</div> : null}
            </div>
        </div> */}