import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getAllRDV } from "./api/TB";
import dayjs from "dayjs";

function App() {
  const [count, setCount] = useState(0);
  const [books, setBooks] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = (year, month) => {
    const days = [];
    const firstDay = new Date(year, month).getDay();
    const totalDays = daysInMonth(year, month);

    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push(null);
        } else if (day > totalDays) {
          break;
        } else {
          week.push(day);
          day++;
        }
      }
      days.push(week);
    }

    return days;
  };

  const monthData = getMonthData(currentYear, currentMonth);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleClick = (day) => {
    setSelectedDate(day);
  };

  useEffect(() => {
    getAllRDV()
      .then((result) => {
        //console.log("result", result)
        setBooks(result);
      })
      .catch((err) => console.log(err.message));


      
  }, []);

  console.log("Books:", books);

  return (
    <>
      <h1 className="title"> Mes rendez-vous </h1>

      <h2 className="nombre">Il y a actuellement {books.length} RDV</h2>
      <div className="books">
        {books.map((list) => {
          return (
            <div className="rdv">
              {dayjs(list.date).format("dddd DD YYYY")} -
              {list.heure} -{" "}
              {list.client.nom}{" "}
              {list.client.prenom}{" "}
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={handlePrevMonth}>Mois précédent</button>
        <h2>{selectedDate} {months[currentMonth]} {currentYear}</h2>
        <button onClick={handleNextMonth}>Mois suivant</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Lun</th>
            <th>Mar</th>
            <th>Mer</th>
            <th>Jeu</th>
            <th>Ven</th>
            <th>Sam</th>
            <th>Dim</th>
          </tr>
        </thead>
        <tbody>
          {monthData.map((week, index) => (
            <tr key={index}>
              {week.map((day, idx) => (
                <td
                  key={idx}
                  onClick={() => handleClick(day)}
                  style={{ cursor: 'pointer', backgroundColor: day === selectedDate ? 'blue' : 'black' }}
                >
                  {day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>


    </>
  );
}

export default App;
