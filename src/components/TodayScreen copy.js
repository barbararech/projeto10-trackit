import axios from 'axios';

export default function TodayScreenCheck({id, idChecked, setIdChecked, event, config, setTodayHabits}) {
   
    CheckHabit(id, event);

    function CheckHabit(id, event, idChecked){
        const body = {
            id,
        };
        const checked = idChecked.some(e => e === id);

        if (!checked) {
            setIdChecked([...idChecked, id])
            CheckHabitAPI(id, event, body);
        } else {
            const newChecked = idChecked.filter(e => e !== id);
            setIdChecked(newChecked);
            UncheckHabitAPI(id, event, body);
        }
    }

    function CheckHabitAPI(id, event, body, setTodayHabits, config) {
        event.preventDefault();
        
        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, body, config);
        
        promise.then((response) => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promise.then((response) => {
                const { data } = response;
                setTodayHabits(data);
            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        })
    }

    function UncheckHabitAPI(id, event, body, setTodayHabits, config, setIdChecked){
        event.preventDefault();

        const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, body, config);

        promise.then((response) => {
            const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", config)

            promise.then((response) => {
                const { data } = response;
                // setTodayHabits(data);
                const newChecked = idChecked.filter(e => e !== id);
                setIdChecked(newChecked);

            });
        });

        promise.catch(err => {
            const message = err.response.statusText;
            alert(message);
        })
    }
    return(
        <></>
    )
}
