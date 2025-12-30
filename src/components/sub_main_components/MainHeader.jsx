// BY GOD'S GRACE ALONE

import {useEthers} from "@usedapp/core"
import Button from "./Button"

const MainHeader = ({account, activateBrowserWallet, deactivate, chainId, currentContract, setCurrentContract }) => {
    // const isConnected = account !== undefined
     const commandActivateWallet = () =>{ activateBrowserWallet()}
     const commandDeactivateWallet = () => {deactivate()}

    return(
        <>
            <header>
                <div className="gtljc_header_left"> 
                    <img src="" alt="" />
                    <h2>Personal Ether Wallet</h2>
                    {!account ?
                        <Button
                            text={"Connect Wallet"}
                            command={commandActivateWallet}
                            variant={1}
                        />
                         :
                        <Button
                            text={"Disconnect"}
                            command={commandDeactivateWallet}
                            variant={1}
                        />
                    }
                </div>
                 
            </header>
               
        </>
    )
}

export default MainHeader