const mongoose = require('mongoose');

let CovidDataSchema = mongoose.Schema({
    location: {
        type: String,
    },
    date: {
        type: String, 
    },
    variant: {
        type: String,
    },
    num_sequences: {
        type: Number
    },
    perc_sequences: {
        type: Number
    },
    num_sequences_total: {
        type: Number
    }
});


module.exports = mongoose.model("covidData", CovidDataSchema);