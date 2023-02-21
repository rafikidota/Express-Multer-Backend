const { response } = require('express');
const { request } = require('express');
const Doctor = require('../model/doctor.model');
/*
Route: /api/doctor
*/

//post
const createDoctor = async (req = request, res = response) => {

    try {
        const file = req.file;
        const data = JSON.parse(req.body.data);
        data.img = file.filename;
        const doctor = new Doctor(data);
        const doc = await doctor.save();
        return res.status(200).json({
            ok: true,
            msg: 'hello there',
            doctor: doc.dataValues,
            file
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Something were wrong'
        });
    }
}


module.exports = {
    createDoctor
}