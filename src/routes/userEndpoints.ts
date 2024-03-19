import express, { response } from 'express';
const userRouter = express.Router();
import { getInventoryDetail, placeOrderFromInventory } from '../controller/business-logic';


userRouter.get('/user/get-inventory-detail', async (req, res) => {
    getInventoryDetail().then((result) => {
        res.status(200).send(result)
    }).catch(err => {
        res.status(500).send("soemthing went wrong")
    })
})


userRouter.post('/orders/place', (req, res) => {
    placeOrderFromInventory(req.body).then((response) => {
        res.status(200).send("order placed")
    }).catch((err) =>{
        res.status(500).send("api error")
    })
})

export default userRouter;