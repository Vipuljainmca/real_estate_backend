const express = require('express');
const multer = require('multer');
const Document = require('../models/documents');
const path = require('path');
const fs = require('fs');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
});

// ✅ Upload Document API
exports.uploadDocument = [
  upload.single('file'),
  async (req, res) => {
    console.log('File Upload Request:', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const newDocument = new Document({
        leadId: req.params.leadId,
        name: req.file.originalname,
        path: req.file.path,
      });

      await newDocument.save();
      return res.status(201).json(newDocument);
    } catch (error) {
      console.error('Error saving document:', error);
      return res.status(500).json({ message: 'Error saving document', error });
    }
  },
];

// ✅ Get Documents by Lead ID
exports.getDocuments = async (req, res) => {
  try {
    const { leadId } = req.params;
    const documents = await Document.find({ leadId });

    if (!documents.length) {
      return res.status(404).json({ message: 'No documents found' });
    }

    return res.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return res.status(500).json({ message: 'Error fetching documents', error });
  }
};

// ✅ Delete Document API (Deletes both DB entry & file)
exports.removeDocument = async (req, res) => {
  try {
    const { documentId } = req.params;
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Delete file from storage
    fs.unlink(document.path, async (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ message: 'Error deleting file', err });
      }

      // Remove document from DB
      await Document.findByIdAndDelete(documentId);
      return res.json({ message: 'Document deleted successfully' });
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return res.status(500).json({ message: 'Error deleting document', error });
  }
};

exports.downloadDocument = async (req, res) => {
    try {
      const { documentId } = req.params;
      const document = await Document.findById(documentId);
  
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const filePath = path.join(__dirname, "../", document.path);
  
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found on server" });
      }
  
      res.download(filePath, document.name); // Send file as a response
    } catch (error) {
      res.status(500).json({ message: "Error downloading document", error });
    }
  };
