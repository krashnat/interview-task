import { executeQuery, placeOrder } from '../config/db-bridge';

export function addGrocery(name: string, price: number, description: string, inventory: number): Promise<void> {
    return new Promise((resolve, reject) => {

        const sql = `INSERT INTO products (name, price, description, inventory) VALUES (?, ?, ?, ?)`;
        executeQuery(sql, [name, price, description, inventory]).then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
        })

    });
}

export function getGroceries(): Promise<any> {
    return new Promise((resolve, reject) => {
        const sql = `select * from products`;
        executeQuery(sql, "").then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
        })
    })
}

export function deleteItemsFromGrocery(): Promise<any> {
    return new Promise((resolve, reject) => {
        const sql = `delete from products`;
        executeQuery(sql, "").then((result) => {
            resolve(result)
        }).catch((err) => {
            console.log(err)
        })

    })
}

export function updatePriceOfInventory(productId: any, price: any) {
    return new Promise((resolve, reject) => {
        let selectQuery = `SELECT * FROM products WHERE id = ?`;
        let selectValues = [productId];

        executeQuery(selectQuery, selectValues)
            .then((results) => {
                if (results.length === 0) {
                    reject("Product does not exist");
                } else {
                    let updateQuery = `UPDATE products SET price = ? WHERE id = ?`;
                    let updateValues = [price, productId];

                    executeQuery(updateQuery, updateValues)
                        .then((result) => {
                            resolve(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            reject(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}


export function manageInventory(productId: any, inventory: any) {

    return new Promise(async (resolve, reject) => {
        let selectQuery = `SELECT * FROM products WHERE id = ?`;
        let selectValues = [productId];

        let results = await executeQuery(selectQuery, selectValues)
        // .then((results) => {
        if (results.length === 0) {
            reject("Product does not exist");
        } else {
            let updateQuery = `UPDATE products SET inventory = ? WHERE id = ?`;
            let updateValues = [inventory, productId];

            executeQuery(updateQuery, updateValues)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        }
    })

}

export function getInventoryDetail() {
    return new Promise((resolve, reject) => {
        let sql = `select * from products`;
        executeQuery(sql, "").then((result) => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
    })
}

export function placeOrderFromInventory(items: any) {
    return new Promise((resolve, reject) => {
        placeOrder(items).then((result) => {
            resolve(result)
        }).catch((err) =>{
            reject(err)
        })
    })


}












