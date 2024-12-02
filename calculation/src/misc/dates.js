const genitiveMonths = {
    январь: "января",
    февраль: "февраля",
    март: "марта",
    апрель: "апреля",
    май: "мая",
    июнь: "июня",
    июль: "июля",
    август: "августа",
    сентябрь: "сентября",
    октябрь: "октября",
    ноябрь: "ноября",
    декабрь: "декабря"
  };
  
 export const formatToRussianMonthYear = (dateString, useGenitive = false) => {
    const [day, month, year] = dateString?.split('.'); // Split the date
    const date = new Date(`${year}-${month}-${day}`); // Create a Date object
  
    // Extract the nominative month name
    const formatter = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' });
    const formattedDate = formatter.format(date); // E.g., "сентябрь 2024"
    const [nominativeMonth, yearPart] = formattedDate?.split(' ');
  
    // Replace with genitive month if needed
    const monthName = useGenitive ? genitiveMonths[nominativeMonth] : nominativeMonth;
  
    return `${monthName} ${yearPart} г.`;
  };