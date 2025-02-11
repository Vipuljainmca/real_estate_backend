const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
});

module.exports = mongoose.model('Document', DocumentSchema);
