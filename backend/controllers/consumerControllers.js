const fetch = require('node-fetch');
const Consumer = require("../models/Consumer")
const mongoose = require("mongoose")
const { JSDOM } = require('jsdom');


const url = 'https://service.court.gov.by/ru/public/schedule/schedule';
const apiUrl = 'https://premiumcalculator.site/sessions';

const courtsMap = {
    93: "Минский городской суд",
    94: "Суд Ленинского района г. Минска",
    95: "Суд Фрунзенского района г. Минска",
    96: "Суд Октябрьского района г. Минска",
    97: "Суд Центрального района г. Минска",
    98: "Суд Партизанского района г. Минска",
    99: "Суд Первомайского района г. Минска",
    100: "Суд Заводского района г. Минска",
    101: "Суд Советского района г. Минска",
    102: "Суд Московского района г. Минска",
    103: "Минский областной суд",
    109: "Суд Дзержинского района",
    115: "Суд Минского района"
  };

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  function getFormattedDate() {
    return formatDate(new Date());
  }
  
  function getDatePlus30Days() {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);
    return formatDate(futureDate);
  }

  async function fetchCourtData(name, courtId) {
    const data = {
      t: `${Date.now()}`,
      CourtId: courtId,
      time: `${Date.now() - 2}`,
      RecaptchaResponse: '',
      StartDate: getFormattedDate(),
      EndDate: getDatePlus30Days(),
      Name: name
    };

  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'https://service.court.gov.by/',
        'Origin': 'https://service.court.gov.by',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: new URLSearchParams(data).toString(),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        console.log(`${response.status}`);
      }
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
  
      const rows = document.querySelectorAll('tbody tr');
      const cases = [];
  
      rows.forEach(row => {
        const caseDetails = {
          name: row.children[6].textContent.trim(),
          date: row.children[1].textContent.trim(),
          time: row.children[2].textContent.trim(),
          courtRoom: row.children[3].textContent.trim(),
          liabelee: row.children[7].textContent.trim(),
          judge: row.children[8].textContent.trim(),
          type: row.children[5].textContent.trim(),
          court: courtsMap[courtId]
        };
  
        cases.push(caseDetails);
      });
  
      return cases;
    } catch (error) {
      console.error('Error fetching court data:', error);
      return [];
    }
  }
  
  function parseDateAndTime(dateStr, timeStr) {
    if(dateStr && timeStr) {
      const [day, month, year] = dateStr.split('.').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    }
  }

const addConsumer = async (req, res) => {
    const newConsumer = req.body
    
    const consumerToAdd = new Consumer(newConsumer);
    await consumerToAdd.save();
      
    
    res.status(200).json({ added: consumerToAdd });
}

const getConsumers = async (req, res) => {

    const { id } = req.params
    
    if(!id) {
      res.status(400).json({err: "Нет такого пользователя"})
    }

    const consumers = await Consumer.find({ user_id: id }).sort({createdAt: 1})
    res.status(200).json(consumers)
}

const deleteConsumer = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Нет такого потребителя" });
  }

  try {
    // Find and delete the consumer by ID
    const consumer = await Consumer.findOneAndDelete({ _id: id });

    // If the consumer doesn't exist, return a 404 error
    if (!consumer) {
      return res.status(404).json({ err: "Нет такого потребителя" });
    }

    // Return the deleted consumer object as a response
    res.status(200).json(consumer);
  } catch (error) {
    // Log the error and return a 500 error response if something goes wrong
    console.error('Error deleting consumer:', error);
    res.status(500).json({ err: "Ошибка при удалении потребителя" });
  }
};

const checkCourtSessionsForConsumers = async (req, res) => {
  const { id } = req.params;

  const authHeader = req.headers.authorization;
  let token;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else {
    return res.status(401).json({ err: 'Unauthorized' });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "Нет такого потребителя" });
  }

  try {
    const consumers = await Consumer.find({ user_id: id }).sort({ createdAt: 1 });

    if (!consumers.length) {
      return res.status(404).json({ err: "У вас вообще нет потребителей" });
    }

    const potrebosses = consumers.map(consumer => ({
      name: consumer.name,
      courtId: consumer.courtId
    }));

    const allCases = [];

    // Define the court IDs to search when courtId is 1000
    const allCourtIds = [93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 109, 115];

    for (const potreboss of potrebosses) {
      if (potreboss.courtId === 1000 || potreboss.courtId === "1000") {
        console.log(`мы туту`);
        // Check court sessions in all courts
        for (const courtId of allCourtIds) {
          const cases = await fetchCourtData(potreboss.name, courtId);
          console.log(cases);
          console.log(`мы туту ${courtsMap[courtId]}`);
          allCases.push(...cases);
        }
      } else {
        // Check court sessions for the specific court ID
        const cases = await fetchCourtData(potreboss.name, potreboss.courtId);
        allCases.push(...cases);
      }
    }

    // Sort cases by date and time
    allCases.sort((a, b) => {
      const dateA = parseDateAndTime(a.date, a.time);
      const dateB = parseDateAndTime(b.date, b.time);
      return dateA - dateB;
    });

    // Add user_id to each case
    const casesWithUserId = allCases.map(caseItem => ({
      ...caseItem,
      user_id: id
    }));

    // Send cases to the server
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(casesWithUserId),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response from server:', response.status, errorBody);
      throw new Error(`Failed to send data: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Successfully sent cases to the server:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error sending cases to the server:', error.stack);
    res.status(500).json({ err: `Error sending cases to the server: ${error.message}` });
  }
};


module.exports = {
    addConsumer,
    getConsumers,
    deleteConsumer,
    checkCourtSessionsForConsumers
}