const express = require("express");
const router = express.Router();

const { removeLead,editLead,getAllLeads,createLead} = require("../controller/leads")

router.get("/leads", getAllLeads);
router.post("/leads", createLead);
router.put("/leads", editLead);
// router.patch("/leads", removeLead);
router.delete("/leads/:id", removeLead); 


module.exports = router;
