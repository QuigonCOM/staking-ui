import React, {useEffect} from 'react'
import {useHistory} from 'react-router'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useWeb3React} from '@web3-react/core'
import {WalletConnectConnector} from '@web3-react/walletconnect-connector'

import MetaMask from '../../assets/MetaMask_Big_Fox.svg'
import './Connect.css'
import walletconnectLogo from '../../assets/metaLogo.png'
import trustwalleticon from '../../assets/trustwalleticon.svg'
import {connectMetaMask} from '../../utils/metamask'
import {setProvide, updateAccount, changeStatus, setButtonPushed} from '../../redux/counterSlice'

import {injected, walletconnect} from '../../utils/connectors'
import AccountBox from '../../Components/Navbar/AccountBox'

export default function Connect() {
    const dispatch = useDispatch()
    const history = useHistory()
    const {ethereum} = window

    function getMobOps() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera

        if (/android/i.test(userAgent)) {
            return true
        }
    }

    const {active, account, activate} = useWeb3React()

    const onMetamask = async () => {
        try {
            await activate(injected)
            dispatch(setProvide('MetaMask'))
            dispatch(setButtonPushed(true))
        } catch (error) {
            console.log(error)
        }
    }

    const onTrustWallet = async () => {
        if (window.ethereum) {
            await activate(injected)
            dispatch(setProvide('MetaMask'))
            dispatch(setButtonPushed(true))
        } else {
            window.open(
                `https://link.trustwallet.com/open_url?coin_id=60&url=https://${window.location.host}`
            )
        }
    }

    const onWalletConnect = async () => {
        if (window.ethereum && window.innerWidth < 600) {
            try {
                await activate(injected)
                dispatch(setProvide('WalletConnect'))
                dispatch(setButtonPushed(true))
            } catch (error) {
                console.log(error)
                dispatch(setButtonPushed(false))
            }
        } else {
            try {
                const walletconnect = new WalletConnectConnector({
                    rpc: {
                        56: 'https://bsc-dataseed.binance.org/'
                    },
                    supportedChainIds: [56],
                    chainId: 56,
                    qrcode: true
                })
                walletconnect.networkId = 56
                await activate(walletconnect, undefined, true)
                dispatch(setProvide('WalletCOnnect'))
                dispatch(setButtonPushed(true))
            } catch (error) {
                console.log(error)
                dispatch(setButtonPushed(false))
            }
        }
    }

    useEffect(() => {
        if (account) {
            dispatch(updateAccount(account))
            dispatch(changeStatus(true))
            history.push('/stake')
        }
    }, [active, account])

    return (
        <div className="connect__container">
            <div className="con__box">
                <div className="con__header">
                    <img src={MetaMask} alt="" />
                </div>
                <div>
                    {!ethereum ? (
                        <div className="con__btn">
                            <a href="https://metamask.app.link/dapp/stake.xp.network/">MetaMask</a>
                        </div>
                    ) : (
                        <div onClick={() => onMetamask()} className="con__btn">
                            MetaMask
                        </div>
                    )}
                </div>
            </div>
            <div className="con__box">
                <div className="con__header">
                    <img src={walletconnectLogo} alt="" />
                </div>
                <div className="con__btn" onClick={() => onWalletConnect()}>
                    WalletConnect
                </div>
            </div>
            {(getMobOps() && window.innerWidth <= 600) ||
            (window.ethereum && window.innerWidth <= 600) ? (
                <div className="con__box">
                    <div className="con__header">
                        <img src={trustwalleticon} alt="" />
                    </div>
                    <div className="con__btn" onClick={() => onTrustWallet()}>
                        Trust Wallet
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
