import React, {useState} from 'react';
import DeleteComment from "../DeleteComment/DeleteComment";
import EditComment from "../EditComment/EditComment";
import s from "./Comment.module.css"
import AddAnswer from "../AddAnswer";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";

function Comment({data, setComments, index, comments}) {

    const {author, text, children, date} = data;
    const [visible, setVisible] = useState(null);
    const [visibleMenu, setVisibleMenu] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = (value) => {
        setAnchorEl(null);
        setVisible(value)
    };

    console.log(visible)

    return (
        <div className={s.comment} >

          <div onMouseEnter={()=> setVisibleMenu(true)} onMouseLeave={() => setVisibleMenu(false)}>
              {visibleMenu &&
                  <div className={s.menu}>
                      <Button
                          id="demo-positioned-button"
                          aria-controls={open ? 'demo-positioned-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                      >
                          <span style={{fontSize: '24px', fontWeight: 'bold'}}>⁝</span>
                      </Button>
                      <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                          }}
                      >
                          <MenuItem onClick={() => handleClose('edit')}>Изменить</MenuItem>
                          <MenuItem onClick={() => handleClose('delete')}>Удалить</MenuItem>
                      </Menu>
                  </div>
              }
              <div className={s.commentInfo}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                  <span className={s.author}>{author}</span>
                  <span className={s.date}>{date}</span>
              </div>
              <p className={s.text}>{text}</p>

              <Button onClick={() => setVisible('reply')}>Ответить</Button>
              {visible === 'reply' &&
                  <AddAnswer setComments={setComments} comments={comments} data={data} setVisible={setVisible}/>}
              {visible === 'edit' &&
                  <EditComment setComments={setComments} comments={comments} data={data} setVisible={setVisible}/>}
              {visible === 'delete' &&
                  <DeleteComment setComments={setComments} comments={comments} data={data} setVisible={setVisible}/>}
          </div>
            {
                children &&
                children.map((i, n) => {
                    return <Comment data={i} key={n}
                                    setComments={setComments} index={`${n}children ${index}`}
                                    comments={comments}/>
                })
            }
        </div>
    );
}

export default Comment;