const sha256= require('sha256'); 
//constructor function same as a class in other programming languages 
function Blockchain(){ 
	this.chain=[];
	this.pendingTransactions=[];

	this.createNewBlock(0,'0','0');
};

//prototype function to the constructor function 
Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash,hash){
	const newBlock = {
		index : this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nonce: nonce, 
		hash: hash,
		previousBlockHash: previousBlockHash
	};

	this.pendingTransactions=[];
	this.chain.push(newBlock);

	return newBlock;
}

Blockchain.prototype.getLastBlock =function(){
	return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount,merchant,customer) {
	const newTransaction = {
		amount:amount,
		//timestamp:Date.now(),
		//Merchant’s Private key1 5JyXtwZC8g7djBoUAB2kSoQ17Q6McTEr4AvsvYfGDdQpGwtPuB5
		//Merchant's Private key2 5Huwj3R1Gkjmy7hRDApuJ8dkUmCKofXDXSBBMPszgLN1eDLRYHE
		merchant: merchant,
		//Customer’s public key
		customer: customer
		//Customer’s signature over the concatenation of fields 1-4
		//Merchant’s digital signature over the concatenation of fields 1-5. 
		//This is signed using merchant’s private key
	};

	this.pendingTransactions.push(newTransaction);  
	return this.getLastBlock()['index'] + 1;
} 

Blockchain.prototype.hashBlock = function(previousBlockHash,currentBlockData,nonce) {
	const dataAsString = previousBlockHash+ nonce.toString() +JSON.stringify(currentBlockData);
	const hash=sha256(dataAsString);
	return hash;
}

Blockchain.prototype.proofOfWork =function(previousBlockHash,currentBlockData){
	let nonce=0;
	let hash=this.hashBlock(previousBlockHash,currentBlockData,nonce);
	while(hash.substring(0,4)!=='0000') {
		nonce++;
		hash =this.hashBlock(previousBlockHash,currentBlockData,nonce);	
	}
	return nonce;
}


module.exports = Blockchain;