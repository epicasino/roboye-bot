const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('recentscore')
    .setDescription("Returns a player's latest Valorant score.")
    .addStringOption((option) =>
      option
        .setName('player_name')
        .setDescription('Input Player Name')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('player_tag')
        .setDescription('Input Player Name')
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.deferReply();
    try {
      const playerName = interaction.options.getString('player_name', true);
      const playerTag = interaction.options.getString('player_tag', true);

      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/${playerName}/${playerTag}?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      // console.log(latestMatch);

      const player = latestMatch.players.find(
        (player) => player.name === playerName && player.tag === playerTag
      );

      if (!player) {
        throw 'No Matching Player!';
      }

      // console.log(player);

      const matchLength = latestMatch.rounds.length;
      const acs = Math.floor(player.stats.score / matchLength);

      const agentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${player.agent.id}`
      ).then((res) => res.json());

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `${playerName}'s Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()} at ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleTimeString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: 'Average Combat Score',
            value: `${playerName}'s ACS is **${acs}**`,
          },
          { name: 'Kills', value: `${player.stats.kills}`, inline: true },
          {
            name: 'Deaths',
            value: `**${player.stats.deaths}**`,
            inline: true,
          },
          { name: 'Assists', value: `${player.stats.assists}`, inline: true }
        );

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};

// https://api.henrikdev.xyz/valorant/v4/matches/na/pc/chicacongranculo/vane?api_key=process.env.VAL_TOKEN

// chicacongranculo;
