const { SlashCommandBuilder } = require('discord.js');
const auctionManager = require('../utils/auctionManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bid')
    .setDescription('Place a bid in an active auction')
    .addIntegerOption(opt =>
      opt.setName('amount').setDescription('Your bid amount').setRequired(true)
    ),
  async execute(interaction) {
    const channelId = interaction.channel.id;
    const userId = interaction.user.id;
    const amount = interaction.options.getInteger('amount');

    const auction = auctionManager.getAuction(channelId);
    if (!auction || auction.status !== 'active') {
      return await interaction.reply({ content: 'No active auction in this channel.', ephemeral: true });
    }

    const result = auctionManager.placeBid(channelId, userId, amount);
    if (!result.success) {
      return await interaction.reply({ content: result.error, ephemeral: true });
    }

    await interaction.reply({ content: `Your bid of ${amount} has been placed.`, ephemeral: true });
  }
};