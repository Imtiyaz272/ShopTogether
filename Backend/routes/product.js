import express from 'express';
import { addToCart, createCart, getCart, getProductDetails, getProducts, joinCart } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.get('/getProductDetails/:productId', getProductDetails);
router.post('/addToCart', addToCart);
router.get('/getCart/:userId', getCart);
router.post('/createCart', createCart);
router.post('/joinCart', joinCart);
export default router;

