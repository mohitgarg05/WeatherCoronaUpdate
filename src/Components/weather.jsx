import React, { Component } from 'react'

import axios from 'axios'
import {motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faCloud,
   faCloudRain,
    faSun,faFrown 
  } from '@fortawesome/free-solid-svg-icons';
import {animateOne,transition} from '../Animations/searchAnimation'
import { withRouter } from "react-router";

class weather extends Component{
    constructor(props) {
        super(props);
        
        
        this.state={
            
            OutputHere:'',countryHere:"",error:"",covidByCountry:"",hight:"",wind:"",sunrise:"",low:"",humidity:"",
            sunset:"",covid:'',getTemp:"",dis:"",ChangClass:"",
            Day:"",Date:"",Month:"",item:[],currentWeather:[]
        }
    }

    
    
    componentDidMount(){
        const CityName = this.props.match.params.cityname;
        console.log(CityName);

        let today = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
      var month = monthNames[today.getMonth()];
      var date = today.getDate();
      var day = today.getDay();
 
      this.setState({Date:date})
      this.setState({Month:month})
      
      switch(day)
      {
          case 0 :   this.setState({Day:'Sunday'});
                  break;
          case 1 : this.setState({Day:'Monday'});
                  break;
          case 2 : this.setState({Day:'Tuesday'});
                  break;
          case 3 : this.setState({Day:'Wednesday'});
                  break;
          case 4 : this.setState({Day:'Thursday'});
                  break;
          case 5 :this.setState({Day:'Friday'});
                  break;
          case 6 :this.setState({Day:'Saturday'});
                  break;
      }
  
        
       
        
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q= ' + CityName +'&units=metric&appid=48c67a4da27e10c7f83cae933add9aad')
        .then(res=>{
            this.setState({item : res.data.list})
            
            
        
        })
        .catch(err =>{
            this.setState({error: "You entered wrong city name 😿"})
        })

        axios.get('https://api.covid19api.com/summary')
        .then(res=>{
        //    console.log(res.data.Countries);
            this.setState({covid:res.data.Countries})
            this.state.covid.map((code,key)=>{
               
                if(code.CountryCode===this.state.countryHere){
                     this.setState({covidByCountry: code})
                }
            })

            console.log(this.state.covidByCountry);
           
            
        
        })
        .catch(err =>{
            console.log(err);
        })




        axios.get('https://api.openweathermap.org/data/2.5/weather?q= ' + CityName +'&units=metric&appid=48c67a4da27e10c7f83cae933add9aad')
        .then(res=>{
            this.setState({currentWeather: res.data})
            this.setState({countryHere : res.data.sys.country})
             this.setState({OutputHere: res.data.name})
             this.setState({getTemp:res.data.main.temp})
             this.setState({dis : res.data.weather[0].description})
             this.setState({hight:res.data.main.temp_max})
             this.setState({low:res.data.main.temp_min})
             this.setState({wind:res.data.wind.speed})
             this.setState({humidity:res.data.main.humidity})
             this.setState({sunset:res.data.sys.sunset})
             this.setState({sunrise:res.data.sys.sunrise})

            
           if( res.data.weather[0].main=== "Clouds")
                {this.setState({ChangClass: faCloud })}
            else if(res.data.weather[0].main=== "Clear")
            {
                this.setState({ChangClass: faSun })
              
            }
            else if(res.data.weather[0].main=== "Rain")
            {
                this.setState({ChangClass: faCloudRain })
              
            }
            else
                {
                    this.setState({ChangClass: faCloud })
                }


        
        
        })
        .catch(err =>{
            this.setState({error: "Oops! You entered wrong city name "})
        })

    }


