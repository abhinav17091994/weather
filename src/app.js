const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode =require('./utils/geocode');
const forecast =require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public')); // modified path to get access of public dir
// Define paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)); // express.static() returning its value 'use'

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name : 'Andrew Mead'
    }) // will directly refer to views folder
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name : 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext:  'We are ready to help.',
        name : 'Andrew Mead'
    })
})

app.get('/help/*', (req, res) => {
    //res.send('This page doesn\'t exist');
    res.render('404', {
        title: '404 Help',
        errorMessage:  'Help article not found.',
        name : 'Andrew Mead'
    })
})


app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.json({
            'error': 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, logitude, loaction } = {}) => {
        if(error)
            return res.send({error});

        forecast(latitude, logitude, (error, forecastData) => {
            if(error)
                return res.send({error});
            res.send({
                forecast: forecastData,
                loaction,
                address: req.query.address
            }); 
        });
    });
    // res.send({
    //     forecast: 'Weather looks good',
    //     loaction : 'India',
    //     address: req.query.address
    // }); 
});


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.json({ 'error': 'You must provide a search term'})
    }
    
    console.log(req.query);
    res.send({
        products:[]
    });
    // res.render('404', {
    //     title: '404 Help',
    //     errorMessage:  'Help article not found.',
    //     name : 'Andrew Mead'
    // })
})


app.get('*', (req, res) => {
    //res.send('This page doesn\'t exist');
    res.render('404', {
        title: '404',
        errorMessage:  'Page Not Found .',
        name : 'Andrew Mead'
    })
})


// app.get('', (req, res)=>{
//     res.send(' <h1> Hello Express!!! </h1>');
// });

// app.get('/help', (req, res)=>{
//     //res.send(' Hello Page!!! ');
//     res.send({name:'Andrew', age:27}); //returns stringify version to html {"name": "Andrew", "age": 27 }
// });

// app.get('/about', (req, res)=>{
//     res.send(' About Page!!! ');
// });

app.get('/weather', (req, res)=>{
    //res.send(' Your Weather!!! ');
    res.send({forecast: "It is snowing", loaction : "Philadelphia"});
});

app.listen(3000, ()=>{
    console.log("Server is up on port 3000");
});