const aws = require('aws-sdk');
const xlsx = require('xlsx');
const services = require('./services/services');

const s3 = new aws.S3();

exports.handler = async(event, context) => {
    try {
        //find last file in folder
        const params = {
            Bucket: "anteriaddemobucket",
            Prefix: "Current File/",
        };
        const data = await s3.listObjects(params).promise();
        const fileKey = data.Contents[data.Contents.length - 1].Key;
        
        // Download Excel file from S3
        const params2 = {
            Bucket: "anteriaddemobucket",
            Key: fileKey,
        };

        const s3Response = await s3.getObject(params2).promise();
        console.log(s3Response);
        const workbook = xlsx.read(s3Response.Body, { type: 'buffer' });

        // Process the Excel data (you can customize this part based on your use case)
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(sheetData);

        for(const item of sheetData) {
            const first_delivery = await services.dateConverter(item['First Delivery']);
            const final_delivery = await services.dateConverter(item['Final Delivery']);
            const itemID = await services.findItemID(item['ID']);
            if(itemID === null)
                await services.createItem(item['Order'],item['ID'],first_delivery,final_delivery,item['Total Allocation'],item['Total Accepted'],item['Total Customer Returns'],item['Net Allocation'],item['Actual Allocation'],item['Allocation (mtd)'],item['Carry Over'],item['Carry Over Billable'],item['Submitted (mtd)'],item['Accepted'],item['Rejected'],item['Rejected (Rework/Retouch)'],item['Rejected (LUT)'],item['Pending Review'],item['Pending Enrichment'],item['CQ Pending'],item['Analytics In Progress'],item['Left To Deliver'],item['Pacing'],item['Acceptance'],item['Completion']);
            else
                await services.updateItem(itemID,item['ID'],first_delivery,final_delivery,item['Total Allocation'],item['Total Accepted'],item['Total Customer Returns'],item['Net Allocation'],item['Actual Allocation'],item['Allocation (mtd)'],item['Carry Over'],item['Carry Over Billable'],item['Submitted (mtd)'],item['Accepted'],item['Rejected'],item['Rejected (Rework/Retouch)'],item['Rejected (LUT)'],item['Pending Review'],item['Pending Enrichment'],item['CQ Pending'],item['Analytics In Progress'],item['Left To Deliver'],item['Pacing'],item['Acceptance'],item['Completion']);
        }

        return {
            statusCode: 200,
            body: 'Excel sheet successfully processed.',
        };
    } catch (err) {
        console.error('Error:', err);
        return {
            statusCode: 500,
            body: 'Error processing Excel sheet.',
        };
    }
};