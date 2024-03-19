import express from 'express';
const router = express.Router();

import { addGrocery, getGroceries, deleteItemsFromGrocery, updatePriceOfInventory, manageInventory } from '../controller/business-logic';



router.post('/admin/add-grocery', async (req, res) => {
    try {
        let data = await addGrocery(req.body.name, req.body.price, req.body.description, req.body.inventory)
        res.send("groceries added to inventory successfully")
    } catch (err) {
        res.status(500).send("something went wrong")
    }
})


router.get('/admin/get-groceries-items', async (req, res) => {
    try {
        getGroceries().then((result) => {
            res.status(200).send(result)
        })
    } catch (err) {
        res.status(500).send("something went wrong")
    }
})

router.delete('/admin/delete-items', async (req, res) => {
    deleteItemsFromGrocery().then((result) => {
        res.status(200).send("items deleted successfully")
    }).catch((err) => {
        res.status(500).send("something went wrong")
    })
})


router.put('/admin/update-inventory', (req, res) => {

    const id = req.query.id;
    const price = req.query.price;
    updatePriceOfInventory(id, price).then((result) => {
        res.status(200).send("price updated")
    }).catch((err) => {
        res.status(500).send(err)
    })

})

router.put('/admin/grocery/items/:id/inventory', (req, res) => {
    const id = req.params.id;
    const { inventory } = req.body;

    manageInventory(id, inventory).then((result) => {
        res.status(200).send("inventory updated")
    }).catch((err) => {
        res.status(500).send(err)
    })



})

export default router;
