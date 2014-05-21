var data = require('ripple-gateway-data-sequelize');
var getHostedAddress = require(__dirname+'/get_hosted_address.js');
var config = require(__dirname+'/../../config/config.js');

/**
* Record incoming payment
*
* @param {integer} destinationTag
* @param {string} currency
* @param {decimal} amount 
* @param {string} state 
* @param {string} hash 
* @param {function(err, deposit)} callback
* @returns {Payment}
*/

function recordIncomingPayment(opts, fn) {
  getHostedAddress(opts.destinationTag, function(err, address) {
    if (err && fn) { fn(err, null); return; };
    data.rippleTransactions.create({
        to_amount: opts.amount,
        to_currency: opts.currency,
        to_issuer: config.get('COLD_WALLET'),
        to_amount: opts.amount,
        to_currency: opts.currency,
        to_issuer: config.get('COLD_WALLET'),
        from_address_id: address.id,
        to_address_id: '0',
        transaction_state: opts.transaction_state,
        state: opts.state,
        transaction_hash: opts.hash
      }, function(err, rippleTransaction) {
        if (fn) {
          if (err) { fn(err, null); return; };
          fn(null, rippleTransaction);
        }
    });
  });
};

module.exports = recordIncomingPayment;
