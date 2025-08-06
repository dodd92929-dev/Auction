const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const auctionManager = require('../utils/auctionManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('createauction')
    .setDescription('Create a new auction channel')
    .addStringOption(opt =>
      opt.setName('item').setDescription('Item to auction').setRequired(true)
    )
    .addIntegerOption(opt =>
      opt.setName('duration').setDescription('Duration (minutes)').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const item = interaction.options.getString('item');
    const duration = interaction.options.getInteger('duration');
    await auctionManager.createAuction(interaction, { duration, item });
    await interaction.reply({ content: `Auction channel created for "${item}".`, ephemeral: true });
  }
};