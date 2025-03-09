import express from 'express';
import Transactions from '../models/Transactions.js';

const router = express.Router();

router.get("/transactions", async(req, res)=>{
    try{
        const transactions = await Transactions.find()
        .limit(50)
        .sort({createdOn:-1});
        res.status(200).json(transactions);
    }
    catch(error){
        res.status(404).json({message: error.message});
    }
});
export default router;