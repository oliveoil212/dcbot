const request = require("request")
const dotenv = require("dotenv").config()
const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('weather').setDescription('Replies with server info!')
	.addStringOption(option =>
		option.setName('location')
			.setDescription('choose the location')
			.setRequired(true)
			.addChoices(
				{ name: '嘉義縣', value: '0' },
				{ name: '新北市', value: '1' },
				{ name: '嘉義市', value: '2' },
				{ name: '新竹縣', value: '3' },
				{ name: '新竹市', value: '4' },
				{ name: '臺北市', value: '5' },
				{ name: '臺南市', value: '6' },
				{ name: '宜蘭縣', value: '7' },
				{ name: '苗栗縣', value: '8' },
				{ name: '雲林縣', value: '9' },
				{ name: '花蓮縣', value: '10'},
				{ name: '臺中市', value: '11'},
				{ name: '臺東縣', value: '12'},
				{ name: '桃園市', value: '13'},
				{ name: '南投縣', value: '14'},
				{ name: '高雄市', value: '15'},
				{ name: '金門縣', value: '16'},
				{ name: '屏東縣', value: '17'},
				{ name: '基隆市', value: '18'},
				{ name: '澎湖縣', value: '19'},
				{ name: '彰化縣', value: '20'},
				{ name: '連江縣', value: '21'},
			)),
	async execute(interaction) {
	const choicevalue = parseInt(interaction.options.getString('location'), 10);
        const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-D1F0B04F-4716-49F7-B959-D170381442E1`
        const eb = new EmbedBuilder()
  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
  const locationName = myJson.records.location.at(choicevalue).locationName
  eb.setTitle(`${locationName} 今日天氣預報`)
    return myJson.records.location.at(choicevalue).weatherElement
  })	.then(data => {
  		data.forEach(element => {
      const dict = {'Wx':'天氣現象','MaxT':'最高溫度','MinT':'最低溫度','CI':'舒適度','PoP':'降雨機率'}
      const type = element.elementName
      const tyepName = dict[type];
      const dvalue = element.time[0].parameter.parameterName
      const dunit = element.time[0].parameter.parameterUnit ?? ' '
      const nvalue = element.time[1].parameter.parameterName
      const nunit = element.time[1].parameter.parameterUnit ?? ' '
      eb.addFields({ name: `${tyepName}`, value: `白天 ${dvalue} ${dunit} 晚上 ${nvalue} ${nunit}` })
			console.log(`${type} 白天  ${dvalue} ${dunit} 晚上 ${nvalue} ${nunit}`)
    })
     interaction.reply({ embeds: [eb]})
	})
	

}
};
