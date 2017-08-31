var request = require('request');

var arrGoodRate = [];
var idStavki = 0;
setInterval(function(){

	request({"rejectUnauthorized": false,"url": 'https://btcbet.cc/api/public/'}, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body:', body);
	  if(response)
	  {

		  if (Object.keys(body).length != 0) {
			    
			  var des = JSON.parse( body );
			  console.log('ID:', des.id); // Print the error if one occurred 
			  console.log('GoodRate:', arrGoodRate); // Print the error if one occurred 
			  if(Math.abs(des.base_price - des.last_price) > 13)
			  {
			  	if(arrGoodRate.indexOf(des.id) == -1)
			  	{
					arrGoodRate.push(des.id);
				}
				  var time_from = des.period_from;
				  var time_until = des.period_until;

				  var date_from = new Date(time_from);
				  var date_until = new Date(time_until);

				  time_from = ((((date_from.getHours() < 10 ? '0' : '' ) + date_from.getHours().toString())) + ':' + (((date_from.getMinutes() < 10 ? '0' : '' ) + date_from.getMinutes().toString())));
				  time_until = ((((date_until.getHours() < 10 ? '0' : '' ) + date_until.getHours().toString())) + ':' + (((date_until.getMinutes() < 10 ? '0' : '' ) + date_until.getMinutes().toString())));

				  var time = time_from + '-' + time_until;

				  var formData = {
				  	// Pass a simple key-value pair 
				  	idStavki: des.id,
				  	base: des.base_price,
				 	last:  des.last_price,
					vremya:  time,
					datevremya:  des.date
				  }

				  request.post({url: 'http://yiihaa.ru/index3.php/', formData: formData}, function (err, res, b) {
				  	console.log('err:', error); // Print the error if one occurred 
				    console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received 
				    console.log('b:', body); // Print the HTML for the Google homepage. 
				    console.log('formData:', formData);
				  });
			  }
			}else{console.log('пуст');}

	  }
	})
}, 5000);

setInterval(function(){
	if(arrGoodRate.length>0)
	{
		request({"rejectUnauthorized": false,"url": 'https://btcbet.cc/api/public/' + arrGoodRate[0] + '/'}, function (error, respone, body) {
			    var des2 = JSON.parse( body );
			    if(!des2.open)
			    {
			    	var goodRate = arrGoodRate.shift();
			    	var last_price = 0;
			    	last_price = des2.last_price;
			    	if(parseFloat(des2.base_price) < parseFloat(des2.last_price))
			    	{
			    		last_price = String.fromCharCode(8593) + des2.last_price;
			    	}
			    	if(parseFloat(des2.base_price) > parseFloat(des2.last_price))
			    	{
			    		last_price = String.fromCharCode(8595) + des2.last_price;
			    	}
			    	var formData = {
					  	// Pass a simple key-value pair 
					  	idStavki: goodRate,
					 	info: last_price
					  }
			    	request.post({url: 'http://yiihaa.ru/index4.php/', formData: formData}, function (err, res, b) {
					  	console.log('err:', error); // Print the error if one occurred 
					    console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received 
					    console.log('b:', body); // Print the HTML for the Google homepage. 
				  });
			    }
		});
	}
}, 60000)
