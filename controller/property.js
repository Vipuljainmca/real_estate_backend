
const Property = require("../models/property");

exports.createProperty = async(req,res)=> {
    try{
        const {type, size,location,budget,availability, name} = req.body;
        console.log(req.body)
        const newProperty = new Property( {type, size,location,budget,availability,name} );
        console.log(newProperty);
        await newProperty.save();
        return res.status(201).json(newProperty);
    }catch(err){
        return res.status(500).json({message : "Error creating property", err});
    }
}

exports.getAllProperty = async(req,res)=> {
    try{
        const { type, availability } = req.query;
        console.log(type);
        let filter = {};

        if (type) {
            filter.type = type; // Assuming "type" represents category
        }
        if (availability) {
            filter.availability = availability;
        }

        const property = await Property.find(filter);
    //    const property = await Property.find();
       return res.status(200).json(property);
    }catch(err){
        return res.status(500).json({message : "Error fetching property", err});
    }
}

exports.editProperty = async(req,res)=> {
    try{
       const {id} = req.body;
       console.log(id);
       const updatedProperty = await Property.findByIdAndUpdate(id,req.body,{new : true})
       return res.status(201).json(updatedProperty);
    }catch(err){
        return res.status(500).json({message : "Error update property", err});
    }
}

  exports.removeProperty = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await Property.findByIdAndDelete(id);
      return res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error deleting lead', error });
    }
  };