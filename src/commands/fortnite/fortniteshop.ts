import {
  ActionRowBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';
import { FortniteShopInfo, ShopEntity } from './types/fortniteShopInfoTypes';
import 'dotenv/config';

function splitCategories(arr: ShopEntity[]) {
  let tmpArr = [];
  const sectionCatArr = arr.map((element) => {
    return element.section.name;
  });
  const unique = [...new Set(sectionCatArr)];
  // console.log(unique);
  unique.forEach((term) =>
    tmpArr.push({
      name: term,
      array: arr.filter((item) => {
        return term === item.section.name;
      }),
    })
  );
  return tmpArr;
  // console.log(unique.length);
  // console.log(tmpArr.length);
}

class FortniteShopCommand implements iCommand {
  name = 'fortnite-shop';
  description = "Gives you the items in today's fortnite shop.";
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    try {
      const fortniteShop = await fetch(
        `https://fortniteapi.io/v2/shop?lang=en`,
        {
          headers: {
            Authorization: process.env.FN_TOKEN,
          },
        }
      )
        .then((res) => res.json())
        .then((data: FortniteShopInfo) => {
          // filter out songs
          const filteredShop = data.shop.filter((item) => {
            return item.displayType !== 'Music';
          });
          // const sortedShop = bubbleSort(filteredShop, filteredShop.length);
          const splitShop = splitCategories(filteredShop);
          return { date: data.lastUpdate.date, shop: splitShop };
        });

      // console.log(fortniteShop.shop);

      let embededShopItems = [];
      fortniteShop.shop.forEach((category) => {
        const parsedItems = category.array.map((item) => {
          // console.log(item);
          return {
            name: item.displayName,
            value: item.displayDescription,
          };
        });
        // console.log(parsedItems.length);
        embededShopItems.push({
          color: 0x0099ff,
          title: category.name,
          description: `Fortnite Shop on ${new Date(
            fortniteShop.date
          ).toLocaleDateString()}`,
          fields: parsedItems,
        });
      });

      for (let i = 0; i < embededShopItems.length; i++) {
        if (embededShopItems[i].fields.length > 25) {
          // console.log(embededShopItems[i]);
          let tmp = embededShopItems[i].fields.slice(0, 24);
          embededShopItems[i].fields.splice(0, 24);
          embededShopItems.splice(i, 0, {
            color: 0x0099ff,
            title: embededShopItems[i].title,
            description: `Fortnite Shop on ${new Date(
              fortniteShop.date
            ).toLocaleDateString()}`,
            fields: tmp,
          });
        }
      }

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
      // console.log(embededShopItems.length);
      const response = await interaction.reply({
        embeds: [embededShopItems[currentPage]],
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
            embeds: [embededShopItems[currentPage]],
            components: [
              currentPage === embededShopItems.length - 1 ? backRow : row,
            ],
          });
        }
        if (i.customId === 'back') {
          // console.log('back');
          currentPage--;
          await i.update({
            embeds: [embededShopItems[currentPage]],
            components: [currentPage === 0 ? nextRow : row],
          });
        }
      });
      // console.log(fortniteShop);
    } catch (e) {
      console.error(e);
      return interaction.reply(`Something went wrong: ${e}`);
    }
  }
}

export default new FortniteShopCommand();
