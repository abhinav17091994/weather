////******* Weather Forecasting while using concept of callbacks **********// 


const request = require('request');
const forecast = (latitude, longitude, cb) => {
    const url = 'https://api.darksky.net/forecast/96c11eeb692ff1abd76493659859b0f3/'+ latitude + ',' + longitude +'?units=us';

    request({url, json : true},(err , {body})=>{
        if(err)
        cb('Unable to connect to loaction service', undefined);
        else if (body.error)
            cb('Unable to find forecast. Try another search!! ', undefined);
        else 
            cb(undefined, {temperature : body.currently.temperature, precipitationPraobability: body.currently.precipProbability});        
    });
}


module.exports = forecast;
