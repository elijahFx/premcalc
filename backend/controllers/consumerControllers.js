const fetch = require('node-fetch');
const Consumer = require("../models/Consumer")
const mongoose = require("mongoose")
const { JSDOM } = require('jsdom');
const { HttpsProxyAgent } = require('https-proxy-agent');

const proxyUrl = 'https://93.85.103.195:8080'; // Replace with your proxy URL
const agent = new HttpsProxyAgent(proxyUrl);

const url = 'https://service.court.gov.by/ru/public/schedule/schedule';
const apiUrl = 'https://premcalc.onrender.com/sessions';

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
    103: "Минский областной суд",
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
      agent
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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
    const [day, month, year] = dateStr.split('.').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }
  


const addConsumer = async (req, res) => {
    const newConsumer = req.body
    
    const consumerToAdd = new Consumer(newConsumer);
    await consumerToAdd.save();
      
    
    res.status(200).json({ added: consumerToAdd });
}

const getConsumers = async (req, res) => {
    const consumers = await Consumer.find({}).sort({createdAt: 1})
    res.status(200).json(consumers)
}

const deleteConsumer = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого потребителя"})
    }

    const consumer = await Consumer.findOneAndDelete({ _id: id})

    if(!consumer) {
        return res.status(404).json({err: "Нет такого потребителя"})
    }

    res.status(200).json(consumer)

}

const checkCourtSessionsForConsumers = async (req, res) => {
    const { id } = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({err: "Нет такого потребителя"})
    }

    const consumers = await Consumer.find({ user_id: id }).sort({createdAt: 1})

    if(!consumers) {
        return res.status(404).json({err: "Нет такого потребителей"})
    }

    const potrebosses = consumers.map(consumer => ({
        name: consumer.name,
        courtId: consumer.courtId
      }));

      console.log(potrebosses);


      const allCases = [];

      for (const potreboss of potrebosses) {
        const cases = await fetchCourtData(potreboss.name, potreboss.courtId);
        allCases.push(...cases);
      }
    
      allCases.sort((a, b) => {
        const dateA = parseDateAndTime(a.date, a.time);
        const dateB = parseDateAndTime(b.date, b.time);
        return dateA - dateB;
      });
    
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(allCases)
        });
    
        if (!response.ok) {
          throw new Error(`Failed to send data: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log('Successfully sent cases to the server:', result);
        res.status(200).json(result);
      } catch (error) {
        console.error('Error sending cases to the server:', error);
        res.status(500).json({ err: 'Error sending cases to the server' });
      }
      
    
}


module.exports = {
    addConsumer,
    getConsumers,
    deleteConsumer,
    checkCourtSessionsForConsumers
}