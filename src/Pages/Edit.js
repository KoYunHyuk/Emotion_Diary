import React, {useState, useEffect, useContext} from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { DiaryStateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';

function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [originData, setOriginData] = useState();
    
    const diaryList = useContext(DiaryStateContext);
    console.log(diaryList);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it)=>parseInt(it.id) === parseInt(id)
            );
            console.log(targetDiary);

            if(targetDiary){
                setOriginData(targetDiary);
            }else{ // 없는 일기에 접근하려할 때 Home으로 Redirection
                navigate("/", {replace: true});
            }
        }
    }, [id, diaryList])

    return (
        <div className="Edit">
            {originData && 
                <DiaryEditor isEdit={true} originData={originData} />
            }
        </div>
    )
}

export default Edit