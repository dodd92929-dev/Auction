const { PermissionsBitField } = require('discord.js');
const config = require('./config');
const logger = require('./logger');

// In-memory store for demo. Use a DB for production!
const auctions = {};

module.exports = {
  async createAuction(interaction, { duration, item }) {
    const guild = interaction.guild;
    const biddersRole = guild.roles.cache.find(r => r.name === config.BIDDERS_ROLE);
    const channelName = `auction-${interaction.user.username}-${item.replace(/\s+/g, '-')}`.toLowerCase();

    const channel = await guild.channels.create({
      name: channelName,
      type: 0, // GUILD_TEXT
      permissionOverwrites: [
        { id: guild.id, allow: [PermissionsBitField.Flags.ViewChannel], deny: [PermissionsBitField.Flags.SendMessages] },
        { id: biddersRole.id, allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel] }
      ],
    });

    auctions[channel.id] = {
      item,
      duration,
      creator: interaction.user.id,
      channelId: channel.id,
      status: 'pending',
      bids: [],
      bidRateLimits: {}, // userId: lastBidTimestamp
    };

    logger.logAuctionCreated(channel, interaction.user, item, duration);
    await channel.send(`Auction for "${item}" created! Admin will start the bid soon. Duration: ${duration} min.`);
  },

  startAuction(channelId) {
    if (!auctions[channelId]) return false;
    auctions[channelId].status = 'active';
    auctions[channelId].startedAt = Date.now();
    auctions[channelId].endsAt = Date.now() + auctions[channelId].duration * 60 * 1000;
    logger.logAuctionStarted(channelId, auctions[channelId].item);
    return true;
  },

  endAuction(channelId) {
    if (!auctions[channelId]) return false;
    auctions[channelId].status = 'ended';
    logger.logAuctionEnded(channelId, auctions[channelId].item);
    return true;
  },

  canBid(channelId, userId) {
    const auction = auctions[channelId];
    if (!auction || auction.status !== 'active') return false;
    const now = Date.now();
    const lastBid = auction.bidRateLimits[userId] || 0;
    if (now - lastBid < (config.BID_RATE_LIMIT || 5000)) {
      return false; // Rate limited
    }
    auction.bidRateLimits[userId] = now;
    return true;
  },

  placeBid(channelId, userId, amount) {
    if (!this.canBid(channelId, userId)) return { success: false, error: 'Rate limited or auction not active' };
    auctions[channelId].bids.push({ userId, amount, timestamp: Date.now() });
    logger.logBidPlaced(channelId, userId, amount);
    return { success: true };
  },

  getAuction(channelId) {
    return auctions[channelId];
  },

  listAuctions() {
    return Object.values(auctions);
  },

  pickWinner(channelId) {
    const auction = auctions[channelId];
    if (!auction || auction.bids.length === 0) return null;
    auction.bids.sort((a, b) => b.amount - a.amount);
    const winner = auction.bids[0];
    logger.logAuctionWinner(channelId, winner.userId, winner.amount);
    return winner;
  }
};