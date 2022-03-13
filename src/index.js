import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        CountryData: [],
        CityData: [],
        CountryId: '',
        CityId: '',
        CityName: '',

        LatData:'',
        LonData:'',
        TimezoneData:'',
        WindSpeedData:'',
        WindDegData:'',
        VisibilityData:'',
        WeatherMainData: '',
        WeatherDescriptionData: '',
        TempFarenheitData: '',
        TempCelciusData: '',
        DewPointData: '',
        RelativeHumidityData: '',
        PressureData: '',

      };

      this.handleChange = this.handleChange.bind(this);
      this.handleChangeCity = this.handleChangeCity.bind(this);

    }

    componentDidMount() {
        axios.get('http://localhost:15901/api/CountryCity/GetCountries').then(response => {
                this.setState({
                    CountryData: response.data
                });
        });
    }

    handleChange(event) {
      this.setState({CountryId: event.target.value});

        axios.get('http://localhost:15901/api/CountryCity/GetCities_FromSelectedCountry', {
            params: {
                countryId: event.target.value
            }
          })
          .then(response => {

            this.setState({
                CityData: response.data
            });
          })
          .catch(error => {console.log( 'the error has occured: ' + error) });

    }


    handleChangeCity(event) {
        this.setState({CityId: event.target.value, CityName: event.target.options[event.target.selectedIndex].text});
        
        var url = 'http://localhost:15901/api/Weather/GetWeather?cityName='+ event.target.options[event.target.selectedIndex].text;
          axios.get(url)
          .then(response => {

            this.setState({
              LatData: response.data.lat,
              LonData: response.data.lon,
              TimezoneData: response.data.timezone,
              WindSpeedData: response.data.windSpeed,
              WindDegData: response.data.windDegree,
              VisibilityData: response.data.visibility,
              WeatherMainData: response.data.weatherMain,
              WeatherDescriptionData: response.data.weatherDescription,
              TempFarenheitData: response.data.tempFarenheit,
              TempCelciusData: response.data.tempCelcius,
              RelativeHumidityData: response.data.relativeHumidity,
              DewPointData: response.data.dewPoint,
              PressureData: response.data.pressure,   
            });
          });

      }



    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Country:
            <select value={this.state.CountryId} onChange={this.handleChange}>
              <option value="0">Select Country</option>
                {this.state.CountryData.map((e, key) => {
                    return <option key={key} value={e.id}>{e.name}</option>;
                })}
            </select>
          </label>
          <br/>
          <label>
            City:
            <select value={this.state.CityId} onChange={this.handleChangeCity}>
              <option value="0">Select City</option>
                {this.state.CityData.map((e, key) => {
                    return <option key={key} value={e.id}>{e.name}</option>;
                })}
            </select>
          </label>
        <br />

        <label>
            Location Latitude :
           {this.state.LatData}

        </label>
        <br />
        <label>
            Location Longitude :
           {this.state.LonData}

        </label>
        <br />
        <label>
            Timezone :
           {this.state.TimezoneData}

        </label>
        <br />
        <label>
            Wind Speed :
           {this.state.WindSpeedData}

        </label>
        <br />
        <label>
            Wind Degree :
           {this.state.WindDegData}

        </label>
        <br />
        <label>
            Visibility :
           {this.state.VisibilityData}

        </label>
        <br />
        <label>
            Weather Main :
           {this.state.WeatherMainData}

        </label>
        <br />
        <label>
            Weather Description :
           {this.state.WeatherDescriptionData}

        </label>
        <br />
        <label>
            Temp Farenheit :
           {this.state.TempFarenheitData}

        </label>
        <br />
        <label>
            Temp Celcius :
           {this.state.TempCelciusData}

        </label>
        <br />
        <label>
            Dew Point :
           {this.state.DewPointData}

        </label>
        <br />
        <label>
            Relative Humidity :
           {this.state.RelativeHumidityData}

        </label>
        <br />
        <label>
            Pressure :
           {this.state.PressureData}

        </label>
        </form>
      );
    }
  }

ReactDOM.render(<App />, document.querySelector("#root"));