import React, { Component } from 'react'

import axios from 'axios'
import {motion} from 'framer-motion'

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
                {this.setState({ChangClass: "fa fa-cloud" })}
            else if(res.data.weather[0].main=== "Clear")
            {
                this.setState({ChangClass: "fa fa-sun" })
              
            }
            else if(res.data.weather[0].main=== "Rain")
            {
                this.setState({ChangClass: "fa fa-cloud-rain" })
              
            }
            else
                {
                    this.setState({ChangClass: "fa fa-cloud" })
                }


        
        
        })
        .catch(err =>{
            this.setState({error: "Oops! You entered wrong city name 😿"})
        })

    }


    render(){
        const {item,covid} = this.state

if(this.state.error){
    return(
        <div className="container m-auto" >
            <div className='row'style={{marginTop:"250px",backgroundColor:"rgb(255, 255, 255,0.2)",height:"7em"}}>
                <div className='col-md-auto' >
                    <p style={{textAlign:"center" , fontSize:"30px",marginTop:"20px"}}> {this.state.error} </p>
                </div>
            </div>
        </div>
    );
}
else{

        return(
            <>
            <div className="background-image"></div>
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
               
                
                <div className="row">
                    <div className="col-md-4">
                        <div className="row">
                             <p id="city_name" style={{fontSize:"60px",margin:"0",padding:"0"}} name="OutputHere" value={this.OutputHere}> {this.state.OutputHere},{this.state.countryHere}</p>
                        </div>
                        <div className='row' style={{display:"flex"}}>
                            <p id="day" name="Day" >{this.state.Day}</p>
                            <p id="todays_data" style={{marginLeft:"5px"}}  name='Date'>{this.state.Date}</p>
                            <p id="todays_data" style={{marginLeft:"5px"}}  name='Date'>{this.state.Month}</p>
                        </div>
                        <div className="row">
                            <div className="col temp_status">
                                <p id="temp_status" style={{fontSize:"100px"}} ><i className={this.state.ChangClass}  aria-hidden="true"></i></p>
                            </div>
                            <div className="col " style={{marginLeft:"10px"}}>
                                <div className="row">
                                    <p id="temp" name="getTemp" style={{fontSize:"30px",marginLeft:"20px",marginTop:"25px"}} value={this.getTemp}><span id="temp_real_val">{this.state.getTemp}</span><sup>o</sup>C </p>   
                                </div>
                                <div className="row">
                                    <p id='dis' name='dis' style={{fontSize:"20px",marginLeft:"20px",textTransform:"capitalize"}}>{this.state.dis}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-auto others" style={{backgroundColor:"rgb(255, 255, 255,0.2)",padding:"0px"}}>
                        <div className="row" style={{marginTop:"20px",marginLeft:"15px"}}>
                            <div className="col-md-5" >
                                <p style={{fontSize:"40px",marginBottom:"0px"}}>{this.state.hight}<sup>o</sup>C </p>
                                <p style={{fontSize:"20px",marginLeft:"30px"}}>Highest</p>
                            </div>
                            <div className="col-md-5 " style={{marginLeft:"20px"}} >
                                <p style={{fontSize:"40px",marginBottom:"0px"}}>{this.state.wind}mph</p>
                                <p style={{fontSize:"20px",marginLeft:"45px"}}>Wind</p>
                            </div>
                            
                        </div>
                        
                        <div className="row" style={{marginTop:"80px",marginLeft:"20px"}}>
                        <div className="col-md-5" >
                                <p style={{fontSize:"40px",marginBottom:"0px"}}>{this.state.low}<sup>o</sup>C</p>
                                <p style={{fontSize:"20px",marginLeft:"35px"}}>Lowest</p>
                            </div>
                            <div className="col-md-5 " style={{marginLeft:"20px"}}>
                                <p style={{fontSize:"40px",marginBottom:"0px",marginLeft:"30px"}}>{this.state.humidity}%</p>
                                <p style={{fontSize:"20px",marginLeft:"30px"}}>Humidity</p>
                            </div>
                            
                        </div>

                    </div>
                    <div className="col-md-auto offset-md-1" style={{backgroundColor:"rgb(255, 255, 255,0.2)"}}>
                        <div className="row">
                            <h5 style={{fontSize:"40px",fontWeight:"bold"}}>Covid-19 Updates</h5>
                        </div>
                        <div className="row">
                            <p style={{fontSize:"30px",margin:"0",marginLeft:"60px"}}>Total Confirmed</p>
                        </div>
                        <div className="row">
                            <p style={{fontSize:"20px",marginLeft:"80px"}}>{this.state.covidByCountry.TotalConfirmed}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewConfirmed})</span></p>
                        </div>
                        <div className="row">
                            <p style={{fontSize:"30px",margin:"0",marginLeft:"60px"}}>Total Deaths</p>
                        </div>
                     
                        <div className="row">
                            <p style={{fontSize:"20px",marginLeft:"80px"}}>{this.state.covidByCountry.TotalDeaths}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewDeaths})</span></p>
                        </div>
                        <div className="row">
                            <p style={{fontSize:"30px",margin:"0",marginLeft:"60px"}}>Total Recovered</p>
                        </div>
                        
                        <div className="row">
                            <p style={{fontSize:"20px",marginLeft:"80px"}}>{this.state.covidByCountry.TotalRecovered}<span style={{fontSize:"13px"}}>(<i class="fa fa-arrow-up"></i>{this.state.covidByCountry.NewRecovered})</span></p>
                        </div>
                        
                    </div>

                   
                </div>
               

                
                <div className="row" style={{marginTop:"50px"}}>
                   
                        <div className="forcast" >
                            {item.map((items)=>( 
                                <div className="col-md-2 " style={{marginLeft:"10px",borderRadius:"5px",backgroundColor:"rgb(255, 255, 255,0.2)"}}>
                                    <p style={{fontSize:"26px"}}>{items.dt_txt.slice(5,10)}</p>
                                    <p style={{fontSize:"26px"}}>{items.dt_txt.slice(11,16)}</p>

                                    <p style={{fontSize:"50px",marginBottom:"0"}}>{items.main.temp}<sup>o</sup>C</p>
                                    <p><img src={`http://openweathermap.org/img/w/${items.weather[0].icon}.png`}></img></p>
                                                       
                                    
                                 </div>
                                            
                               
                            ))}
                        </div>
                    
                </div>


           
            
            
        </div>
    

     
            </motion.div>
            </>
        );
    }
}
}

export default withRouter( weather)