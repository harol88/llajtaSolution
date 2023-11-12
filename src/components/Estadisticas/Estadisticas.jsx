import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import './Estadisticas.css';


ChartJS.register(ArcElement,Tooltip,Legend);




const dashboard = () => {

    const [cantidadPlatillos,setCantidadPlatillos] = useState(0);
    const [cantidadUsuarios,setCantidadUsuarios] = useState(0);
    const [cantidadCalificados,setCantidadCalificados] = useState(0);
    const [totalCalificaciones,setTotalCalificaciones] = useState(0);
    const [porcentajeSi,setPorcentajeSi] = useState(0);
    const porcentajeSiRef = useRef(porcentajeSi);
    const [porcentajeNo,setPorcentajeNo] = useState(0);
    const porcentajeNoRef = useRef(porcentajeNo);

    useEffect(() => {
        setCantidadPlatillos(50);
        setCantidadUsuarios(30);
        setCantidadCalificados(675);
        setTotalCalificaciones(cantidadUsuarios*cantidadPlatillos);
        
        const porcentajeSiCalculado = (cantidadCalificados/totalCalificaciones)*100;
        setPorcentajeSi(Number(porcentajeSiCalculado.toFixed(2)));
        
        const porcentajeNoCalculado = (totalCalificaciones-cantidadCalificados)/totalCalificaciones*100;
        setPorcentajeNo(Number(porcentajeNoCalculado.toFixed(2)));
        
        porcentajeSiRef.current = porcentajeSi;
        porcentajeNoRef.current = porcentajeNo;
    });

    const dataSi = {
        datasets: [{
            data: [porcentajeSi,100-porcentajeSi],
            backgroundColor: ['red', 'black'],
            borderColor: ['red', 'black'],
        }]
    }

    const dataNo = {
        datasets: [{
            data: [porcentajeNo,100-porcentajeNo],
            backgroundColor: ['red', 'black'],
            borderColor: ['red', 'black'],
        }]
    }

    const options = {
        cutout: 30,
    }

    const textCenterSi = {
        id: 'textCenterSi',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const porcentajeSi = porcentajeSiRef.current;
            ctx.fillText(porcentajeSi+'%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }

    const textCenterNo = {
        id: 'textCenterNo',
        beforeDatasetsDraw(chart, args, pluginOption){
            const {ctx, data} = chart;
            ctx.save();
            ctx.font = 'bolder 15px sans-serif';
            ctx.fillStyle = 'red';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const porcentajeNo = porcentajeNoRef.current;
            ctx.fillText(porcentajeNo+'%', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        }
    }
    

    return(
        <div className="estadistica">

            <div className="tituloest">
                <h1>Dashboard - Analisis de calificacion</h1>
            </div>

            <div className="tasasRoscas">

                <div className='contenedorTasa'>
                    <div className="tasa">
                        <Doughnut data={dataSi} options={options} plugins={[textCenterSi]} />
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>{cantidadCalificados}</p>
                    </div>
                </div>
                
                <div className="contenedorTasa">
                    <div className="tasa">
                        <Doughnut data={dataNo} options={options} plugins={[textCenterNo]} />
                    </div>
                    <div className='descripcionTasas'>
                        <p className='text'>Tasa de calificaciones no ejecutadas en platillos tradicionales</p>
                        <p className='cantidad'>{totalCalificaciones-cantidadCalificados}</p>
                    </div>
                </div>

            </div>

            <div className="totalesEst">

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img src="./src/assets/sopa-caliente.png" alt="platillo" />
                    </div>
                    <div className='descripcionTotal'>
                        <p className='cantidad'>{cantidadPlatillos}</p>
                        <p className='text'>Platillos Totales</p>
                    </div>
                </div>

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img src="./src/assets/grupo.png" alt="usuarios" />
                    </div>
                    <div className='descripcionTotal'>
                    <p className='cantidad'>{cantidadUsuarios}</p>
                        <p className='text'>Usuarios Totales</p>
                    </div>
                </div>

                <div className='contenedorTotal'>
                    <div className='iconTotal'>
                        <img src="./src/assets/corazon.png" alt="calificaciones" />
                    </div>
                    <div className='descripcionTotal'>
                        <p className='cantidad'>{totalCalificaciones}</p>
                        <p className='text'>Calificaciones Totales</p>
                    </div>
                </div>

            </div>

            <div className="calificacionesEst">

            </div>

        </div>

        
    );
}

export default dashboard;