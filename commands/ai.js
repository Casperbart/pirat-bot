const https = require('https')

module.exports = {
    name: 'ai',
    aliases: [''],
    description: "ai kommando",
    requireArgs: false,
    usage: "",
    execute(msg, args) {
        var preservedArgs = [...args].length > 0 ? [...args].join(' ') : ""
        console.log(`Preserved args: ${preservedArgs}`);

        const data = JSON.stringify({
            question: preservedArgs
        });
        
          
        const key = process.env.EndpointKey;

        const options = {
            hostname: 'pirat-bot-qna.azurewebsites.net',
            path: '/qnamaker/knowledgebases/2d9bea7f-54e8-4386-ae42-e4e36ddc7dd5/generateAnswer',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `EndpointKey ${key}`
            }
        }
          
        const req = https.request(options, res => {
            var str = '';
            var answer = '';
            var score = 0.0;
            const sorryMsg = 'Beklager, jeg kan ikke svare på dit spørgsmål 🤖'
            
            res.on('data', d => {
              str += d;
            });

            res.on('end', function () {
                console.log(str);

                var parsed = JSON.parse(str);
                if(parsed && parsed.answers && parsed.answers.length > 0 ) {
                    var firstResponse = parsed.answers[0];
                    console.log(firstResponse)
                    answer = JSON.stringify(firstResponse.answer);
                    score = firstResponse.score;

                    msg.channel.send(`${answer}.\n\n Score ${score} 🤖`);
                } else {
                    msg.channel.send(sorryMsg);
                }
            });
        })
        
        req.on('error', error => {
            console.error(error)
            msg.channel.send(sorryMsg);
        })
          
          req.write(data)
          req.end()
        
        //msg.channel.send(exampleEmbed);
    }
};