import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { RoundsEntity, ValorantMatch } from './types/valMatchTypes';
import { iCommand } from '../../types/types';
import { AgentInfo } from './types/agentInfoTypes';
import 'dotenv/config';

function neededKills(
  won: boolean,
  team: string,
  rounds: RoundsEntity[],
  playerName: string
) {
  if (!won) {
    let neededKills = 0;
    // to calculate needed kills: in latestMatch.rounds, array of rounds
    // loop through rounds array, only select rounds where player lost (check with the rounds[i].winning_team property)
    const roundsLost = rounds.filter((round) => {
      return round.winning_team !== team;
    });
    roundsLost.forEach((round) => {
      const teamPlayers = round.stats.filter((player) => {
        return player.player.team === team;
      });
      // console.log(teamPlayers.length);
      const totalTeamRoundKills = teamPlayers.reduce((accum, curr, index) => {
        if (accum !== curr.stats.kills) return accum + curr.stats.kills;
      }, teamPlayers[0].stats.kills);

      switch (round.result) {
        case 'Elimination':
          switch (totalTeamRoundKills) {
            // if team lost in round by elimination or defuse, but team had 5 total kills that means someone was res'd, we would subtract 6 by total team kills
            case 5:
              neededKills += 6 - totalTeamRoundKills;
              break;
            // special case, if team loses by elimination or defuse, enemy clove ults gets a pick, then dies, then sage res' her back. subtract by 7 by total team kills
            case 6:
              neededKills += 7 - totalTeamRoundKills;
              break;
            // else for each round lost, subtract 5 by total team kills
            default:
              neededKills += 5 - totalTeamRoundKills;
          }
          break;
        case 'Defuse':
          switch (totalTeamRoundKills) {
            // if team lost in round by elimination or defuse, but team had 5 total kills that means someone was res'd, we would subtract 6 by total team kills
            case 5:
              neededKills += 6 - totalTeamRoundKills;
              break;
            // special case, if team loses by elimination or defuse, enemy clove ults gets a pick, then dies, then sage res' her back. subtract by 7 by total team kills
            case 6:
              neededKills += 7 - totalTeamRoundKills;
              break;
            // else for each round lost, subtract 5 by total team kills
            default:
              neededKills += 5 - totalTeamRoundKills;
          }
          break;
        case 'Detonate':
          // because the bomb detonated, we need to check through end-of-round player locations
          // check to see remaining alive players after detonation that are not on the user's team
          const remainingEnemies = round.plant.player_locations.filter(
            (playerLocation) => playerLocation.player.team !== team
          ).length;
          neededKills += remainingEnemies;
      }
    });
    return `${playerName} needs ${neededKills} kills to win the match.`;
  } else return `${playerName} won the match!`;
}

class HowManyMoreKillsCommand implements iCommand {
  name = 'how-many-more-kills';
  description = 'How many more kills a player needed to win a Valorant game.';
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

      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/${playerName
          .trim()
          .split(' ')
          .join('%20')}/${playerTag}?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data: ValorantMatch) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      const player = latestMatch.players.find(
        (player) => player.name === playerName && player.tag === playerTag
      );

      if (!player) {
        throw 'No Matching Player!';
      }

      const teamInfo = latestMatch.teams.find(
        (team) => team.team_id === player.team_id
      );

      const matchEmbed = {
        color: 0x0099ff,
        title: `${playerName}'s Game on ${new Date(
          latestMatch.metadata.started_at
        ).toLocaleDateString()}`,
        url: `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`,
        author: {
          name: `${player.name}#${player.tag}`,
          url: `https://tracker.gg/valorant/profile/riot/${player.name
            .trim()
            .split(' ')
            .join('%20')}%23${player.tag}/overview`,
        },
        fields: [
          {
            name: neededKills(
              teamInfo.won,
              player.team_id,
              latestMatch.rounds,
              player.name
            ),
            value: '',
          },
        ],
      };

      // dont know why this is here, but okay
      const agentInfo: AgentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${player.agent.id}`
      ).then((res) => res.json());

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      console.error(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  }
}

export default new HowManyMoreKillsCommand();
