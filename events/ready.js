const { EmbedBuilder } = require('discord.js');
module.exports = {
	name: 'ready',
	once: true,
	
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		//setInterval(function(){ console.log(`Ready! Logged in as ${client.user.tag}`); }, 1000000);
		setInterval(
		() => {
		    request({
			url: "https://www.ptt.cc/bbs/C_Chat/index.html",
			method: "GET"
		    }, (error, res, body) => {
			// 如果有錯誤訊息，或沒有 body(內容)，就 return
			if (error || !body) {
			    return;
			}
			const current = new Date();
			const hour = current.getHours();
			const day = current.getDate();
			
			const month = current.getMonth()+1;
			
			const nowdate= `${month}/${day}`;
			const home = 'https://www.ptt.cc/'
			const data = [];
			const $ = cheerio.load(body); // 載入 body
			const list = $(".r-list-container .r-ent");
			for (let i = 0; i < list.length; i++) {
			    const title = list.eq(i).find('.title a').text();
			    const author = list.eq(i).find('.meta .author').text();
			    const date = list.eq(i).find('.meta .date').text();
			    const link = list.eq(i).find('.title a').attr('href');
			    const  like = list.eq(i).find('div.nrec > span').text();
			    	//console.log(`${date}      ${nowdate}`);
				if( date.indexOf(nowdate) != -1)
			    		data.push({ title, author, date, link, like});
			}
			//console.log(data);
			
			for (let i = 0; i < data.length; i++){
				//console.log(i); 
				const apost = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(`${data[i].title} `)
				.setURL(`${home}${data[i].link} `)
				.setAuthor({name:`${data[i].author} `})
				.setDescription(`推噓${data[i].like} \r\n日期${data[i].date} `)
				client.channels.cache.get(`1007710514337550377`).send({ embeds: [apost] });
			
			}
			
			//console.log(data.length);	
			const textdata =JSON.stringify(data,null,2);
			//console.log(textdata);
			//client.channels.cache.get(`1007032702874169386`).send(textdata);
			
		    })
}
		
		
		, 3600000);
	}
};
const request = require("request");
const cheerio = require("cheerio");
const pttCrawler = () => {
    request({
        url: "https://www.ptt.cc/bbs/Stock/index.html",
        method: "GET"
    }, (error, res, body) => {
        // 如果有錯誤訊息，或沒有 body(內容)，就 return
        if (error || !body) {
            return;
        }

        const data = [];
        const $ = cheerio.load(body); // 載入 body
        const list = $(".r-list-container .r-ent");
        for (let i = 0; i < list.length; i++) {
            const title = list.eq(i).find('.title a').text();
            const author = list.eq(i).find('.meta .author').text();
            const date = list.eq(i).find('.meta .date').text();
            const link = list.eq(i).find('.title a').attr('href');

            data.push({ title, author, date, link });
        }

        //client.channels.cache.get(`1006401735281090620`).send(`Test`);
    });
};
