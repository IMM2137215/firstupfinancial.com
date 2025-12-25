import express from 'express';
import { PaymentService } from '../services/PaymentService';

const router = express.Router();
const paymentService = new PaymentService();

router.post('/subscribe', async (req, res) => {
    // In a real app, userId would come from Auth middleware (req.user)
    // For MVP/Mock, passing it in body for easy testing
    const { userId, planId } = req.body;

    if (!userId || !planId) {
        res.status(400).json({ error: 'UserId and PlanId required' });
        return;
    }

    const result = await paymentService.createSubscription(userId, planId);
    res.json(result);
});

// Mock Webhook Receiver
router.post('/webhook', (req, res) => {
    console.log('[Webhook Received]', req.body);
    // Logic to update local DB status would go here
    res.sendStatus(200);
});

export default router;
