const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('divorce-papers')
    .setDescription('Whenever someone wants to get a divorce'),
  async execute(interaction) {
    const divorceEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Divorce Papers`)
      .setURL(
        `https://www.dochub.com/fillable-form/32077-california-divorce-papers`
      )
      .setImage(
        'https://cdn.discordapp.com/attachments/902415144670351373/1290571147632447530/divorce_papers.png?ex=66fcf18b&is=66fba00b&hm=a5ca7ef8ce3aaa69796a100f39b700361091f518d67e60d39a8aa6660cfd5e34&'
      );

    await interaction.reply({ embeds: [divorceEmbed] });
  },
};
