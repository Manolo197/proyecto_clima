const { restoreDefaultPrompts } = require('inquirer');
const inquirer = require('inquirer');
require('dotenv').config();

const {leerInput, pausaFunc, inquirerMenu, listarLugares}= require('./helpers/inquirer');
const Busqueda = require('./models/Busqueda');


const main= async()=>
{
    const busqueda= new Busqueda();
    
    
    do{

        opt= await inquirerMenu();    

        switch(opt)
        {

                case 1:
                //Mostramos mensaje 
                const lugar = await leerInput("Ciudad a buscar:");
                //Buscamos lugares
                const lugares= await busqueda.ciudad(lugar);
                
                //Seleccionamos lugares
                const id = await listarLugares(lugares);

                if(id==='0')continue;

                const lugarSel= lugares.find(l=> l.id=== id);
                
                //Guardar en DB
                busqueda.agregarHistorial(lugarSel.nombre);
                //Clima.

                const clima = await busqueda.climaLugar(lugarSel.lat, lugarSel.lng);

                //Mostramos resultados
                console.clear();

                console.log("\nInformación de la ciudad: ".green);

                console.log("Ciudad: ", lugarSel.nombre);
                console.log("Latitud: ", lugarSel.lat);
                console.log("Longitud: ", lugarSel.lng);

                console.log("\nTemperatura:".green);
                console.log("Cielo: ", clima.cielo);
                console.log("Promedio: ", clima.temp);
                console.log("Minima: ", clima.temp_min);
                console.log("Maxima: ", clima.temp_max);



                break;
            case 2: 
                busqueda.historial.forEach((l, i)=>
                    {
                        const idx= `${i+1}.`.blue;
                        console.log(`${idx} ${l}`);
                    })
                break;
            case 0:
                console.log("Adios :)");
                break;
            default: 
                console.log("No existe esa opcion");
                break;
        }

        if(opt!==0) await pausaFunc();

        console.clear();
    

        }
        while(opt!==0);

}


main();