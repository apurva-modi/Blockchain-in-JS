# Blockchain-in-JS
Basic Blockchain Coded in JavaScript!!

## How to run. 
1. Download Node.
2. Install all the dependencies as mentioned in the the package,json using npm. 
3. Clone the Project and do npm start with the project working Directory.
4. Go to localhost:3000/blockchain to see the blockchain initially it contains genisis block.
5. Use Postman to POST new Transaction to a Block at this URL http://localhost:3000/transaction in JSON.
6. Go to localhost:3000/mine to mine the tranctions and to create new block to the blockchain and to earn modicoins.

### blockchain.js contains the following. 
1. It has  a Constructor Function Blockchain() which initially consist of a genisis block.
2. It also has Different Prototype Function which are put to add property over the Blockchain which includes : 
 - createNewBlock - it  returns a new indexed Block with the encrypted transactoin data with current hash, previous hash, timestamp and nonce.
 - getLastBlock - it returns the last created Block. 
 - createNewTransaction - it responsible for adding a new transactional data over a block with amount of transaction and address of Merchant and Customer.
 - hashBlock - it returns the hash of the current block by encrypting the current transaction data with the previous block and the nonce using SHA256. 
 - proofOfWork - it returns nonce with four 0's with every hash in the blockchain hence maintains the validation of the blockchain. 

### api.js contains the following. 
This file contains 3 Events.
1. get blockhain - this event when triggered list the current state of the blockchain initially it only list the genisis block. 
2. post transaction - this event is sresponsible to push the transaction data to theh blockcahin pending transaction array.
3. get mine - this event mines all the pending transaction in the block and if there are not transaction in the block then it mines the previous block itself and for every mine a new block is added to the blockchaain and the minner is rewarded for the same by 12.5 modicoin (this blockchain's cryptocurrency). 



