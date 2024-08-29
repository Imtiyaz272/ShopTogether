import ProductJson from './Store.json' assert {type:"json"};
import Product from './models/Product.js';

export const seedProductData = async () => {
    try
    {
        await Product.deleteMany({});
        await Product.insertMany(ProductJson);
        console.log("Data seeded successfully");
    } 
    catch (error) {
        console.log("Error: ", error);
    }
}
