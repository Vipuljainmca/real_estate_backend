const express = require('express');
const { uploadDocument, getDocuments, removeDocument, downloadDocument } = require('../controller/documents');

const router = express.Router();

router.post('/upload/:leadId', uploadDocument);
router.get('/documents/:leadId', getDocuments);
router.delete('/documents/:documentId', removeDocument);
router.get('/download/:documentId', downloadDocument);

module.exports = router;
