import express from 'express';
import { PartnerService } from '../services/PartnerService';

const router = express.Router();
const partnerService = new PartnerService();

router.get('/', async (req, res) => {
    const partners = await partnerService.getAvailablePartners();
    res.json(partners);
});

router.post('/apply', async (req, res) => {
    const { businessName, ein } = req.body;
    if (!businessName || !ein) {
        res.status(400).json({ error: 'Business Name and EIN required' });
        return;
    }

    const result = await partnerService.applyForPartnership(businessName, ein);
    res.json(result);
});

export default router;
