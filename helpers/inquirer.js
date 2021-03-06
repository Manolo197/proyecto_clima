const inquirer = require('inquirer');
require('colors');

const menuOpt=
{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1.'.blue} Buscar ciudad`
        },
        {
            value: 2,
            name: `${'2.'.blue} Historial`
        },
        {
            value: 0,
            name: `${'0.'.blue} Salir`
        }   
    ]
};

const pausaInput=
{
    type: 'input',
    name: 'pausa',
    message: `Presione ${'ENTER'.blue} para continuar.`
}



const inquirerMenu= async()=>
{
    console.log('===================================='.blue);
    console.log('           Eliga una opción         '.white);
    console.log('====================================\n'.blue);

    const {opcion}= await inquirer.prompt(menuOpt);

    return opcion; 

}

const pausaFunc= async()=>
{
    console.log('\n')
    await inquirer.prompt(pausaInput);
}


const leerInput=async (message)=>
{
    const question= 
    {
        type: 'input',
        name: 'input',
        message,
        validate(value)
        {
            if(value.length===0)
            {
                return 'Por favor ingrese un valor'
            }
            return true
        }

    }

    const {input}= await inquirer.prompt(question);
    return input;
}


const listarLugares= async(lugares=[])=>
{
    const choices= lugares.map((lugar, i)=>
        {
            let idx= `${i+1}.`.green;

            return{
                value: lugar.id,
                name: `${idx} ${lugar.nombre}`
            }
        })
        choices.unshift(
            {
                value: '0',
                name: '0.'.green +'Cancelar'
            }
        );

        const preguntas= 
        [{
            type: 'list',
            name: 'id',
            message: 'Seleccione su ciudad',
            choices
        }];
    
        const {id}= await inquirer.prompt(preguntas);
        return id;
    
}

const confirmar= async(message)=>
{
    const question=
    {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok}= await inquirer.prompt(question);
    return ok;
}


const checkListado= async(tareas=[])=>
{
    const choices= tareas.map((tarea, i)=>
        {
            let idx= `${i+1}.`.green;

            return{
                value: tarea.id,
                name: `${idx} ${tarea.desc}`,
                checked: (tarea.completadoEn)?true:false
            }
        })

        const preguntas= 
        [{
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione:',
            choices
        }];
    
        const {ids}= await inquirer.prompt(preguntas);
        return ids;
    
}



module.exports=
{
    inquirerMenu,
    pausaFunc,
    leerInput,
    listarLugares,
    confirmar,
    checkListado
}