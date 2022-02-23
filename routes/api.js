const express = require("express");
const router = express.Router();
const CovidData = require("../schema/covidData");
const getPerDatePerCountry = require("../functions/getPerDatePerCountry");
const Post = require("../schema/post");
const getDataPerDate = require("../functions/getDataByDate");
const alasql = require("alasql");


router.get('/', async(req, res) => {
    try{ 
        res.json({msg: "Fullstack Challenge 2021 🏅 - Covid Daily Cases"});
    }catch(error) {
        console.error(error);
        return res.status(500).json("Server Error");
    }
});


router.get('/cases/:date/count', async (req, res) => {
    let cases = await CovidData.find().select("variant num_sequences_total date location")
    let casestwo = cases.filter((item)=> item.date === req.params.date)

/*     function groupBy(objectArray, propertyone) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[propertyone];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
    } */


    //let casestree = groupBy(casestwo, 'location')

    var teste = alasql('SELECT location, variant, SUM(num_sequences_total) AS total FROM ? GROUP BY location, variant', [cases]);

    res.json(teste);
    
});



router.get('/cases/:date/cumulative', async (req, res) => {
    CovidData.aggregate(
        [
            {$match: {date: req.params.date}},
            {$group: {_id: [{location: "$location"}, {variant: "$variant"}], num_sequences_total: {$sum: "$num_sequences_total"}}},
        ]
    )
    .then(posts => {
        res.json(posts);
    }).catch(error => {
        return res.status(400).json({
            success: false,
            error: error
        })
    })
});



router.get('/cases', async (req, res) => {
    let cases = await CovidData.find().select("variant num_sequences_total date location");

    var teste = alasql('SELECT location, variant, SUM(num_sequences_total) AS total FROM ? GROUP BY location, variant', [cases]);


    //console.log(res);

    res.json(teste);
    
});





//any route containing :postId, our app will first execute postById()
//router.param("date", getDataPerDate);







module.exports = router;