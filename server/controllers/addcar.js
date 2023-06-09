const { OEM, otherDetails } = require("../Models/AddCar");


const addCar = async(req, res) => {
    const body = req.body;
    // console.log(body)

    const Oem = await OEM.insertMany([body.oemdetails]);
    // const OemRes = await Oem;
   console.log("Oem", Oem)
    let otherDetailsPayload = {...body.otherdetails, oemRef : Oem[0]._id};
    const allDeatils = await otherDetails.insertMany([otherDetailsPayload]);

    // const allDetailsRes = await allDeatils;
    console.log("allDetails", allDeatils)

    res.status(201).send({
        status: 'succes',
        message:'Item added successfully',
        error:null
    })
}

module.exports = {addCar}