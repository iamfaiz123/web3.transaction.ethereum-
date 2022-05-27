//class to sign transcations
const tx = require("ethereumjs-tx")


const Web3 = require("web3")

//we can connect to our blockchain using suited protocol
//here we're using HTTP
//ethereum local environment is hosted on ganache , my own local machine.
let web3 = new Web3("HTTP://127.0.0.1:7545")

// private key is always require to sign transactions
// never share private key of any account which is part of a public account
let privateKey1 = "387b0617d4ae0e9b7aa2fbd0323f5af539d390e053cd9a191631fbe1d9fcc851"


//address is derived from public key of a account,ie by only taking last 20bytes of the public key 
Account1_Addr = "0x5eE4F22f1e1c113de9Fb7c757191676fC2A4385E"
Account2_Addr = "0xdA4345f7182f7C8B10154DFF30357289F46712F6"


//checking balance in accounts
//Wei is the basic or native unit is ethereum development enviorment 
//what ever you get or send to a function , it should be always in Wei
//here in our call back function we're using web3.utils functions to convert Wei into ether
/// create async function to check balance
async function giveBalance(address)
{
     let a = await web3.eth.getBalance(address)
     console.log(web3.utils.fromWei(a,"ether"))
}

giveBalance(Account1_Addr)
giveBalance(Account2_Addr)
//it can be seen , for checking balance of a account you only need its address.


//now that we know the balance of each account, we could send ether from one account to another and broadcast it

//since ethereum works with pof , we need nonce.
//nonce is the number of transaction(including current) from a account
//in lastest version of web3 , nonce in transaction object is self created, you don't need to specify it


const transactionObject = 
{
    to:Account2_Addr,
    value:web3.utils.toWei("0.005","ether"),
    gas:"21000",
    gasPrice:web3.utils.toWei("0.0001","ether")
    //nonce: is automatically created
}

//to sign a transaction , one need to provide its private key for authentication
const signedTransaction = web3.eth.accounts.signTransaction(transactionObject, privateKey1); //returns a promis, need to resolve it

signedTransaction.then(signedTx => {

    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

    sentTx.on("receipt", receipt => {
        console.log("receipt: ", receipt);
      });

    sentTx.on("error", err => {
        console.log(err.message)
    });

})