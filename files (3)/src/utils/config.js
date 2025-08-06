module.exports = {
  BIDDERS_ROLE: process.env.BIDDERS_ROLE || 'Bidders',
  LOG_CHANNEL_ID: process.env.LOG_CHANNEL_ID,
  BID_RATE_LIMIT: 5000 // ms between bids per user per auction
};