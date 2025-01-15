const { jsPDF } = require("jspdf");

function generatePDF(content) {
    const doc = new jsPDF();

    doc.text(content, 10, 10);
    const pdfOutput = doc.output();

    return pdfOutput;
}

module.exports = generatePDF;