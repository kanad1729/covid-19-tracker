import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country)=>{

    let changableUrl = url;

    if(country){
        changableUrl = `${url}/countries/${country}`
    }

    try {
        const {data: {confirmed,deaths,recovered,lastUpdate}} = await axios.get(changableUrl);

        //on above we have use object destructuring
        
        // const modifiedData = {
        //     confirmed: data.confirmed,
        //     deaths: data.deaths,
        //     recovered: data.recovered,
        //     lastUpdate: data.lastUpdate
        // }

        //by doing object destructuring both of side get same name i.e on key and value so we can use only one name also
         
        const modifiedData = {confirmed,deaths,recovered,lastUpdate}
        return modifiedData;
        
    } catch (error) {
        console.log(error);
    }

    
}

export const fetchDailyData = async ()=>{

    try {
        
        const {data} = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))

       return modifiedData;
    } catch (error) {
        console.log(error);
        
    }
}

export const fetchCountries = async ()=>{

    try {
        
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country)=>country.name)
        

      
    } catch (error) {
        console.log(error);
        
    }
}


