const CovidData = require("./../schema/covidData");

module.exports = (req, res, next, date) => {
    //console.log(date);
    const teste = CovidData.find();
    //const testedois = teste.filter((item) => item.date === date)
    console.log(teste);

};