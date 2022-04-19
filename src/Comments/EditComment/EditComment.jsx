import React, {useState} from 'react';
import s from "../Comments.module.css"
import {Button, TextField} from "@mui/material";

function EditComment({comments, data, setComments, setVisible}) {

    const [value, setValue] = useState(data.text)

    const editComment = () => {

        const comment = comments.find(el => el.id === data.id)
        if (comment) {
            comment.text = value
        }
        setComments([...comments])
        setValue('')
        setVisible(null)
    }

    return (
        <div className={s.addAnswer}>
            <TextField id="standard-textarea"
                       variant="standard"
                       label="Введите текст комментария"
                       multiline
                       value={value}
                       onChange={event => setValue(event.currentTarget.value)}
                       autoFocus={true}/>
            <div className={s.addAnswerBtn}>
                <Button onClick={() => setVisible(null)}>Отменить</Button>
                <Button onClick={() => editComment()} disabled={data.text === value}>Изменить</Button>
            </div>
        </div>
    );
}

export default EditComment;