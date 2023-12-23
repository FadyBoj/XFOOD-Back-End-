const express = require('express');
const bodyParser = require('body-parser');
const Order = require('order');
const adminAuthorization = require('adminAuthorization');
const CustomAPIError = require('CustomAPIError');

const app = express();
app.use(bodyParser.json());

app.post('/models/Order.js', adminAuthorization, async (req, res) => {

    const { orderId, userId, status } = req.body;
    const admin = await user.findBy(userId); 

    if (!admin) {
        res.status(400).json({ mes: 'this id is not available' });
        return;
    }

    try {
        const order = await Order.findById(orderId); 

        if (!order) {
            res.status(400).json({ mes: 'Order not found' });
            return;
        }

        if (status === 'Waiting for a reply') {
            await Order.delete(orderId);
            res.status(200).json({ mes: 'Order deleted successfully' });
        }

         else if (status === 'Preparing') {
            await order.findOneAndUpdate({_id:userId},{type:status});
            res.status(200).json({ mes: 'Preparing message sent to customer' });
        } 

        else if (status === 'Delivery is in progress') {
            await order.findOneAndUpdate({_id:userId},{type:status});
            res.status(200).json({ mes: 'Delivery is in progress message sent to customer' });
        } 
        
        else if (status === 'Delivered') {
            await order.findOneAndUpdate({_id:userId},{type:status});
            res.status(200).json({ mes: 'Delivered message sent to customer' });
        }
    } catch (error) {
        throw new CustomAPIError("Invalid token", 498);
    }
});