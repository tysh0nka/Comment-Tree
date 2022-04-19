import React, {useState} from 'react';
import s from "./Comments.module.css"
import {Button, TextField} from "@mui/material";

function AddAnswer({setComments, comments, data, setVisible}) {

    const [value, setValue] = useState('')

    const addAnswer = (parentId) => {
        const newComment = {
            id: new Date().valueOf().toString(),
            parentId,
            text: value,
            date: new Date().toLocaleString(),
            author: `author ${new Date().valueOf().toString()}`
        }
        setComments([...comments, newComment])
        setValue('')
        setVisible(null)
    }

    return (
        <div className={s.addAnswer}>
            <TextField id="standard-textarea"
                       variant="standard"
                       label="Введите ответ"
                       multiline
                       value={value}
                       onChange={event => setValue(event.currentTarget.value)}
            />
            <div className={s.addAnswerBtn}>
                <Button onClick={() => setVisible(null)}>Отменить</Button>
                <Button variant="contained" onClick={() => addAnswer(data ? data.id : '0')}
                        disabled={!value}>Добавить
                </Button>
            </div>
        </div>
    );
}

export default AddAnswer;