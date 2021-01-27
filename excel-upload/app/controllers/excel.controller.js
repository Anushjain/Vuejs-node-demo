
const db = require('../config/db.config.js');
const Customer = db.Customer;

const readXlsxFile = require('read-excel-file/node');

exports.uploadFile = (req, res) => {

    try{
        let filePath = `${process.cwd()}/uploads/` + req.file.filename;
        readXlsxFile(filePath).then(rows => {
            rows.shift();
            const customers = [];
            let length = rows.length;
            for(let i=0; i<length; i++){
    
                let customer = {
                    id: rows[i][0],
                    name: rows[i][1],
                    address: rows[i][2],
                    age: rows[i][3]
                }
                customers.push(customer);
            }
            Customer.bulkCreate(customers).then(() => {
                const result = {
                    status: "ok",
                    filename: req.file.originalname,
                    message: "Upload Successfully!",
                }

                res.json(result);
            });
        });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}
