require("dotenv").config();
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Gets the current weather")
    .addStringOption((option) =>
      option
        .setName("location")
        .setDescription("City Name, ZIP Code, Lat. & Lon.")
    ),

  async execute(interaction) {
    await interaction.deferReply();
    try {
      const locationString = interaction.options.getString("location", true);
      const userInput = locationString.split(" ").join("%20");
      const apiCall = await fetch(
        `https://api.tomorrow.io/v4/weather/realtime?location=${userInput}&units=imperial&apikey=${process.env.WEATHER_TOKEN}`
      ).then((response) => response.json());

      // console.log(apiCall)

      const weatherEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(`Current Weather in **${apiCall.location.name}**`)
        .addFields(
          {
            name: "Current Temperature",
            value: `${apiCall.data.values.temperature}`,
          },
          // { name: "\u200B", value: "\u200B" },
          {
            name: "Current Humidity",
            value: `${apiCall.data.values.humidity}%`,
            inline: true,
          },
          {
            name: "Chance of Rain",
            value: `${apiCall.data.values.precipitationProbability}%`,
            inline: true,
          },
          {
            name: "UV Index",
            value: `${apiCall.data.values.uvIndex}%`,
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({ text: `Weather Data From ${apiCall.data.time}` });

      return interaction.followUp({ embeds: [weatherEmbed] });
    } catch (error) {
      console.log(error);
      return interaction.followUp(`Something went wrong: ${error}`);
    }

    await interaction.reply("Pong!");
  },
};
