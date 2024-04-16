import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate } from './Month';
import { Link } from 'react-router-dom';
import { makeNewSuite } from '../features/suitesSlice';
import { DocViewer } from 'react-doc-viewer';

export default function SuitMaker() {
    const dispatch = useDispatch();
    const suiteUrl = useSelector(state => state.suites.url)

    const name = useSelector(state => state?.users?.user?.name);
    const savedName = JSON.parse(localStorage.getItem("token")).name

    function transformDateFormat(inputDate) {
      
      // Split the input date string into year, month, and day components
      const [year, month, day] = inputDate.split('-');
      // Create a Date object using the components
      const dateObj = new Date(year, month - 1, day); // Month is zero-based in Date object
      // Extract day, month, and year from the Date object
      const transformedDate = `${dateObj.getDate()}.${dateObj.getMonth() + 1 > 9 ? "" : "0"}${dateObj.getMonth() + 1}.${dateObj.getFullYear()}`;
      
      return transformedDate;
  }
  console.log(suiteUrl);

    const [formData, setFormData] = useState({
        type: '',
        expenses: 1795.29,
        suitor: '',
        libellee: '',
        court: '',
        courtAddress: '',
        date: '',
        date2: '',
        name: name ? name : savedName ? savedName : ""
    });

    const dict = {
      "Заводского района г. Минска": "220107, г. Минск, Партизанский пр., 75А",
      "Центрального района г. Минска": "220030, г. Минск, ул. Кирова, д. 21",
      "Октябрьского района г. Минска": "220045, г. Минск, ул. Семашко, 33",
      "Партизанского района г. Минска": "220045, г. Минск, ул. Семашко, 33",
      "Ленинского района г. Минска": "220045, г. Минск, ул. Семашко, 33",
      "Первомайского района г. Минска": "220076, г. Минск, ул. Ф.Скорины, 6Б",
      "Советского района г. Минска": "220076, г. Минск, ул. Ф.Скорины, 6Б",
      "Фрунзенского района г. Минска": "220092, г. Минск,  ул. Дунина-Марцинкевича, д. 1, корп. 2",
      "Московского района г. Минска": "220083, г. Минск, пр. газеты «Правда», д. 27",
      "Минского района": "220028, г. Минск, ул. Маяковского, д. 119 А",
    }

    function handleInputChange(event) {
      const { name, value } = event.target;
  
      if (name === "court") {
          const address = dict[value] || '';
          setFormData({ ...formData, [name]: value, courtAddress: address });
      } else if (name === "date") {
          const transformedDate = transformDateFormat(value);
          setFormData({ ...formData, [name]: value, date2: transformedDate });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  }

    function handleSubmit() {
      
        setFormData({ ...formData, courtAddress: dict[formData.court] });
        console.log(formData);
        dispatch(makeNewSuite(formData));
    }

    return (
        <div className='suitMaker'>
            <div className='monthContainer'>
                <div className='month'>
                    <h5>{formattedDate}</h5>
                    <Link to="/"><button>На главную</button></Link>
                    <Link to="/trashbin"><span className="material-symbols-outlined green-trash-bin">delete</span></Link>
                </div>
            </div>
            <div className="boxCreator">
                <h1>Создаватель документов РОЗП</h1>

                <table>
                    <tbody>
                        <tr>
                            <td>1. Выберите тип документа:</td>
                            <td>
                                <select name="type" value={formData.type} onChange={handleInputChange}>
                                    <option value="" disabled>Тип документа</option>
                                    <option value="EXPENSES">Увеличение расходов</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="flexContainer">
                    <label htmlFor="expenses">2. Выберете размер расходов: </label>
                    <input type='number' name="expenses" value={formData.expenses} onChange={handleInputChange} placeholder='Размер расходов' />
                </div>

                <div className="flexContainer">
                    <label htmlFor="suitor">3. Истец: </label>
                    <input type='text' name="suitor" value={formData.suitor} onChange={handleInputChange} placeholder='Истец' />
                    <label htmlFor="libellee">4. Ответчик: </label>
                    <input type='text' name="libellee" value={formData.libellee} onChange={handleInputChange} placeholder='Ответчик' />
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>4. Выберите суд:</td>
                            <td>
                            <select name="court" value={formData.court} onChange={handleInputChange}>
                                    <option value="" disabled>Суд</option>
                                    <option value="Заводского района г. Минска">Суд Заводского района г. Минска</option>
                                    <option value="Центрального района г. Минска">Суд Центрального района г. Минска</option>
                                    <option value="Московского района г. Минска">Суд Московского района г. Минска</option>
                                    <option value="Октябрьского района г. Минска">Суд Октябрьского района г. Минска</option>
                                    <option value="Ленинского района г. Минска">Суд Ленинского района г. Минска</option>
                                    <option value="Партизанского района г. Минска">Суд Партизанского района г. Минска</option>
                                    <option value="Первомайского района г. Минска">Суд Первомайского района г. Минска</option>
                                    <option value="Советского района г. Минска">Суд Советского района г. Минска</option>
                                    <option value="Фрунзенского района г. Минска">Суд Фрунзенского района г. Минска</option>
                                    <option value="Минского района">Суд Минского района</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flexContainer">
                    <label htmlFor="date">5. Дата судебного заседания: </label>
                    <input type='date' name="date" value={formData.date} onChange={handleInputChange} placeholder='Дата' />
                </div>

                <button className='documentCreatorBtn' onClick={handleSubmit}>Создать документ</button>

            </div>
            {suiteUrl &&  <DocViewer documents={[{ uri: suiteUrl }]}/>}
        </div>
    );
}
