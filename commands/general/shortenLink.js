const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shorten-link")
    .setDescription("Shorten Long Links")
    .addStringOption((option) =>
      option.setName("query").setDescription("Input URL").setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    try {
      const userURL = interaction.options.getString("query", true);
      const apiCall = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${userURL}`
      ).then((response) => response.json());
      // console.log(apiCall);

      const shortLinkEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Here's your shortened link!`)
        .addFields(
          {
            name: "Shortened URL",
            value: `${apiCall.result.full_short_link}`,
          }
          // { name: "\u200B", value: "\u200B" },
        )
        .setTimestamp()
        .setFooter({ text: `https://shrtco.de/` });

      return interaction.followUp({ embeds: [shortLinkEmbed] });
    } catch (error) {
      console.log(error);
      return interaction.followUp(`Oops! Something went wrong. ${error}`);
    }
  },
};
