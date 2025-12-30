// BY GOD'S GRACE ALONE
import { getDefaultProvider } from "ethers"
import "./App.css"
import Main from "./components/Main"
import {DAppProvider, ChainId, Sepolia} from "@usedapp/core"
import Header from "./components/Header.jsx"

const App = () =>{

    const config = {
        readOnlyUrls : {
            // [Mainnet.chainId] : getDefaultProvider("mainnet"), 
            // [Sepolia.chainId] : `https://sepolia.infura.io/v3/b591fd4586444fa6bbb2bfd717b46ab7`
            [Sepolia.chainId] : getDefaultProvider('sepolia')
        },
    }
    return(
        <DAppProvider
            config = {config}
        >
            <Header />
            <Main/>
        </DAppProvider>
    )
}

export default App;