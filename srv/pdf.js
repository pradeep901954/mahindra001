const PDFDocument = require('pdfkit');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Define the path where the logo will be downloaded
const logoPath = path.join(__dirname, 'mahindra-logo.png');

// Function to download image
async function downloadImage(url, filepath) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Main function to generate the PDF
async function generatePDF() {
    // Download the logo
    await downloadImage('https://upload.wikimedia.org/wikipedia/commons/8/82/Mahindra_Auto.png', logoPath);

    // Create a document without specifying a fixed size
    const doc = new PDFDocument({
        margin: 50  // Set margin to ensure content doesn't overlap
    });

    // Write the PDF to a file
    doc.pipe(fs.createWriteStream('payment-details.pdf'));

    // Add the logo to the top left corner
    doc.image(logoPath, 50, 30, { width: 100 }); // Position the logo

    // Add the title centered with respect to the page width
    const title = 'Payment Details';
    const titleWidth = doc.widthOfString(title);
    doc.fontSize(20).fillColor('blue')
       .text(title, (doc.page.width - titleWidth) / 2, 30, { align: 'center' }); // Center title

    // Add a decorative line below the title and logo
    doc.moveDown(2);
    doc.lineWidth(2).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(1);

    // Sample payment details
    const paymentDetails = {
        transactionId: 'TXN1234567890',
        bank: 'HDFC Bank',
        name: 'John Doe',
        accountNo: '123456789012',
        amount: '250.00',
        ifsc: 'HDFC0001234',
        paymentMethod: 'Credit Card',
        pan: 'ABCDE1234F',
        status: 'Successful',
        soID: 'SO987654321',
        to: 'Mahindra Ltd',
        date: '2024-10-21',
    };

    // Define the payment details fields
    const details = [
        { label: 'Transaction ID:', value: paymentDetails.transactionId },
        { label: 'Bank:', value: paymentDetails.bank },
        { label: 'Name:', value: paymentDetails.name },
        { label: 'Account Number:', value: paymentDetails.accountNo },
        { label: 'Amount:', value: `₹${paymentDetails.amount}` },
        { label: 'IFSC Code:', value: paymentDetails.ifsc },
        { label: 'Payment Method:', value: paymentDetails.paymentMethod },
        { label: 'PAN:', value: paymentDetails.pan },
        { label: 'Status:', value: paymentDetails.status },
        { label: 'Sales Order ID:', value: paymentDetails.soID },
        { label: 'Payment To:', value: paymentDetails.to },
        { label: 'Date:', value: paymentDetails.date },
    ];

    // Table properties
    const tableTop = doc.y + 20; // Start position of the table
    const rowHeight = 25; // Height of each row
    const labelWidth = 150; // Width of label column
    const valueWidth = 250; // Width of value column
    const leftMargin = 50; // Left margin for the table

    // Draw the header cells
    doc.fillColor('#1B4F72')
       .rect(leftMargin, tableTop, labelWidth, rowHeight).fill() // Label header
       .fillColor('white').text('Field', leftMargin + 10, tableTop + 5); // Label text
    doc.fillColor('#1B4F72')
       .rect(leftMargin + labelWidth, tableTop, valueWidth, rowHeight).fill() // Value header
       .fillColor('white').text('Details', leftMargin + labelWidth + 10, tableTop + 5); // Value text

    // Add content with empty cells for each field
    details.forEach((item, index) => {
        const currentY = tableTop + (index + 1) * rowHeight; // Calculate current Y for each row

        // Draw the label cell without background color
        doc.strokeColor('black')
           .rect(leftMargin, currentY, labelWidth, rowHeight).stroke(); // Label cell border
        doc.fillColor('black')
           .fontSize(12)
           .font('Helvetica')
           .text(item.label, leftMargin + 10, currentY + 5); // Label text

        // Draw the value cell without background color
        doc.strokeColor('black')
           .rect(leftMargin + labelWidth, currentY, valueWidth, rowHeight).stroke(); // Value cell border
        doc.fillColor('black')
           .text(item.value, leftMargin + labelWidth + 10, currentY + 5); // Value text
    });

    // Add another decorative line
    doc.moveDown(2);
    doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke();
    doc.moveDown(3); // Adjust the vertical spacing after the line

    // Create footer line
    const footerLineY = doc.y; // Get the current Y position for footer line
    doc.lineWidth(1)
       .moveTo(50, footerLineY)
       .lineTo(550, footerLineY)
       .stroke();

    // Add footer text centered
    const footerText = 'Thank You for Making Payment!';
    const footerWidth = doc.widthOfString(footerText);
    doc.fontSize(12).fillColor('black')
       .text(footerText, (doc.page.width - footerWidth) / 2, footerLineY + 10, {
           align: 'center', // Align text to center
       });

    // Finalize the PDF and end the stream
    doc.end();

    console.log('PDF generated successfully');
}

// Run the function
generatePDF().catch(err => {
    console.error('Error generating PDF:', err);
});
