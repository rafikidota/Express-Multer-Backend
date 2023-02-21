const { Router } = require('express');
const { createDoctor } = require('../controller/doctor.controller');
const router = Router();

router.post('/',createDoctor);

module.exports = router;