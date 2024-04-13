const path = require('path');
const fs = require('fs').promises;

const productImage = async(req, res) => {
    try {
        const filename = req.params.filename;
        if(!filename){
            return res.status(400).send('filename is missing');
        }
        const filePath = path.join(__dirname, '../uploads/seller/product', filename); // Construct file path using path.join
        const defaultFile = path.join(__dirname, '../uploads/seller/product', "default_product.png");
        // Check if the file exists asynchronously
        try {
            await fs.access(filePath);
            // File exists, send the file in the response
            res.sendFile(filePath);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File does not exist
                try {
                    await fs.access(defaultFile);
                    res.sendFile(defaultFile);
                } catch (error) {
                    res.status(404).send('File not found.');
                }
            } else {
                // Other error occurred
                console.error('Error accessing file:', error);
                res.status(500).json({message: 'Internal server error'});
            }
        }
    } catch (error) {
        console.error('Error in GetProfileImage:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

module.exports = {productImage}