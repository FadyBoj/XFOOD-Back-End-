const axios = require('axios');
const CustomAPIError = require('../error/CustomAPIError');

const getBotRespond = async(req,res) =>{
    const { msg } = req.body;
    try {
        const { data } = await axios.get(`http://127.0.0.1:5000/send-msg/${msg}`);
        res.status(200).json({msg:data.XFOOD})

    } catch (error) {
        console.log(error)
        throw new CustomAPIError("Something went wrong",500);
    }


}


module.exports = {
    getBotRespond,
}