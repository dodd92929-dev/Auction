const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const auctionManager = require('../utils/auctionManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('endauction')
    .setDescription('End the auction in this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channelId = interaction.channel.id;
    const success = auctionManager.endAuction(channelId);
    if (success) {
      await interaction.reply({ content: 'Auction ended!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Failed to end auction.', ephemeral: true });
    }
  }
};