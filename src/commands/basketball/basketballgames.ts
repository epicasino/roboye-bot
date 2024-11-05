import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} from 'discord.js';
import { load } from 'cheerio';
import { iCommand } from '../../types/types';

class BasketballGamesCommand implements iCommand {
  name = 'basketball-games';
  description = "Get's stream links for Today's Basketball Games.";
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.deferReply();
    try {
      const websiteHTML = await fetch(
        'https://methstreams.com/nba/live/12/'
      ).then((res) => res.text());
      // console.log(websiteHTML);
      const $ = load(websiteHTML);
      const nbaLinks = $('.btn.btn-default.btn-lg.btn-block')
        .map((i, element) => {
          // console.log(i);
          // removes wnba link, maybe add wnba command later
          if (i === 0) return;
          const textInfo = $(element)
            .text()
            .split('\n')
            .filter((text) => {
              return text.trim().length > 1;
            })
            .map((text) => {
              return text.trim();
            });
          return {
            vs: textInfo[0],
            time: textInfo[1],
            link: $(element).attr('href').trim(),
          };
        })
        .toArray();
      // console.log(nbaLinks);
      const nbaFields = nbaLinks.map((link) => {
        return {
          name: link.time,
          value: `[${link.vs}](${link.link})`,
        };
      });

      const nextButton = new ButtonBuilder()
        .setCustomId('next')
        .setEmoji('➡️')
        .setStyle(ButtonStyle.Primary);

      const backButton = new ButtonBuilder()
        .setCustomId('back')
        .setEmoji('⬅️')
        .setStyle(ButtonStyle.Secondary);

      const nextRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        nextButton
      );
      const backRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
        backButton
      );

      // console.log(nbaFields);

      if (nbaFields.length > 10) {
        try {
          const splitNbaFields: Array<
            {
              name: string;
              value: string;
            }[]
          > = [];
          const halfArrLength = Math.ceil(nbaFields.length / 2);

          splitNbaFields.push(nbaFields.slice(0, halfArrLength));
          splitNbaFields.push(nbaFields.slice(halfArrLength, nbaFields.length));

          const nbaEmbeds = splitNbaFields.map((fieldsArr, i) => {
            return {
              color: 0x0099ff,
              title: `Current/Upcoming Games on ${new Date().toLocaleDateString()}`,
              url: 'https://methstreams.com/nba/live/12/',
              author: {
                name: 'Click for Current NBA Standings (ESPN)',
                icon_url: 'https://cdn-icons-png.flaticon.com/512/54/54366.png',
                url: 'https://www.espn.com/nba/standings',
              },
              thumbnail: {
                url: 'https://methstreams.com/icons/nba.png',
              },
              fields: [{ name: '\u200B', value: '' }].concat(
                fieldsArr.flatMap((obj, index, arr) => {
                  return arr.length - 1 !== index
                    ? [obj, { name: '\u200B', value: '' }]
                    : obj;
                })
              ),
              footer: {
                text: `Page: ${i + 1}`,
              },
            };
          });

          let currentPage = 0;
          const response = await interaction.followUp({
            embeds: [nbaEmbeds[currentPage]],
            components: [nextRow],
          });

          const collector = response.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 60_000,
          });

          collector.on('collect', async (i) => {
            if (i.customId === 'next') {
              currentPage++;
              // console.log(nbaEmbeds[currentPage]);
              await i.update({
                embeds: [nbaEmbeds[currentPage]],
                components: [backRow],
              });
            }
            if (i.customId === 'back') {
              // console.log('back');
              currentPage--;
              await i.update({
                embeds: [nbaEmbeds[currentPage]],
                components: [nextRow],
              });
            }
          });
        } catch (error) {
          console.error(error);
          await interaction.followUp(`Error: ${error}`);
        }
      } else {
        const embed = {
          color: 0x0099ff,
          title: `Current/Upcoming Games on ${new Date().toLocaleDateString()}`,
          url: 'https://methstreams.com/nba/live/12/',
          author: {
            name: 'Click for Current NBA Standings (ESPN)',
            icon_url: 'https://cdn-icons-png.flaticon.com/512/54/54366.png',
            url: 'https://www.espn.com/nba/standings',
          },
          thumbnail: {
            url: 'https://methstreams.com/icons/nba.png',
          },
          fields: [{ name: '\u200B', value: '' }].concat(
            nbaFields.flatMap((obj, index, arr) => {
              return arr.length - 1 !== index
                ? [obj, { name: '\u200B', value: '' }]
                : obj;
            })
          ),
        };
        await interaction.followUp({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);
      await interaction.followUp(`Error: ${error}`);
    }
  }
}

export default new BasketballGamesCommand();
