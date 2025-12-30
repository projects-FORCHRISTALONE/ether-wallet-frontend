// ALL THANKS AND GLORY TO THE AND my ONLY GOD AND LORD JESUS CHRIST ALONE
// BY GOD'S GRACE ALONE

import {ethers} from "ethers"

const ChristlyDropDown = ({contractDetails, currentContract, setCurrentContract, etherWalletGetBalance, getBalance}) => {
    // console.log((contractDetails));
    const selectButton = (id) => {
        setCurrentContract(contractDetails[id]);
        console.log(currentContract);
        etherWalletGetBalance();
    }
    const contractList = contractDetails ? (contractDetails.map((item)=>(
        
            <li className="">
                <a onClick = {()=>{selectButton(item.id)}}
                    className="inline-block text-center"
                >
                    {item.address.slice(0,10)}...{item.address.slice(-10)}
                    <br />
                    <span className="text-indigo-700 italic text-[1.4vh]">
                        Balance: {ethers.utils.formatEther(item.balance.toString())} SepoliaETH
                    </span>
                </a>
            </li>
        ) 
    )) 
    :
    <li>
        <a className="inline-block text-center hover:bg-transparent">
           <span className="text-red-700 italic">Not available</span>
        </a>
    </li>

    
    return(
        <>
           { (contractDetails||getBalance) ?
            (
                <div className = "dropdown">
                    <div  tabIndex={0} role = "button" className="btn m-1 w-52" > Select Other Wallets</div>
                    <ul tabIndex={-1} className=" dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ">
                            {contractList}
                        {/* </span> */}
                    </ul>
                </div>) : ""
            }
            


            
        </>
    )
}


export default ChristlyDropDown;