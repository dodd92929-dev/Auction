const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const auctionManager = require('../utils/auctionManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('startauction')
    .setDescription('Start the auction in this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channelId = interaction.channel.id;
    const success = auctionManager.startAuction(channelId);
    if (success) {
      await interaction.reply({ content: 'Auction started!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Failed to start auction.', ephemeral: true });
    }
  }
};