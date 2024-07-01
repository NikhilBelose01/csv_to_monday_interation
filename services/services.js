const axios = require('axios');
const API_KEY = process.env.API_KEY;
const headers = {
    'Content-Type': 'application/json',
    'Authorization': API_KEY,
};

const createItem = async(itemName, ID, first_delivery="", final_delivery="", total_allocation=0, total_accepted=0, total_customer_returns=0, net_allocation=0, actual_allocation=0, allocation_mtd=0, carry_over=0, carry_over_billable=0, submitted_mtd=0, accepted=0, rejected=0, rejected_rr=0, rejected_lut=0, pending_review=0, pending_enrichment=0, cq_pending=0, analytics_in_progress=0, left_to_deliver=0) => {
    try {
        const query = `mutation {
            create_item (board_id: 5966394921, group_id: "topics", item_name: "${itemName}", column_values: "{\\\"id\\\": \\\"${ID}\\\",\\\"date\\\": {\\\"date\\\" : \\\"${first_delivery}\\\"},\\\"date2\\\": {\\\"date\\\" : \\\"${final_delivery}\\\"},\\\"numbers0\\\": \\\"${total_allocation}\\\",\\\"numbers03\\\": \\\"${total_accepted}\\\",\\\"numbers3\\\": \\\"${total_customer_returns}\\\",\\\"numbers8\\\": \\\"${net_allocation}\\\",\\\"numbers6\\\": \\\"${actual_allocation}\\\",\\\"numbers9\\\": \\\"${allocation_mtd}\\\",\\\"numbers4\\\": \\\"${carry_over}\\\",\\\"numbers86\\\": \\\"${carry_over_billable}\\\",\\\"numbers7\\\": \\\"${submitted_mtd}\\\",\\\"numbers19\\\": \\\"${accepted}\\\",\\\"numbers034\\\": \\\"${rejected}\\\",\\\"numbers2\\\": \\\"${rejected_rr}\\\",\\\"numbers40\\\": \\\"${rejected_lut}\\\",\\\"numbers71\\\": \\\"${pending_review}\\\",\\\"numbers39\\\": \\\"${pending_enrichment}\\\",\\\"numbers67\\\": \\\"${cq_pending}\\\",\\\"numbers97\\\": \\\"${analytics_in_progress}\\\",\\\"numbers70\\\": \\\"${left_to_deliver}\\\"}") {
                id
            }
        }`;
    
        const response = await axios.post('https://api.monday.com/v2', { query }, { headers });
        console.log(query);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

const updateItem = async(itemID, ID, first_delivery="", final_delivery="", total_allocation=0, total_accepted=0, total_customer_returns=0, net_allocation=0, actual_allocation=0, allocation_mtd=0, carry_over=0, carry_over_billable=0, submitted_mtd=0, accepted=0, rejected=0, rejected_rr=0, rejected_lut=0, pending_review=0, pending_enrichment=0, cq_pending=0, analytics_in_progress=0, left_to_deliver=0) => {
    try {
        const query = `mutation {
            change_multiple_column_values (item_id: ${itemID}, board_id: 5966394921, column_values: "{\\\"id\\\": \\\"${ID}\\\",\\\"date\\\": {\\\"date\\\" : \\\"${first_delivery}\\\"},\\\"date2\\\": {\\\"date\\\" : \\\"${final_delivery}\\\"},\\\"numbers0\\\": \\\"${total_allocation}\\\",\\\"numbers03\\\": \\\"${total_accepted}\\\",\\\"numbers3\\\": \\\"${total_customer_returns}\\\",\\\"numbers8\\\": \\\"${net_allocation}\\\",\\\"numbers6\\\": \\\"${actual_allocation}\\\",\\\"numbers9\\\": \\\"${allocation_mtd}\\\",\\\"numbers4\\\": \\\"${carry_over}\\\",\\\"numbers86\\\": \\\"${carry_over_billable}\\\",\\\"numbers7\\\": \\\"${submitted_mtd}\\\",\\\"numbers19\\\": \\\"${accepted}\\\",\\\"numbers034\\\": \\\"${rejected}\\\",\\\"numbers2\\\": \\\"${rejected_rr}\\\",\\\"numbers40\\\": \\\"${rejected_lut}\\\",\\\"numbers71\\\": \\\"${pending_review}\\\",\\\"numbers39\\\": \\\"${pending_enrichment}\\\",\\\"numbers67\\\": \\\"${cq_pending}\\\",\\\"numbers97\\\": \\\"${analytics_in_progress}\\\",\\\"numbers70\\\": \\\"${left_to_deliver}\\\"}") {
                id
            }
        }`;
    
        const response = await axios.post('https://api.monday.com/v2', { query }, { headers });
        console.log(query);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

const findItemID = async(value) => {
    try {
        const query = `query {
            items_by_column_values (board_id: 5966394921, column_id: "id", column_value: "${value}") {
                id
            }
        }`;
        
        const response = await axios.post('https://api.monday.com/v2', { query }, { headers });
        if (response.data.data.items_by_column_values.length === 0) {
            return null;
        }
        else {
            return response.data.data.items_by_column_values[0].id;
        }
    } catch (err) {
        console.error(err);
    }
};

const dateConverter = async(dateNum) => {
    // Assuming the reference date is December 30, 1899
    const referenceDate = new Date(1899, 11, 30);
    
    // Convert the count of days to a date
    const resultDate = new Date(referenceDate.getTime() + dateNum * 24 * 60 * 60 * 1000);
    
    // Extract date without time and format it
    const resultDateDateOnly = resultDate.toISOString().split('T')[0];
    
    return resultDateDateOnly;
};

module.exports = {
    createItem,
    dateConverter,
    updateItem,
    findItemID,
};