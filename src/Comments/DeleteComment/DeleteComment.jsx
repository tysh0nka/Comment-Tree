import React, {useState} from 'react';
import s from "../Comments.module.css"
import {Button, TextField} from "@mui/material";

function DeleteComment({data, setComments, comments, setVisible}) {

    const [value, setValue] = useState('')

    const deleteComment = () => {
        const comment = comments.find(el => el.id === data.id)
        if (comment) {
            comment.text = `Комментарий был удален модератором по причине: ${value}`
        }
        setComments([...comments])
        setVisible(null)
    }

    return (
        <div className={s.addAnswer}>
            <TextField id="standard-textarea"
                       variant="standard"
                       label="Причина удаления"
                       multiline
                       value={value}
                       onChange={event => setValue(event.currentTarget.value)}
                       autoFocus={true}/>
            <div className={s.addAnswerBtn}>
                <Button onClick={() => setVisible(null)}>Отменить</Button>
                <Button variant={'contained'} onClick={deleteComment} disabled={!value}>Удалить</Button>
            </div>
        </div>
    );
}

export default DeleteComment;