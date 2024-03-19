import { environment } from './../../environment';
import mysql from 'mysql';

let connection: mysql.Connection | null = null;

export function executeQuery(query: string, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
        connect().then(_ => {
            connection?.query(query, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).catch(reject);
    });
}

export function connect(): Promise<void> {
    console.log(environment.DB_PASSWORD)
    console.log(environment.DB_USER)

    return new Promise((resolve, reject) => {
        if (!connection) {
            connection = mysql.createConnection({
                host: environment.DB_HOST,
                user: environment.DB_USER,
                password: environment.DB_PASSWORD,
                database: environment.DB_NAME
            });

            connection.connect((err) => {
                if (err) {
                    console.error('error connecting: ' + err.message);
                    connection = null;
                    reject(err);
                } else {
                    connection.on('error', function (err) {
                        console.log('db error', err.message);
                        connection = null;
                        console.log('Trying to connect again --------------')
                        connect();
                    });
                    resolve();
                }
            });
        } else {
            resolve();
        }
    });
}


export async function placeOrder(items: { itemId: number; quantity: number }[]): Promise<void> {

    try {
        await connect()
        await beginTransaction(connection);

        
        for (const item of items) {
            const query = 'INSERT INTO orders (item_id, quantity) VALUES (?, ?)';
            const data = [item.itemId, item.quantity];
            await executeQuery(query, data);
        }

    
        await commitTransaction(connection);
        console.log('Order placed successfully');
    } catch (error) {
        
        if (connection) {
            await rollbackTransaction(connection);
        }
        console.error('Error placing order:', error);
        throw error; 
    } finally {
        
        if (connection) {
            connection.end();
        }
    }
}

async function beginTransaction(connection: mysql.Connection): Promise<void> {
    
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function commitTransaction(connection: mysql.Connection): Promise<void> {
    
    return new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

async function rollbackTransaction(connection: mysql.Connection): Promise<void> {
    
    return new Promise((resolve, reject) => {
        connection.rollback((err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}


