const Utils = require('./utils');

const sendPaymentRequestToApi = (totalAmount, totalShipping) => {
  const ttlCost = Utils.calculateNumber('SUM', totalAmount, totalShipping);
  console.log(`The total is: ${ttlCost}`);
};

module.exports = sendPaymentRequestToApi;
