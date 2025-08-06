const config = require('./config');
const bot = require('../bot');

module.exports = {
  async logAuctionCreated(channel, user, item, duration) {
    try {
      const logChannel = channel.guild.channels.cache.get(config.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`[AUCTION CREATED] Channel: ${channel.name} | Creator: ${user.tag} | Item: "${item}" | Duration: ${duration}min`);
      }
    } catch (e) { /* fail silently */ }
  },

  async logAuctionStarted(channelId, item) {
    try {
      const guild = bot.guilds.cache.first();
      const logChannel = guild.channels.cache.get(config.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`[AUCTION STARTED] Auction Channel: <#${channelId}> | Item: "${item}"`);
      }
    } catch (e) { }
  },

  async logAuctionEnded(channelId, item) {
    try {
      const guild = bot.guilds.cache.first();
      const logChannel = guild.channels.cache.get(config.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`[AUCTION ENDED] Auction Channel: <#${channelId}> | Item: "${item}"`);
      }
    } catch (e) { }
  },

  async logBidPlaced(channelId, userId, amount) {
    try {
      const guild = bot.guilds.cache.first();
      const logChannel = guild.channels.cache.get(config.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`[BID] Auction: <#${channelId}> | User: <@${userId}> | Amount: ${amount}`);
      }
    } catch (e) { }
  },

  async logAuctionWinner(channelId, userId, amount) {
    try {
      const guild = bot.guilds.cache.first();
      const logChannel = guild.channels.cache.get(config.LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`[WINNER] Auction: <#${channelId}> | Winner: <@${userId}> | Amount: ${amount}`);
      }
    } catch (e) { }
  }
};