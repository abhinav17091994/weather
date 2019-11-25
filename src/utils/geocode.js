//******* GeoCoding while using concept of callbacks **********// 

const request = require('request');

const geoCode = (address, cb) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWJoaW5hdjE3MDkiLCJhIjoiY2p4enl3ZTEyMDhhYzNuanpwdG1nNTQ5bCJ9.dI3O6Y_PTA_rQ5xmGhbYnA&limit=1'

    request({ url, json : true}, (err , {body} )=>{  // {body} :  destructured property
        if(err) 
            cb('Unable to connect to loaction service', undefined);
        else if (body.features.length === 0)
            cb('Unable to find location. Try another search!! ', undefined);
        else
            cb(undefined, {latitude: body.features[0].center[1], longitude :body.features[0].center[0], location: body.features[0].place_name });
    });
}

module.exports = geoCode;
   