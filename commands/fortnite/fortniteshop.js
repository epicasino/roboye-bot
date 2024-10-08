const {
  ActionRowBuilder,
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

function bubbleSort(arr, n) {
  let i, j, temp;
  let swapped;
  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j].section.name > arr[j + 1].section.name) {
        // Swap arr[j] and arr[j+1]
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // IF no two elements were
    // swapped by inner loop, then break
    if (swapped == false) break;
  }
  return arr;
}

function splitCategories(arr) {
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

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fortniteshop')
    .setDescription("Gives you the items in today's fortnite shop."),
  async execute(interaction) {
    // interaction.deferReply();
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
        .then((data) => {
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

      const row = new ActionRowBuilder().addComponents(backButton, nextButton);
      const nextRow = new ActionRowBuilder().addComponents(nextButton);
      const backRow = new ActionRowBuilder().addComponents(backButton);

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
    // console.log(fortniteShop);
  },
};
