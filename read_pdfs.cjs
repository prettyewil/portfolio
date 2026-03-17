const fs = require('fs');
const pdfParse = require('pdf-parse');

async function readPdfs() {
    try {
        const sakayBuffer = fs.readFileSync('public/sakay-case-study.pdf');
        const sakayData = await pdfParse(sakayBuffer);
        fs.writeFileSync('public/sakay.txt', sakayData.text);
        console.log("Successfully extracted SAKAY");

        const bibwakBuffer = fs.readFileSync('public/bibwak-case-study.pdf');
        const bibwakData = await pdfParse(bibwakBuffer);
        fs.writeFileSync('public/bibwak.txt', bibwakData.text);
        console.log("Successfully extracted BIBWAK");
    } catch (error) {
        console.error("Error extracting PDFs:", error);
    }
}

readPdfs();
