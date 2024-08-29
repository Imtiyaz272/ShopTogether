import Product from '../models/Product.js';
import user from '../models/user.js';
import { CreateError} from '../utils/error.js';
import {CreateSuccess} from '../utils/success.js';
import Cart from '../models/cart.js';
import User from '../models/user.js';
import Chat from '../models/chat.js';
import mongoose from 'mongoose';
export const getProducts = async(req, res, next) => {
    try {
        const products = await Product.find();
        return next(CreateSuccess(200, "All products fetched", products));
    } catch (error) {
        return next(CreateError(500,"Internal Server Error"));
    }
}

export const getProductDetails = async (req, res, next) => {
    try{
        const productId = req.params.productId;
        console.log(productId);
        const product = await Product.findById(productId);

        if(!product){
            return next(CreateError(500,"Product not found"));
        }

        res.status(200).json({
            success:true,
            data:product
        });
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: 'Server error', 
            error: error.message 
        });  
    }
}

export const addToCart = async(req, res, next) => {

    try{
    const {productId, quantity, userId} = req.body;
    
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    console.log(product.name);
    console.log(user.username);

    if(!product){
        return next(CreateError(400,"Product not found"));
    }

    // let cart = await Cart.findOne({userId});
    let cart = await Cart.findOne({
        $or: [
          { userId: userId }, 
          { users: userId }  
        ]
      });
    if(cart){
        const cartItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

        if(cartItemIndex > -1){
            const existingItem = cart.items[cartItemIndex];
            const oldQuantity = existingItem.quantity;
            const oldPrice = existingItem.price * oldQuantity;

            existingItem.quantity = quantity;
            const newPrice = existingItem.price * quantity;

            cart.totalQuantity += quantity - oldQuantity;
            cart.totalPrice += newPrice - oldPrice;
        }
        else{
            cart.items.push({
               productId,
               price: product.price,
               quantity,
               image:product.image,
               name:product.name
            });

            cart.totalQuantity += quantity;
            cart.totalPrice += product.price * quantity;
        }
    }
    else
    {
        cart = new Cart({
            userId,
            items: [{
                productId,
                price: product.price,
                quantity,
                image:product.image,
                name:product.name
            }],
            totalQuantity: quantity,
            totalPrice: product.price * quantity
        })
        console.log(cart._id);
    }

    await cart.save();

    res.status(200).json({
        message:"Item added to cart",
        cart
    })

   }
   catch(error){
    return next(CreateError(400,"Something went wrong while adding item to cart"));
   }
   
};

export const getCart = async(req, res, next) => {
    try{
    const userId = req.params.userId;
    console.log(userId);
    const user = await User.findById(userId);
    if(!user){
        return next(CreateError(500,"User not found"));
    }

    const cart = await Cart.findOne({
        $or: [
          { userId: userId }, 
          { users: userId }  
        ]
      });

    if(!cart){
        return next(CreateError(500,"No cart available"));
    }

    res.status(200).json(cart);
}
catch(error){
    return next(CreateError(500,"Something went wrong while fetching the cart"));
}

}

export const createCart = async (req, res) => {
    try {
      const { userId, cartName } = req.body;
    
      const newChat = new Chat({
        users:[userId]
      });

      const chatId = newChat._id;
      await newChat.save();

      const newCart = new Cart({
        userId,
        cartName,
        cartCode: generateOtp(),
        chatId
      });

      await newCart.save();

      res.status(201).json({
        message: 'Cart created successfully!',
        cartCode: newCart.cartCode,
        chatId : newCart.chatId
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export const joinCart = async (req, res) => {
    try {
      const { userId, cartCode } = req.body;
      console.log(cartCode);
      const cart = await Cart.findOne({ cartCode: cartCode});
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found!' });
      }

      cart.users.push(userId);
      await cart.save();
  
      res.status(200).json({ 
        message: 'Joined the cart successfully!' ,
        owner:cart.userId,
        chatId: cart.chatId
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
  };




  // This is the product controller