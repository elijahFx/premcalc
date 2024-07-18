import React, { useEffect, useState } from 'react'
import SingleSession from './SingleSession'
import { useDispatch, useSelector } from 'react-redux'
import { addConsumer, checkCourtSessionsForConsumers, deleteConsumer, getConsumers, getSessions } from '../features/sessionsSlice'
import { formattedDate } from './Month'
import { Link } from 'react-router-dom'
import { courtsMap, courtsMapReversed } from '../misc/map'
import { Tooltip } from 'react-tooltip'

function parseDateTime (dateStr, timeStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    const [hours, minutes] = timeStr.split('.').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

export default function Session() {

    const dispatch = useDispatch()
    const allTheSessions = useSelector((state) => state.sessions.courtSessions)
    const allTheConsumers = useSelector((state) => state.sessions.consumerList)
    const { error, status, sessionStatus } = useSelector((state) => state.sessions)


    const userId = useSelector((state) => state.users.user.id)

    const [consumerName, setConsumerName] = useState('');
    const [selectedCourt, setSelectedCourt] = useState('Суд Минского района');


    useEffect(() => {
        dispatch(getSessions())
        dispatch(getConsumers()) 
        console.log(error, status);  
    }, [dispatch])

    const handleDelete = (id) => {
        dispatch(deleteConsumer(id))
    }


    const handleNameChange = (event) => {
        setConsumerName(event.target.value);
    };

    const handleCourtChange = (event) => {
        setSelectedCourt(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!consumerName || !selectedCourt)return
        dispatch(addConsumer({name: consumerName, courtId: courtsMapReversed[selectedCourt], user_id: userId}))
        setConsumerName("")
        setSelectedCourt("Суд Минского района")
        console.log('Submitted:', { consumerName, selectedCourt });
    };
    
    const handleCheckCourtSessionForConsumers = () => {
        dispatch(checkCourtSessionsForConsumers(userId))
    }

    const sortedSessions = [...allTheSessions].sort((a, b) => {
        const dateA = parseDateTime(a.date, a.time);
        const dateB = parseDateTime(b.date, b.time);
        return dateA - dateB;
    });

    const sortedConsumers = [...allTheConsumers].sort((a, b) => {
       return Number(a.courtId) - Number(b.courtId)
    })


    


  return (<>
    <div className='monthContainer'>
    <div className='month'><h5>{formattedDate}</h5>
    <Link to="/"><button>На главную</button></Link></div></div>
    <div className='noCases'>
        <div className="sessionContainer">
        <div className="box">
    {sessionStatus === "loading" ? (
        <div className="loader2"></div>
    ) : (
        sortedSessions.map((el) => (
            <SingleSession
                id={el._id}
                key={el._id}
                name={el.name}
                judge={el.judge}
                date={el.date}
                time={el.time}
                court={el.court}
                courtRoom={el.courtRoom}
                liabelee={el.liabelee}
            />
        ))
    )}
</div>
            <div className="box">
                <form className='consumerForm' onSubmit={handleSubmit}>
                <label htmlFor="name">Введите ФИО вашего потребителя или название организации-ответчика</label>
                <input type="text" value={consumerName} onChange={handleNameChange} name='court' id='name' placeholder='Глазков Николай Андреевич' />
                <label htmlFor="court">Выберите суд, который рассматривает данное дело:</label>
                <select value={selectedCourt} onChange={handleCourtChange} name="court" id='court'>
                                    <option value="" disabled>Суд Минского района</option>
                                    <option value="Суд Заводского района г. Минска">Суд Заводского района г. Минска</option>
                                    <option value="Суд Центрального района г. Минска">Суд Центрального района г. Минска</option>
                                    <option value="Суд Московского района г. Минска">Суд Московского района г. Минска</option>
                                    <option value="Суд Октябрьского района г. Минска">Суд Октябрьского района г. Минска</option>
                                    <option value="Суд Ленинского района г. Минска">Суд Ленинского района г. Минска</option>
                                    <option value="Суд Партизанского района г. Минска">Суд Партизанского района г. Минска</option>
                                    <option value="Суд Первомайского района г. Минска">Суд Первомайского района г. Минска</option>
                                    <option value="Суд Советского района г. Минска">Суд Советского района г. Минска</option>
                                    <option value="Суд Фрунзенского района г. Минска">Суд Фрунзенского района г. Минска</option>
                                    <option value="Суд Минского района">Суд Минского района</option>
                                    <option value="Минский городской суд">Минский городской суд</option>
                                    <option value="Минский областной суд">Минский областной суд</option>
                                </select>
                                <div className="flex-row">
                                    <button>Внести потребителя (ответчика) в базу данных</button>
                                    <button type="button" onClick={handleCheckCourtSessionForConsumers} className={status === "resolved" || sessionStatus !== "loading" ? "recycle" : "grayBtn"}><span className="material-symbols-outlined">update</span></button>
                                    <Tooltip anchorSelect=".recycle" place="bottom">
                                        Обновление информации по судебным заседаниям
                                    </Tooltip>
                                </div>
                                </form>
                                <p className='guide'>Данная страница работает следующим очень простым образом:
                                    <strong> 1)</strong> Вы вносите <strong>ФИО потребителя</strong> или <strong>название организации</strong>, за которыми хотите осуществлять контроль, а также <strong>суд, в котором необходимо осуществлять контроль</strong>;
                                    <strong> 2)</strong> Каждый раз, когда вы будете посещать наш великолепный сайт, <strong>premcalc.by</strong> будет делать запрос на сайт <strong>Верховного Суда Республики Беларусь</strong> и проверять нет ли в ближайший месяц судебных заседаний с участием потребителя или ответчика, которых вы указали;
                                    <strong> 3)</strong> Вы также можете нажать на <strong>кнопку обновления</strong> для того, чтобы <strong>premcalc.by</strong> сделал запрос на сайт <strong>Верховного Суда Республики Беларусь</strong> по нажатию вами клавишы.
                                </p>
                                <ol>
                                    {sortedConsumers?.map((el) => {if(!el)return
    return <li key={el._id}>{el.name} ({courtsMap[el.courtId]}) <span onClick={() => {handleDelete(el._id)}} className="material-symbols-outlined red">close</span></li>
                                    })}
                                </ol>
            </div>
        </div>
    </div>
</>
    
  )
}
