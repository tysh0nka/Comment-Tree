import React, {useEffect, useState} from 'react';
import AddComment from "./AddComment/AddComment";
import Comment from "./Comment/Comment";
import s from "./Comments.module.css"
import {Button} from "@mui/material";

function Comments() {

    // Храним данные в локальном стейте
    const [comments, setComments] = useState([
        {
            id: '1',
            parentId: '0',
            author: 'author1',
            text: 'texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext',
            date: '24.03.2022'
        },
        {id: '2', parentId: '0', author: 'author2', text: 'text', date: '24.03.2022'},
        {id: '3', parentId: '0', author: 'author3', text: 'text', date: '24.03.2022'},
        {id: '4', parentId: '1', author: 'author4', text: 'text', date: '24.03.2022'},
        {id: '5', parentId: '0', author: 'author5', text: 'text', date: '24.03.2022'},
        {id: '6', parentId: '0', author: 'author6', text: 'text', date: '24.03.2022'},
        {id: '7', parentId: '0', author: 'author7', text: 'text', date: '24.03.2022'},
        {id: '8', parentId: '0', author: 'author8', text: 'text', date: '24.03.2022'},
        {id: '9', parentId: '0', author: 'author9', text: 'text', date: '24.03.2022'},
        {id: '10', parentId: '1', author: 'author10', text: 'text', date: '24.03.2022'},
        {id: '11', parentId: '4', author: 'author11', text: 'text', date: '24.03.2022'},
        {id: '12', parentId: '0', author: 'author11', text: 'text', date: '24.03.2022'},
        {id: '13', parentId: '0', author: 'author11', text: 'text', date: '24.03.2022'},
        {id: '14', parentId: '0', author: 'author11', text: 'text', date: '24.03.2022'},
        {id: '15', parentId: '0', author: 'author12', text: 'text', date: '24.03.2022'},
        {id: '16', parentId: '0', author: 'author13', text: 'text', date: '24.03.2022'},
        {id: '17', parentId: '0', author: 'author15', text: 'text', date: '24.03.2022'},
        {id: '18', parentId: '0', author: 'author16', text: 'text', date: '24.03.2022'},
        {id: '19', parentId: '0', author: 'author17', text: 'text', date: '24.03.2022'},
        {id: '20', parentId: '0', author: 'author112', text: 'text', date: '24.03.2022'},
        {id: '21', parentId: '0', author: 'author1112', text: 'text', date: '24.03.2022'},
        {id: '22', parentId: '0', author: 'author1321', text: 'text', date: '24.03.2022'},
        {id: '23', parentId: '0', author: 'author1331', text: 'text', date: '24.03.2022'},
        {id: '24', parentId: '0', author: 'author1dd1', text: 'text', date: '24.03.2022'},
        {id: '25', parentId: '0', author: 'author1sd1', text: 'text', date: '24.03.2022'},
        {id: '26', parentId: '0', author: 'author1ss1', text: 'text', date: '24.03.2022'},

    ])

    const list = [] // Переходный массив для измененного стейта

    const [com, setCom] = useState([]) // Измененный стейт

    const [countComments, setCountComments] = useState(10) // Кол-во отрисованных комментариев

    // функция для изменения архитектуры начального стейта
    const changeState = (item, comments) => {
        const result = {
            id: item.id,
            parentId: item.parentId,
            author: item.author,
            text: item.text,
            date: item.date,
            children: []
        };

        let children = [];
        comments.filter(i => i.parentId === item.id)
            .forEach(i => children.push(changeState(i, comments)));
        if (children.length > 0) {
            result.children = (children);
        }
        return result;
    }

    // функция для кнопки "Показать еще"
    const next = (value) => {
        setCom(list.filter(f => f.parentId === '0').filter((f, i) => i < value))
    }


    useEffect(() => {
        comments.forEach(item => {
            list.push(changeState(item, comments)); // вызов функции изменения стейта
        });
        next(countComments)
    }, [countComments, comments])


    return (
        <div className={s.comments} >
            <AddComment
                setComments={setComments}
                comments={comments}
                // setVisible={setAddComment}
            />
            {com.map((i, n) => <Comment data={i}
                                        key={n}
                                        index={n}
                                        setComments={setComments}
                                        comments={comments}/>)}
            <div className={s.showMore}>
                <Button variant={'text'} onClick={() => setCountComments(countComments + 10)}
                        disabled={com.length < countComments}>
                    Показать еще
                </Button>
            </div>
        </div>
    );
}

export default Comments;