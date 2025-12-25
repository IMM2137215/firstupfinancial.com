import express from 'express';
import { PdfService } from '../services/PdfService';
import { AGENCIES } from '../data/agencies';

const router = express.Router();
const pdfService = new PdfService();

// Get list of agencies
router.get('/agencies', (req, res) => {
    res.json(AGENCIES);
});

// Generate Waiver PDF
router.post('/sign-waiver', async (req, res) => {
    try {
        const { userName, signature, date } = req.body;

        if (!userName || !signature || !date) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const filePath = await pdfService.generateLiabilityWaiver({
            userName,
            signature,
            date
        });

        res.json({
            success: true,
            message: 'Waiver generated successfully',
            filePath
        });
    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate waiver' });
    }
});

export default router;
