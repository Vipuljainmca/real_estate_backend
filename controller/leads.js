const Leads = require("../models/leads");


exports.createLead = async (req, res) => {
    try {
        const {name, phone} = req.body;
      const newLead = new Leads({name,phone});
      await newLead.save();
      return res.status(201).json(newLead);
      
    } catch (error) {
     return res.status(500).json({ message: 'Error creating lead', error });
    }
  };

  exports.getAllLeads = async (req, res) => {
    try {
                const { name, phone } = req.query;
                // console.log(type);
                let filter = {};
        
                if (name) {
                    filter.name = name; // Assuming "type" represents category
                }
                if (phone) {
                    filter.phone = phone;
                }
        
      const leads = await Leads.find(filter);
     return  res.status(200).json(leads);
    } catch (error) {
    return  res.status(500).json({ message: 'Error fetching leads', error });
    }
  };

  exports.editLead = async (req, res) => {
    try {
      const { id } = req.body;
      const updatedLead = await Leads.findByIdAndUpdate(id, req.body, { new: true });
     return res.json(updatedLead);
    } catch (error) {
      return res.status(500).json({ message: 'Error updating lead', error });
    }
  };

  exports.removeLead = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await Leads.findByIdAndDelete(id);
      return res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting lead', error });
    }
  };