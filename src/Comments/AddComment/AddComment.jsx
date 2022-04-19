import React, {useState} from 'react';
import s from "../Comments.module.css"
import {Button, TextField} from "@mui/material";

function AddComment({setComments, comments, data}) {

    const [value, setValue] = useState('')
    const [visible, setVisible] = useState(false)

    const addComment = (parentId) => {
        const newComment = {
            id: new Date().valueOf().toString(),
            parentId,
            text: value,
            date: new Date().toLocaleString(),
            author: `author ${new Date().valueOf().toString()}`
        }
        setComments([...comments, newComment])
        setValue('')
        setVisible(false)
    }

    console.log(visible)

    return (
        <div className={s.addComment}>
            <TextField id="standard-textarea"
                       variant="standard"
                       label="Введите текст комментария"
                       multiline
                       value={value}
                       onChange={event => setValue(event.currentTarget.value)}
                       onFocus={() => setVisible(true)}
            />
            {visible && <div>
                <Button onClick={() => setVisible(null)}>Отменить</Button>
                <Button variant="contained"
                        onClick={() => addComment(data ? data.id : '0')}
                        disabled={!value}>Добавить
                </Button>
            </div>}
        </div>
    );
}

export default AddComment;