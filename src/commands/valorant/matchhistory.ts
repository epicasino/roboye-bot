import {
  ActionRowBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';
import { RankMMRInfo } from './types/rankMMRInfoTypes';
import { ValorantMatchDataEntity, ValorantMatch } from './types/valMatchTypes';
import { RanksInfo, RanksInfoDataEntity } from './types/ranksInfoTypes';
import { GamemodeInfo } from './types/gamemodeInfoTypes';
import 'dotenv/config';

async function generateEmbed(
  match: ValorantMatchDataEntity,
  playerName: string,
  playerTag: string,
  ranksInfo: RanksInfoDataEntity,
  playerMMR: {
    current: {
      tier: {
        id: number;
        name: string;
      };
    };
  }
) {
  const player = match.players.find(
    (player) => player.name === playerName && player.tag === playerTag
  );

  if (!player) {
    throw 'No Matching Player!';
  }

  const matchLength = match.rounds.length;
  const acs = Math.floor(player.stats.score / matchLength);

  const teamInfo = match.teams.find((team) => team.team_id === player.team_id);
  const agentInfo = await fetch(
    `https://valorant-api.com/v1/agents/${player.agent.id}`
  ).then((res) => res.json());

  const mapInfo = await fetch(
    `https://valorant-api.com/v1/maps/${match.metadata.map.id}`
  ).then((res) => res.json());

  const gamemodeInfo = await fetch(`https://valorant-api.com/v1/gamemodes`)
    .then((res) => res.json())
    .then((gamemodes: GamemodeInfo) =>
      gamemodes.data.find(
        (gamemode) => gamemode.displayName === match.metadata.queue.mode_type
      )
    );

  return {
    color: 0x0099ff,
    title: `${playerName}'s Game on ${new Date(
      match.metadata.started_at
    ).toLocaleDateString()}`,
    url: `https://tracker.gg/valorant/match/${match.metadata.match_id}`,
    author: {
      name: `${player.name}#${player.tag} | ${playerMMR.current.tier.name}`,
      icon_url: ranksInfo.tiers.find(
        (rank) => rank.tier === playerMMR.current.tier.id
      ).largeIcon,
      url: `https://tracker.gg/valorant/profile/riot/${player.name
        .trim()
        .split(' ')
        .join('%20')}%23${player.tag}/overview`,
    },
    thumbnail: {
      url: agentInfo.data.displayIcon,
    },
    fields: [
      {
        name: `**${teamInfo.won ? 'Won' : 'Lost'} Game**`,
        value: `**Score:** \`${teamInfo.rounds.won} / ${teamInfo.rounds.lost}\``,
      },
      {
        name: 'Average Combat Score',
        value: `${playerName}'s ACS is **\`${acs}\`**`,
      },
      { name: 'Kills', value: `\`${player.stats.kills}\``, inline: true },
      {
        name: 'Deaths',
        value: `**\`${player.stats.deaths}\`**`,
        inline: true,
      },
      {
        name: 'Assists',
        value: `\`${player.stats.assists}\``,
        inline: true,
      },
      {
        name: '\u200B',
        value: '**Abilities Used**',
      },
      {
        name: `${agentInfo.data.abilities[2].displayName}`,
        value: `\`${player.ability_casts.grenade}\``,
        inline: true,
      },
      {
        name: `${agentInfo.data.abilities[0].displayName}`,
        value: `\`${player.ability_casts.ability1}\``,
        inline: true,
      },
      {
        name: `${agentInfo.data.abilities[1].displayName}`,
        value: `\`${player.ability_casts.ability2}\``,
        inline: true,
      },
      {
        name: `${agentInfo.data.abilities[3].displayName}`,
        value: `\`${player.ability_casts.ultimate}\``,
        inline: true,
      },
    ],
    image: {
      url: mapInfo.data.listViewIcon,
    },
    footer: {
      text: `Gamemode: ${match.metadata.queue.name}`,
      icon_url: `${gamemodeInfo.displayIcon}`,
    },
  };
  // console.log(gamemodeInfo);
}

class MatchHistoryCommand implements iCommand {
  name = 'match-history';
  description = `Returns a player's last 5 matches.`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('player_name')
        .setDescription('Input Player Name')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('player_tag')
        .setDescription('Input Player Tag')
        .setRequired(true)
    );
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    interaction.deferReply();
    try {
      const playerName = interaction.options.getString('player_name', true);
      const playerTag = interaction.options.getString('player_tag', true);

      const playerMMR = await fetch(
        `https://api.henrikdev.xyz/valorant/v3/mmr/na/pc/chicacongranculo/vane?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data: RankMMRInfo) => {
          return data.data
            ? data.data
            : data.errors[0].status === 404 && {
                current: { tier: { id: 0, name: 'Unrated' } },
              };
        });

      if (!playerMMR) throw 'No Matching Player!';

      // returns last 5 matches
      const playerMatches = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/${playerName
          .trim()
          .split(' ')
          .join('%20')}/${playerTag}?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data: ValorantMatch) => {
          if (data.status === 200) {
            return data.data;
          } else throw `Error code ${data.status}`;
        });

      // gets the last rank episode in array, unsure if thats right or not but we'll see about that
      const ranksInfo = await fetch(
        `https://valorant-api.com/v1/competitivetiers`
      )
        .then((res) => res.json())
        .then((data: RanksInfo) => data.data.pop());

      let matchEmbedArr = [];

      for (let i = 0; i < playerMatches.length; i++) {
        const matchEmbed = await generateEmbed(
          playerMatches[i],
          playerName,
          playerTag,
          ranksInfo,
          playerMMR
        );
        matchEmbedArr.push(matchEmbed);
      }

      // console.log(matchEmbedArr);

      const nextButton = new ButtonBuilder()
        .setCustomId('next')
        .setEmoji('➡️')
        .setStyle(ButtonStyle.Primary);

      const backButton = new ButtonBuilder()
        .setCustomId('back')
        .setEmoji('⬅️')
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        backButton,
        nextButton
      );
      const nextRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        nextButton
      );
      const backRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        backButton
      );

      let currentPage = 0;
      const response = await interaction.followUp({
        embeds: [matchEmbedArr[currentPage]],
        components: [nextRow],
      });

      const collector = response.createMessageComponentCollector({
        filter: (i) => i.user.id === interaction.user.id,
        time: 60_000,
      });

      collector.on('collect', async (i) => {
        if (i.customId === 'next') {
          // console.log('next');
          currentPage++;
          await i.update({
            embeds: [matchEmbedArr[currentPage]],
            components: [
              currentPage === matchEmbedArr.length - 1 ? backRow : row,
            ],
          });
        }
        if (i.customId === 'back') {
          // console.log('back');
          currentPage--;
          await i.update({
            embeds: [matchEmbedArr[currentPage]],
            components: [currentPage === 0 ? nextRow : row],
          });
        }
      });
    } catch (e) {
      console.error(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  }
}

export default new MatchHistoryCommand();
