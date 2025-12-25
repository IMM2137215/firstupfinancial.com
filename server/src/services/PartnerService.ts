export interface Partner {
    id: string;
    name: string;
    type: string;
    status: 'Active' | 'Vetting' | 'Rejected';
}

export class PartnerService {
    async getAvailablePartners(): Promise<Partner[]> {
        // Mock database call
        return [
            { id: 'p1', name: 'Blue Ridge Bank', type: 'Banking', status: 'Active' },
            { id: 'p2', name: 'Solid Fi', type: 'Fintech Infrastructure', status: 'Active' },
            { id: 'p3', name: 'Alloy', type: 'Identity Decisioning', status: 'Active' }
        ];
    }

    async applyForPartnership(businessName: string, ein: string): Promise<{ status: string, decision_id: string }> {
        // Mock KYB Implementation
        console.log(`[Mock KYB] Vetting business: ${businessName} (${ein})`);

        // Simulating a fast "Auto-Approve" for MVP
        const isApproved = true;

        return {
            status: isApproved ? 'APPROVED' : 'MANUAL_REVIEW',
            decision_id: `kyb_${Math.floor(Math.random() * 10000)}`
        };
    }
}
