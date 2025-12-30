// BY GOD'S GRACE ALONE

import MainHeader from "./sub_main_components/MainHeader"
import MainBody from "./sub_main_components/MainBody"
import {useEthers} from "@usedapp/core"
import { useEffect, useState } from "react"

const Main = () => {
    const {account, activateBrowserWallet, deactivate, chainId} = useEthers();
    const [currentContract, setCurrentContract] = useState();

    return( 
        <div className="gtljc_main">
           <MainHeader 
                account = {account} 
                activateBrowserWallet = {activateBrowserWallet}
                deactivate = {deactivate}
                chainId = {chainId}
                currentContract = {currentContract}
                setCurrentContract = {setCurrentContract}
                />
           <MainBody 
                account = {account} 
                activateBrowserWallet = {activateBrowserWallet}
                deactivate = {deactivate}
                chainId = {chainId} 
                currentContract = {currentContract}
                setCurrentContract = {setCurrentContract}
           />
        </div>
    )
}

export default Main