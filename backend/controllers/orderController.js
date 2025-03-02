import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontend_url = "http://localhost:5174";
const placeOrder = async (req, res) => {
    try {
        const { userId, firstName, lastName, email, items, amount, address } = req.body;

        const newOrder = new orderModel({
            userId,
            firstName,
            lastName,
            email,
            items,
            amount,
            address
        });

        await newOrder.save();

        res.json({ success: true, message: "Order placed", orderId: newOrder._id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
};

// import orderModel from "../models/orderModel.js";

const payOrder = async (req, res) => {
    const { orderId } = req.body;

    try {
        // Check if order exists
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Update payment status to "Success"
        await orderModel.findByIdAndUpdate(orderId, { payment: "Success" });

        res.json({ success: true, message: "Payment Successful!" });
    } catch (error) {
        console.log("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Error processing payment" });
    }
};





export { placeOrder, payOrder };