    render(){
        const {item,covid} = this.state

if(this.state.error){
    return(<>
        <div className="background-image">
        <div className="container m-auto" >
            <div className='row'style={{marginTop:"250px",backgroundColor:"rgb(255, 255, 255,0.2)",height:"7em"}}>
                <div className='col-md-auto' >
                    <p style={{ marginLeft:"300px", fontSize:"30px",marginTop:"20px"}}><FontAwesomeIcon icon={faFrown} /> {this.state.error}<FontAwesomeIcon icon={faFrown} /> </p>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
else{

        return(
            <>
            <div className="background-image1">
            <motion.div
            initial="out"
            animate='in'
            exit="out"
            variants={animateOne}
            transition={transition}
            whileHover={{ scale: 0.9 }}
            
           
 
  whileTap={{ scale: 0.9 }}
  layout transition={{ duration: 0.4 }}>
       
           
            <div className="containter weather m-auto">
               
                
                <div className="row weather-box">
                    <div className="col-md-auto details"  >
                        <div className="row city-details">
                             <p id="city_name"  name="OutputHere" value={this.OutputHere}> {this.state.OutputHere},{this.state.countryHere}</p>
                        </div>
                        <div className='row date-details'>
                            <p id="day" name="Day" >{this.state.Day}</p>
                            <p id="todays_date"  name='Date'>{this.state.Date}</p>
                            <p id="todays_month"  name='Date'>{this.state.Month}</p>
                        </div>
                        <div className="row temp-details"  >
                            <div className="col-md-auto col-sm-3 col-auto temp-icon-status"   >
                                <p id="temp_status" style={{margin:"0" }} ><FontAwesomeIcon icon={ this.state.ChangClass }/></p>
                            </div>
                            <div className="col-md-auto col-sm-4 col-auto temp-details-content  " style={{marginLeft:"20px"}}   >
                                <div className="row temp-status">
                                    <p id="temp" name="getTemp" value={this.getTemp}><span id="temp_real_val">{this.state.getTemp}</span><sup>o</sup>C </p>   
                                </div>
                                <div className="row name-status">
                                    <p id='dis' name='dis'>{this.state.dis}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-auto others">
                        <div className="row higest-wind" >
                            <div className="col-md-5 col-sm-6 col-auto higest" >
                                <p  id="data">{this.state.hight}<sup>o</sup>C </p>
                                <p  id="heading">Highest</p>
                            </div>
                            <div className="col-md-5 col-sm-3 col-auto wind" style={{marginLeft:"20px"}} >
                                <p  id="data2">{this.state.wind}mph</p>
                                <p  id="heading2">Wind</p>
                            </div>
                            
                        </div>
                        
                        <div className="row lowestt-humidity" >
                        <div className="col-md-5 col-sm-6 col-auto lowest"  >
                                <p id="data3">{this.state.low}<sup>o</sup>C</p>
                                <p  id="heading3">Lowest</p>
                            </div>
                            <div className="col-md-5 col-sm-3 col-auto humidity " style={{marginLeft:"20px"}}>
                                <p id="data4" >{this.state.humidity}%</p>
                                <p id="heading4"style={{fontSize:"20px",marginLeft:"30px"}}>Humidity</p>
                            </div>
                            
                        </div>

                    </div>
                    <div className="col-md-auto  corona" style={{backgroundColor:"rgb(255, 255, 255,0.2)"  }}>
      
                        <div className="row covid-heading" >
                            <h5 style={{fontSize:"40px",fontWeight:"bold"}}>Covid-19 Updates</h5>
                        </div>
                        <div className="row covid-confirmed">
                            <p >Total Confirmed</p>
                        </div>
                        <div className="row covid-confirmed-data">
                            <p >{this.state.covidByCountry.TotalConfirmed}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewConfirmed})</span></p>
                        </div>
                        <div className="row covid-recovered">
                            <p >Total Recovered</p>
                        </div>
                        
                        <div className="row covid-recovered-data">
                            <p >{this.state.covidByCountry.TotalRecovered}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewRecovered})</span></p>
                        </div>
                        <div className="row covid-death">
                            <p >Total Deaths</p>
                        </div>
                     
                        <div className="row covid-death-data">
                            <p >{this.state.covidByCountry.TotalDeaths}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewDeaths})</span></p>
                        </div>
                     
                    </div>

                   
                </div>
               

                
                <div className="row forcast-box" style={{marginTop:"50px"}}>
                   
                        <div className="forcast" >
                            {item.map((items)=>( 
                                <div className="col-md-2 forcast-content " style={{marginLeft:"10px",borderRadius:"5px",backgroundColor:"rgb(255, 255, 255,0.2)"}}>
                                    <p  id="date-forcast">{items.dt_txt.slice(5,10)}</p>
                                    <p id="time-forcast">{items.dt_txt.slice(11,16)}</p>

                                    <p  id="temp-forcast">{items.main.temp}<sup>o</sup>C</p>
                                    <p id="icon-forcast"><img src={`http://openweathermap.org/img/w/${items.weather[0].icon}.png`}></img></p>
                                                       
                                    
                                 </div>
                                            
                               
                            ))}
                        </div>

                    
                </div>

                                <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
           
            
            
        </div>
    

     
            </motion.div>
            </div>
            </>
        );
    }
}
}

export default withRouter( weather)