import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux'; 
import { getCount, getAll } from './../redux/actions/covidActions';
import countries from './../data/countriesTwo.json'
import axios from 'axios';
import { MapContainer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./GlobalMap.css";
import 'bootstrap/dist/css/bootstrap.css';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { SpinnerCircular } from 'spinners-react';



function GlobalMap({ count, center, zoom}) {
    const dispatch = useDispatch();
    const [ covidData, setCovidData ] = useState([]);
    const[ error, setError ] = useState("");
    const [content, setContent] = useState("");
    const [allCountries, setAllCountries] = useState([]);
    const [allData, setAllData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(Date());
    const [countData, setCountData] = useState([]);


    
    
    useEffect(() => {
        setAllCountries(countries.features);


        if(selectedDate !== undefined) {
            axios.get(`http://localhost:5000/api/covid/cases/${selectedDate}/count`)
            .then((res) => {
                setCountData(res.data)
            })
        } else {
            axios.get(`http://localhost:5000/api/covid/cases`)
            .then((res) => {
                setAllData(res.data)
            })
        }


        function loopOverData(allCountries, allData) {
            console.log(allCountries);
            console.log(allData)
            const data = []
            for(let i = 0; i< allCountries.length; i++){
                const mapCountry = allCountries[i];
                const covidCountry = allData.find((pais) => pais.location === allCountries[i].properties.ADMIN);
                console.log(covidCountry);
                console.log(mapCountry);
                
                mapCountry.properties.confirmed = 0;
                mapCountry.properties.confirmedText = "0";
                mapCountry.properties.variant = "0";
    
                if(covidCountry !== undefined){
                    const confirmed = Number(covidCountry.total);
                    const variantType = covidCountry.variant;
                    mapCountry.properties.confirmed = confirmed;
                    mapCountry.properties.confirmedText = confirmed;
                    mapCountry.properties.variant = variantType;
    
    
                    data.push(mapCountry);
                } 
    
            } 
    
            console.log(data);
            
            setCovidData(data)
    
        }
    
        if(countData.length > 0){
            loopOverData(allCountries, countData);
            console.log("HELLO");
        } 
        if(allData.length > 0){
            loopOverData(allCountries, allData);
            console.log("OLÁAAAA");
        }
    

        
    }, [allData, allCountries, countData, selectedDate]);

    console.log(allData);


    console.log(allCountries)

    console.log(countData);



    const mapStyle = {
        fillColor: "white",
        weigth: 1,
        color: "black",
        fillOpacity: 1
    }



    const onEachCountry= (country, layer) => {
        layer.options.color = "#7b0080";
        const name  = country.properties.ADMIN;
        const confirmed  = country.properties.confirmed;
        console.log(country.properties);

        //const variant = country.proprieties.variant;
        //console.log(confirmedText);
        layer.bindPopup(`${name} - ${confirmed}`);
    }

    const handleDateChange = (date) => {
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;
        setSelectedDate(date);
        console.log(date);
    }; 




  return (
      <div className="globalmap_container"> 
        <MuiPickersUtilsProvider utils={DateFnsUtils} className="datepicker">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
        {covidData.length > 0 ? 
          (
          <div>

            <MapContainer style={{height:"60vh"}} zoom={2} center={[20, 100]}>
                <GeoJSON 
                data={covidData} 
                style={mapStyle}
                onEachFeature={onEachCountry}
                ></GeoJSON>
            </MapContainer>  
          </div> 
          ) : (
              <div className="spinner">
                  <SpinnerCircular 
                  size={50} 
                  thickness={100} 
                  speed={100} 
                  color="#AC396B" 
                  secondaryColor="rgba(0, 0, 0, 0.44)"/>
              </div>
            
          )
        }           
      </div>
  )
}




export default GlobalMap;