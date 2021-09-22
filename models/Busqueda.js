const fs= require('fs');

const axios = require('axios');



class Busqueda
{

    historial =[];
    dbpath='./db/database.json';

    constructor()
    {
        //Todo: leer db si existe;
        this.leerDB();
    }

    async ciudad(lugar='')
    {
        //Peticion http;

        const instance = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
            params:
            {
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'language':'es'
            }
        });

        try
        {
            const res = await instance.get();
            return res.data.features.map(lugar=>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
            
        }
        catch(err)
        {
            console.log(err);
            return [];
        }

    }

    async climaLugar(latitud, longitud)
    {
        //axios instance
        const instance= axios.create(
            {
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: 
                {
                    'lat': latitud,
                    'lon': longitud,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            }
        )

        try{

            //res.data
            const res = await instance.get();
            return({

                cielo: res.data.weather[0].description,
                temp_min: res.data.main.temp_min,
                temp_max: res.data.main.temp_max,
                temp: res.data.main.temp
            })
            //Return { nubes, tem_min, tem_mex, tem_normal}

        }
        catch(err)
        {
            console.log(err);
        }

    }

    agregarHistorial(lugar='')
    {
        //Prevenir duplicados
        
        if(this.historial.includes(lugar))
        {
            return;
        }
        else
        {
            this.historial.unshift(lugar);
            this.guardarDB();
        }    
    }
    
    //grabar en db

    guardarDB()
    {
        const payload=
        {
            historial: this.historial
        }

        fs.writeFileSync(this.dbpath, JSON.stringify(payload));
    }

    leerDB()
    {
        const info=fs.readFileSync(this.dbpath, {encoding:'utf-8'});
        const data= JSON.parse(info);
        this.historial=data.historial;

        
    }

}

module.exports =Busqueda;