const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const auctionManager = require('../utils/auctionManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pickwinner')
    .setDescription('Pick the winner of the auction in this channel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const channelId = interaction.channel.id;
    const winner = auctionManager.pickWinner(channelId);
    if (!winner) {
      await interaction.reply({ content: 'No bids placed.', ephemeral: true });
    } else {
      await interaction.reply({ content: `Winner: <@${winner.userId}> with a bid of ${winner.amount}.`, ephemeral: false });
    }
  }
};