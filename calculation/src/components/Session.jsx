import React, { useEffect, useState } from 'react';
import SingleSession from './SingleSession';
import { useDispatch, useSelector } from 'react-redux';
import { addConsumer, checkCourtSessionsForConsumers, deleteConsumer, getConsumers, getSessions } from '../features/sessionsSlice';
import { formattedDate } from './Month';
import { Link } from 'react-router-dom';
import { courtsMap, courtsMapReversed } from '../misc/map';
import { Tooltip } from 'react-tooltip';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Session.css'; // Import the CSS file for styling

function parseDateTime(dateStr, timeStr) {
  if (dateStr && timeStr) {
    const [day, month, year] = dateStr.split('.').map(Number);
    const [hours, minutes] = timeStr.split('.').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
}

export default function Session() {
  const dispatch = useDispatch();
  const allTheSessions = useSelector((state) => state.sessions.courtSessions);
  const allTheConsumers = useSelector((state) => state.sessions.consumerList);
  const { error, status, sessionStatus } = useSelector((state) => state.sessions);

  const userId = useSelector((state) => state.users.user.id);

  const [consumerName, setConsumerName] = useState('');
  const [selectedCourt, setSelectedCourt] = useState('Суд Минского района');
  const [timeLeft, setTimeLeft] = useState(7.5 * 60);
  const [searchQuery, setSearchQuery] = useState('');
  const [courtFilter, setCourtFilter] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)


  useEffect(() => {
    if(userId) {
      dispatch(getSessions(userId));
      dispatch(getConsumers(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (sessionStatus === 'loading') {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } 
  }, [sessionStatus]);

  const handleDelete = (id) => {
    dispatch(deleteConsumer(id));
  };

  const handleNameChange = (event) => {
    setConsumerName(event.target.value);
  };

  const handleCourtChange = (event) => {
    setSelectedCourt(event.target.value);
  };

  const handleCourtFilterChange = (event) => {
    setCourtFilter(event.target.value);
  };

  console.log(userId);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!consumerName || !selectedCourt) return;
    dispatch(addConsumer({ name: consumerName, courtId: courtsMapReversed[selectedCourt], user_id: userId }));
    setConsumerName('');
    setSelectedCourt('Суд Минского района');
  };

  const handleCheckCourtSessionForConsumers = () => {
    dispatch(checkCourtSessionsForConsumers(userId));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleDropdown1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const toggleDropdown2 = () => {
    setDropdownOpen2((prev) => !prev);
  };

  const sortedSessions = [...allTheSessions]
    .sort((a, b) => {
      const dateA = parseDateTime(a.date, a.time);
      const dateB = parseDateTime(b.date, b.time);
      return dateA - dateB;
    })

  const sortedConsumers = [...allTheConsumers]
    .sort((a, b) => Number(a.courtId) - Number(b.courtId))
    .filter((el) => {
      return (
        el.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (courtFilter === '' || courtsMap[el.courtId] === courtFilter)
      );
    });

  return (
    <>
      <div className="monthContainer">
      <ToastContainer position="bottom-left"/>
        <div className="month">
          <h5>{formattedDate}</h5>
          <Link to="/">
            <button>На главную</button>
          </Link>
        </div>
      </div>
      <div className="noCases">
        <div className="sessionContainer">
          <div className="box">
            {sessionStatus === 'loading' ? (
              <div className="flex-row">
                <p>Ожидаем ответа от сервера: {timeLeft} секунд осталось</p>
                <div className="loader2"></div>
              </div>
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
            <form className="consumerForm" onSubmit={handleSubmit}>
              <label htmlFor="nameTwo">
                Введите ФИО вашего потребителя или название организации-ответчика
              </label>
              <input
                type="text"
                value={consumerName}
                onChange={handleNameChange}
                name="court"
                id="nameTwo"
                placeholder="Глазков Николай Андреевич"
                autoComplete='true'
              />
              <label htmlFor="court">Выберите суд, который рассматривает данное дело:</label>
              <div className="arrowContainer" onClick={toggleDropdown1}>
              {dropdownOpen1 ? <span className="material-symbols-outlined" >arrow_upward</span> : <span className="material-symbols-outlined" >arrow_downward</span>}
              <select value={selectedCourt}  onChange={handleCourtChange} name="court" id="court">
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
                <option value="Суд Дзержинского района">Суд Дзержинского района</option>
                <option value="Минский городской суд">Минский городской суд</option>
                <option value="Минский областной суд">Минский областной суд</option>
              </select>
              </div>
              <div className="flex-row">
                <button>Внести потребителя (ответчика) в базу данных</button>
                <button
                  type="button"
                  onClick={handleCheckCourtSessionForConsumers}
                  className={status === 'resolved' || sessionStatus !== 'loading' ? 'recycle' : 'grayBtn'}
                >
                  <span className="material-symbols-outlined">update</span>
                </button>
                <Tooltip anchorSelect=".recycle" place="bottom">
                  Обновление информации по судебным заседаниям
                </Tooltip>
              </div>
            </form>
            <p className="guide">
              Данная страница работает следующим очень простым образом:
              <strong> 1)</strong> Вы вносите <strong>ФИО потребителя</strong> или{' '}
              <strong>название организации</strong>, за которыми хотите осуществлять контроль, а также{' '}
              <strong>суд, в котором необходимо осуществлять контроль</strong>;
              <strong> 2)</strong> Каждый раз, когда вы будете посещать наш великолепный сайт,{' '}
              <strong>не забудьте кликнуть на иконку обновления</strong> (рядом с кнопкой внесения информации),
              чтобы актуализировать информацию;
              <strong> 3)</strong> Наш сайт предоставит вам исчерпывающую информацию по поводу всех заседаний,
              назначенных по указанным вами делам.
            </p>
            <div className="toggle-dropdown" onClick={toggleDropdown}>
              <span className="material-symbols-outlined">
                {dropdownOpen ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-content">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  name="court"
                  id="search"
                  placeholder="Поиск по имени потребителя или названию организации"
                />
                <div className='arrowContainer' onClick={toggleDropdown2}>
                {dropdownOpen2 ? <span className="material-symbols-outlined" >arrow_upward</span> : <span className="material-symbols-outlined" >arrow_downward</span>}
                <select value={courtFilter}  onChange={handleCourtFilterChange} name="court" id="court-filter" className="custom-select">
                  <option value="">Поиск по суду</option>
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
                  <option value="Суд Дзержинского района">Суд Дзержинского района</option>
                  <option value="Минский городской суд">Минский городской суд</option>
                  <option value="Минский областной суд">Минский областной суд</option>
                </select>
                </div>
              </div>
            )}
            {sortedConsumers.map((el) => (
              <div className="consumerBox" key={el._id}>
                <p>
                  {el.name} ({courtsMap[el.courtId]})
                </p>
                <button onClick={() => handleDelete(el._id)} className="delButton">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
