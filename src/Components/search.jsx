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
        const {cityname} = this.state
        return(
            <>
            <div className="background-image"></div>
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
                <div className="col m-auto">
                    <h2 style={{textAlign:"center",letterSpacing:"6px",textTransform:"uppercase",marginTop:"150px"}}>Weather App</h2>
                </div>
            </div>


            <div className="row" style={{marginLeft:"80px",marginTop:"30px",padding:"0px"}} >
                <div className="col-md-3 offset-md-4 offset-sm-0"  style={{padding:"0px"}}>
                    <input autoComplete='off' type="search" id="form" id="cityname" name="cityname" value={this.cityname} onChange={this.ev} class="form-control" /> 
                </div>
                <div className="col-sl-1" style={{padding:"0px"}} >
                    <a href={`/${this.state.cityname}`}>
                        <button type="button" onClick={this.getWeather}    class="btn btn-primary ">
                            <i class="fa fa-search"></i>
                        </button>
                    </a>
                </div>
                        
            </div>
        </div>
        </motion.div>
        </>);
    }


}