const express =require('express');
const app =express();
const bodyParser =require('body-parser');
const Blockchain =require('./blockchain');
const uuid =require('uuid/v1');

const nodeAddress =uuid().split('-').join('');

const modicoin = new Blockchain();
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false})); 

app.get('/blockchain', function(req,res){
	res.send(modicoin);
});

app.post('/transaction',function(req,res){
	const blockIndex=modicoin.createNewTransaction(req.body.amount, req.body.merchant,req.body.customer);
	res.json ({ note: `Transaction will be added in block ${blockIndex }.`});
});

app.get('/mine', function(req,res){
	const lastBlock = modicoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const currentBlockData = {
		transactions : modicoin.pendingTransactions,
		index: lastBlock['index'] + 1
	};
	const nonce =modicoin.proofOfWork(previousBlockHash,currentBlockData);
	const blockHash = modicoin.hashBlock(previousBlockHash,currentBlockData,nonce);
	modicoin.createNewTransaction(12.5,"00", nodeAddress);  // reward for the minner 12.5 modicoin
	const newBlock = modicoin.createNewBlock(nonce ,previousBlockHash,blockHash);
	

	res.json({
		note:"New Block Mined Successfully",
		block: newBlock
	});

});

app.listen(3000,function(){
	console.log('Listening on Port 3000.....  '); 
});