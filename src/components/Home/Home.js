import React from 'react';
import './Home.css';
import axios from 'axios';
import { Input, Tabs, Collapse , Descriptions,Image} from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;
let APIKEY = 'a91c26d75672bfe84d94fa7f07321da8';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchcity: '',
            allWeatherabove20: [],
            allclearWeather: []


        };
    }

    componentDidMount() {
        this.setState({
            allWeatherabove20: [],
            allclearWeather: []
        });

    }
//This method is used for binding parameter of city to be searched. 
    onSearchKeyChange(e) {
        this.setState({
            searchcity: e.target.value
        })
    }

//This method is to search the weather of entered city for temperature above 20 or for clear sky or sunny weather. 
    handleSearch() {
        let date_time ="";
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.searchcity}&units=metric&appid=${APIKEY}`)
            .then(response => {
                console.log(response.data.list);

                   for (let i = 0; i <= response.data.list.length; i++) {
                    if (response.data.list[i].main.temp > 20.00) {
                        date_time = response.data.list[i].dt_txt;
                        let temp = response.data.list[i].main.temp;
                        let allWeatherabove20 = this.state.allWeatherabove20;
                        let weatherDetails={
                            "Date":date_time,
                            "Temperature":temp,
                        };
                        this.setState({
                            allWeatherabove20: allWeatherabove20.concat(weatherDetails)
                        })
                      
                    }
                    if(response.data.list[i].weather[0].description == "clear sky")
                    {
                        console.log(response.data.list[i].weather[0].icon);
                        date_time = response.data.list[i].dt_txt;
                        let description = response.data.list[i].weather[0].description;
                        let image = response.data.list[i].weather[0].icon;
                        let allclearWeather = this.state.allclearWeather;
                        let weatherClimateDetails={
                            "Date":date_time,
                            "Description":description,
                            "Image":"http://openweathermap.org/img/wn/"+image+".png"
                        };
                        this.setState({
                            allclearWeather: allclearWeather.concat(weatherClimateDetails)
                        })
                    }

                }
            })
            .catch((e) => {
                console.log(e)
            });

    }

//This is the starting of the application.
    render() {
        let self = this;
        let count = 0;
        return (
            <div className="start">
                <div className="start-header">
                    <div>
                        <h1>Weather Report</h1>

                    </div>
                </div>

                <div className="start-body">
                    <div>
                        <Search
                            placeholder="Search the weather city"
                            onChange={this.onSearchKeyChange.bind(this)}
                            onSearch={this.handleSearch.bind(this)}
                            style={{ width: "50vh" }}

                        />
                    </div>
                    <br />

                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="Weather 5 day / 3 hour forecast above 20" key="1">
                            {this.state.allWeatherabove20.map(function (item) {
                                return (
                                    <div>
                                        <Collapse >
                                            <Panel header={item.Date}>
                                            <Descriptions title="Weather Info" bordered>
                                            <Descriptions.Item label="Date Time">
                                            {item.Date}
                                            </Descriptions.Item>

                                          <Descriptions.Item label="Temperature">
                                            {item.Temperature}
                                            </Descriptions.Item>
                                            </Descriptions>

                                            </Panel>

                                        </Collapse>
                                    </div>
                                )
                            })}

                        </TabPane>
                        <TabPane tab="Sunny/Clear Weather" key="2">
                            {this.state.allclearWeather.map(function (item) {
                                return (
                                    <div>
                                        <Collapse >
                                            <Panel header={item.Date}>
                                            <Descriptions title="Weather Info" bordered>
                                            <Descriptions.Item label="Date Time">
                                            {item.Date}
                                            </Descriptions.Item>

                                            <Descriptions.Item> 
                                                <Image  width={100}   src={item.Image}
                                                        /> </Descriptions.Item>

                                          <Descriptions.Item label="Description">
                                            {item.Description}
                                            </Descriptions.Item>
                                            </Descriptions>

                                            </Panel>

                                        </Collapse>
                                    </div>
                                )
                            })}

                        </TabPane>
                    </Tabs>



                </div>


            </div>

        );
    }
}

export default Home;

