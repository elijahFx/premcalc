const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");

const makeSuite = async (req, res) => {
    const { court, courtAddress, name, type, date2, libellee, suitor, expenses } = req.body
    
    switch (type) {
        case "EXPENSES":
            const Case = { court, courtAddress, name, date2, libellee, suitor, expenses };
            const content = fs.readFileSync(path.resolve(__dirname, "expenses.docx"), "binary");
            console.log(Case);

            const zip = new PizZip(content);    
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            try {
                doc.render(Case);
                const buf = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });

                const filename = 'generated_document.docx';
                const filePath = path.resolve(__dirname, filename);
                fs.writeFileSync(filePath, buf);

                // Return the URL to access the document
                const url = `http://${req.headers.host}/${filename}`;
                res.status(200).json({ url });
                console.log("Document generated successfully.");
            } catch(error) {
                console.error('Error:', error);
                res.status(500).send(`Error generating document: ${error}`);
            }
            break;

        case "MATERIALS":
            // Handle MATERIALS case
            break;

        default:
            res.status(404).json({ err: "Нет такого дела" });
            break;
    }


};

const deleteAllSuites = async (req, res) => {
    res.status(200).json(CASE);
};

module.exports = {
    makeSuite,
    deleteAllSuites
};
