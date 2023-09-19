import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import './punkapi.css'

const Punkapi = () => {
    const[data,setData]=useState([]);
    const[query,setQuery]=useState('');
    const[page,setPage]=useState(1);
    
    //fetching data
    useEffect(()=>{
    axios.get(`https://api.punkapi.com/v2/beers/?page=${page}`)
    .then(res=>{
        setData(res.data);
    })
    .catch(error=>{
        console.log(error);
    })
    },[page]);

    //filtering data by query
    let newdata= data.filter((user)=>
       user.name.toLowerCase().includes(query)             ||
       user.first_brewed.includes(query)                   ||   
       user.tagline.toLowerCase().includes(query)          ||
      (Math.floor(user.abv) == query || user.abv == query) ||
      (Math.floor(user.ibu) == query || user.ibu == query) ||  
      (Math.floor(user.ebc) == query || user.ebc == query) ||  
      (Math.floor(user.ph) == query || user.ph == query)   ||
      (Math.floor(user.srm) == query || user.srm == query) ||  
      (Math.floor(user.attenuation_level) == query || user.attenuation_level == query)
    )   

    return (
        <div className='main'>
          <div className="inner">
            <form>
                <input type="search" id="search" placeholder='Search...' onChange={(e)=>setQuery(e.target.value)}/>
            </form>
          </div>
          <div className="pagination">
            <button onClick={()=>{ if(page>1) setPage(page-1)}}> PREV </button>
              <p> PAGE NO : {page} </p>
            <button onClick={()=>{ setPage(page+1)}}> NEXT </button>
          </div>
          <div className="inner_2"> 
            {newdata.map((value) => {
                return (
                <div className='card' key={value.id}> 
                    <img src={value.image_url} alt="im" />
                    <p>Name : {value.name.length > 15 ? `${value.name.substring(0, 10)} ...` : value.name}</p>
                    <p>Abv : {value.abv}</p>
                    <p>Ibu : {value.ibu}</p>
                    <p>Ebc : {value.ebc}</p>
                    <p>PH : {value.ph}</p>
                    <p>Srm : {value.srm}</p>
                    <p>First Brewed : {value.first_brewed}</p>
                    <p>Attenuation : {value.attenuation_level}</p>
                    <p>Tagline : {value.tagline.length>15 ?`${value.tagline.substring(0, 10)} ...`: value.tagline}</p>
                </div>
                )})           
            }
          </div>
        </div>
    )    
}

export default Punkapi