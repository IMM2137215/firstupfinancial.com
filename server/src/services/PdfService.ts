import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

interface WaiverData {
    userName: string;
    signature: string;
    date: string;
}

export class PdfService {
    private templatePath: string;
    private outputDir: string;

    constructor() {
        this.templatePath = path.join(__dirname, '../templates/waiver.html');
        this.outputDir = path.join(__dirname, '../../generated_pdfs');

        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
    }

    async generateLiabilityWaiver(data: WaiverData): Promise<string> {
        let template = fs.readFileSync(this.templatePath, 'utf-8');

        // Simple string replacement
        const timestamp = new Date().toISOString();
        template = template.replace('{{USER_NAME}}', data.userName);
        template = template.replace('{{DATE}}', data.date);
        template = template.replace('{{SIGNATURE}}', data.signature);
        template = template.replace('{{TIMESTAMP}}', timestamp);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(template, { waitUntil: 'networkidle0' });

        const fileName = `waiver_${Date.now()}.pdf`;
        const filePath = path.join(this.outputDir, fileName);

        await page.pdf({
            path: filePath,
            format: 'A4',
            printBackground: true
        });

        await browser.close();
        return filePath;
    }
}
