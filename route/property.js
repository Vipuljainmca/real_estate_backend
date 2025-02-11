const express = require("express");
const router = express.Router();

const {createProperty, getAllProperty, editProperty, removeProperty} = require("../controller/property");

router.get("/property", getAllProperty);
router.post("/property", createProperty);
router.put("/property", editProperty);
router.delete("/property/:id", removeProperty);

module.exports = router;
