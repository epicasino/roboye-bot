const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shorten-link')
    .setDescription('Shorten Long Links')
    .addStringOption((option) =>
      option.setName('query').setDescription('Input URL').setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    try {
      const userURL = interaction.options.getString('query', true);
      // console.log(userURL);

      const apiCall = await fetch(`https://spoo.me?url=${userURL}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
      }).then((response) => response.json());
      // console.log(apiCall);

      const shortLinkEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Here's your shortened link!`)
        .addFields(
          {
            name: 'Shortened URL',
            value: `${apiCall.short_url}`,
          }
          // { name: "\u200B", value: "\u200B" },
        )
        .setTimestamp()
        .setFooter({ text: `https://spoo.me` });

      return interaction.followUp({ embeds: [shortLinkEmbed] });
    } catch (error) {
      console.log(error);
      return interaction.followUp(`Oops! Something went wrong. ${error}`);
    }
  },
};
