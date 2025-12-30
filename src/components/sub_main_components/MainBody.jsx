// BY GOD'S GRACE ALONE

import { useEffect, useState } from 'react';
import {ethers, Contract, utils} from "ethers";
import EtherWallet from "../../../contracts/EtherWallet.json"
import {formatUnits} from "ethers/lib/utils";
import * as Spinner from "react-loader-spinner"
import Button from './Button';
import ChristlyDropDown from './ChristlyDropDown';


const MainBody = ({account, activateBrowserWallet, deactivate, chainId, currentContract, setCurrentContract }) => {
    const [getBalance, setGetBalance] = useState(0);
    const [withdraw, setWithdraw] = useState(0);
    const [transactionPending, setTransactionPending] = useState(false);
    const [recipient, setRecipient] = useState("");
    const [withdrawalAmount, setWithdrawalAmount] = useState(0);
    const [contractDetails, setContractDetails] = useState("")
    
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    // const etherWalletContractAddress = currentContract.address
    const etherWalletContractAddress = currentContract ? currentContract.address : "0xaDd3EfB47285cbC202288eba63e2FE7646C3b8f8"
    const etherWalletContractABI =  currentContract ?  new utils.Interface(currentContract.abi) : new utils.Interface(EtherWallet.abi)
    // const etherWalletContractABI =  new utils.Interface(EtherWallet.abi)
    const etherWalletContract = new Contract(etherWalletContractAddress, etherWalletContractABI, signer)

    const getContractDetails = async () => {
    await fetch( "https://ether-wallet-api.vercel.app/api/retrieve_contract_details")
        .then(res => res.json())
        .then(res_jsonified => {setContractDetails(res_jsonified["data"])})
        .catch(console.error);

        
    }

 

    const etherWalletWithdraw = async () => {
        if(!transactionPending){
            try{
                setTransactionPending(true);
                const withdrawalAmountInWei = utils.parseEther(withdrawalAmount.toString());
                
                const tx = await etherWalletContract.withdraw(recipient,withdrawalAmountInWei)
                
                const receipt = await tx.wait(1);
                if(receipt.status === 1){
                    alert("Withdrawal successful, let recipient check their balance")
                    setTransactionPending(false);
                }
                else{
                    alert("Withdrawal failed")
                    setTransactionPending(false);
                }
                
            }
            catch(err){
                alert(err)
                setTransactionPending(false);
            }
        }
        else{
            alert("Cannot initiate transaction, a transaction is still ongoing")
        }
        
    }

    const etherWalletGetBalance = async () => {
        getContractDetails();
        if(!transactionPending){
            try{
                setTransactionPending(true);
                const returnedBalance = await etherWalletContract.callStatic.getBalance();
                console.log(returnedBalance);
                // const balanceInEther = returnedBalance ?  parseFloat(formatUnits(returnedBalance, 18)) : 0;
                const balanceInEther = returnedBalance ?  parseFloat(utils.formatEther(returnedBalance)) : 0;
                setGetBalance(balanceInEther)
                // const receipt = tx.wait(1);
                // if (receipt.status === 1){
                //     alert("Balance successfully returned")
                //     setTransactionPending(false);
                // }
                alert("Balance successfully returned")
                setTransactionPending(false);
                // else{
                //     alert("Balance unsuccessfully returned")
                //     setTransactionPending(false);
                // }
            }
            catch(err){
                alert(err)
                setTransactionPending(false);
            }
        }
        else{
            alert("Cannot initiate transaction, a transaction is still ongoing")
        }
    }

    // useEffect(()=>{
        //     const [networkName, setNetworkName] = useState("");
    //     const getNetwork = async () => {
    //         if (library){
    //             const net = await library.getNetwork()         
    //             console.log(net.name)
    //             await setNetworkName(net.name)
    //         }
    //     }

    //     getNetwork();
    // }, [library])

   
    const handleAmountChange = (event) => {
        setWithdrawalAmount(event.target.value);
        console(utils.formatEther(withdrawalAmount.toString()))
    }

    const handleRecipientChange = (event) => {
        setRecipient(event.target.value);
    }


    
    // alert(withdrawalAmount)
    // const setValue = (setter) => (evt) => setter(evt.target.value);


    const gtljcGetBalance = (formData) =>{  
        const balance = formData.get("balance");
        console.log("Gracious balance: ", balance);
        etherWalletGetBalance();
    }

    const gtljcWithdraw = (formData) =>{
        const recipient = formData.get("recipient");
        const withdrawal_amount = formData.get("withdrawal_amount");
        console.log("Gracious recipient and withdrawal_amount: ", recipient, withdrawal_amount);
        etherWalletWithdraw();
    }

    return(
        <>
            <main>
                <section>
                    <h6>Account: {account ? <span>{account.slice(0,10)+"..."+account.slice(-10)}</span>  : <span>Unavailable</span>}</h6> 
                    {/* <h6>Chain: {chainId ? chainId : ""}</h6>    */}
                </section>
                <section>
                    <div className='gtljc_balance'>
                            <form action={gtljcGetBalance} method="POST">     
                                    <div className="flex flex-wrap justify-between">  
                                        <div>
                                            <Button
                                                text={"Get Default Wallet Balance"}
                                                // command={etherWalletGetBalance}
                                                variant = {2}
                                                className="flex-1"
                                            />
                                        </div>   
                                        
                                        <ChristlyDropDown 
                                            contractDetails={contractDetails}
                                            currentContract = {currentContract}
                                            setCurrentContract = {setCurrentContract}
                                            etherWalletGetBalance = {etherWalletGetBalance}
                                        />
                                    </div>    
                                    <input
                                            type='text'
                                            name='balance'
                                            disabled   
                                            value={getBalance.toString() + " SepoliaETH"}                             
                                        />
                                
                            </form>

                    </div>
                    <div className = "gtljc_withdrawal">                       
                            <p className='gtljc_sectionTitle'>Withdrawal</p>
                            <form action={gtljcWithdraw} >
                                <input
                                    type = "text"
                                    name='recipient'     
                                    placeholder='0x...recipient address'
                                    value = {recipient}
                                    onChange={handleRecipientChange} 
                                                           
                                />
                                <input
                                    type = "number"
                                    name='withdrawal_amount'     
                                    placeholder='amount to withdraw' 
                                    value={withdrawalAmount != 0 ? withdrawalAmount : ""}  
                                    onChange={handleAmountChange}                       
                                />
                                <Button
                                    text={"Withdraw"}
                                    // command={etherWalletWithdraw}
                                    variant = {2}

                                />

                            </form>
                            <div className = "gtljc_spinner">
                                 <Spinner.Oval 
                                    height={"20px"}
                                    visible = {transactionPending}
                                    color='blue'
                                    secondaryColor='blue'
                                    strokeWidth={10}
                                    className="gtljcOval"
                                />
                            </div>
                    </div>
                </section>         
            </main>
        </>
    )
}

export default MainBody
