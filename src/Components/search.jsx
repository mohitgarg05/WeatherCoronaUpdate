import { Component } from "react";
import {motion} from 'framer-motion'

import {animateOne,transition} from '../Animations/searchAnimation'
export default  class Search extends Component{
    constructor(props) {
        super(props);
        this.ev = this.ev.bind(this);
        this.state={
            cityname:""
        }
    }

    ev(e){
       
        this.setState({cityname:e.target.value})
        
    }
    


    render(){
       
        return(
            <>
            <div className="background-image">
        <motion.div
            initial="out"
            animate='in'
            exit="out"
            variants={animateOne}
            transition={transition}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 0.9 }}
        >
      
        <div id="bg-text">

            <div className="row" >
                <div className="col  weather-heading">
                    <h2>Weather App</h2>
                </div>
            </div>

            <div className="container weather-input" >
                <div className="row weather-input-inner ">
                    <div className="col-md-5 col-sm-6 col-auto  weather-input-content">
                        <input autoComplete='off' type="search"  id="cityname" name="cityname" value={this.cityname} onChange={this.ev} class="form-control" /> 
                    </div>
                   
                        <a href={`/${this.state.cityname}`}>
                            <button type="button" onClick={this.getWeather}  class="btn btn-primary ">
                                <i class="fa fa-search"></i>
                            </button>
                        </a>
                
                            
                </div>
            </div>
        </div>
        </motion.div>
        </div>
        </>);
    }


}