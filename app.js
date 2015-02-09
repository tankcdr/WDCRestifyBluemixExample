'use strict'

var wdc = require('watson-developer-cloud-alpha'),
    restify = require('restify'),
    server = restify.createServer(),
    question_and_answer_travel = wdc.question_and_answer({
        version: 'v1',
        use_vcap_services: true,
        dataset: 'travel'
    }) 

server.use(restify.fullResponse())
      .use(restify.bodyParser())

server.post('/travel/ask', function(req,res,next) {
	var options = {
		text: req.params.question
	}
	question_and_answer_travel.ask(options, function (err, response) {
		if (err)
			res.send(500,err)
	        else 
			res.send(200,response)

		return res.next();
	})
})

server.listen(process.env.VCAP_APP_PORT,function() {
	console.log('Travel service listening on '+server.url)
})

