const {otherDetails, OEM} = require('../Models/AddCar');

const getProducts = async(req, res) => {
    const products = await OEM.find();
    // const oemDetail = await products.find({_id: products.oemRef})

    res.status(200).json({data:products})
}

module.exports = {getProducts}