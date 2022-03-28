import React, { useRef, useReducer } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Home from './Pages/Home'
import New from './Pages/New'
import Edit from './Pages/Edit'
import Diary from './Pages/Diary'
import { useEffect } from 'react';

const reducer = (state, action) => {
  let newState = [];
  switch(action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT" : {
      newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
      break;
    }
    default: 
      return state;
  }

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1번",
    date: 1647959446735
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2번",
    date: 1647959446736
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3번",
    date: 1647959446737
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4번",
    date: 1647959446738
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5번",
    date: 1647959446739
  },
]

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  useEffect(()=>{
    const localData = localStorage.getItem("diary");
    if(localData){
      const diaryList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));
      dataId.current = parseInt(diaryList[0].id + 1);

      console.log(diaryList);
      console.log(dataId);
  
      dispatch({type: "INIT", data: diaryList});
    }

  }, []);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE", 
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  }

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion
      },
    })
  } 

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;