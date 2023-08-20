import React, { useState } from "react";
import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { TiThumbsUp, TiThumbsDown, TiTrash, TiEdit } from "react-icons/ti";
import { TfiSave } from "react-icons/tfi";
import { formatDateToNow } from "../../helpers/formatDateToNow";
import { Button } from "../Button/Button";
import {
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "../../redux/commentApi";

export const Comment = ({
  createdAt,
  content,
  author,
  avatar,
  thumbsUp,
  thumbsDown,
  id,
}) => {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [updateComment, { isLoading: isLoadingUpdate }] =
    useUpdateCommentMutation();

  const handleDelete = async () => {
    try {
      await deleteComment(id);
      toast.success("comment deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleSave = async () => {
    try {
      await updateComment({ id, content: editedContent });
      setIsEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setEditedContent(e.target.value);
  };

  return (
    <li className={styles.card}>
      <img className={styles.avatar} src={avatar} alt={author} />
      <div className={styles.cardWrapper}>
        <div className={styles.cardBody}>
          <h3 className={styles.author}>{author}</h3>
          <p className={styles.content}>
            <span className={styles.blockquote}>"</span>
            {isEdit ? (
              <textarea
                className={styles.input}
                name="text"
                rows="5"
                value={editedContent}
                onChange={handleChange}
              ></textarea>
            ) : (
              content
            )}
            <span className={styles.blockquote}>"</span>
          </p>
        </div>
        <div className={styles.btnTrash} onClick={handleDelete}>
          <TiTrash size={36} />
        </div>
        {isEdit ? (
          <div className={styles.btnSaveEdit} onClick={handleSave}>
            <TfiSave size={36} />
          </div>
        ) : (
          <div className={styles.btnSaveEdit} onClick={handleEdit}>
            <TiEdit size={36} />
          </div>
        )}
        <div className={styles.cardFooter}>
          <span className={styles.date}>{formatDateToNow(createdAt)}</span>

          <div className={styles.buttonBox}>
            <Button counter={thumbsUp} id={id}>
              <TiThumbsUp className={styles.icon} />
            </Button>

            <Button counter={thumbsDown} role="thumbsDown" id={id}>
              <TiThumbsDown className={styles.icon} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  thumbsUp: PropTypes.number.isRequired,
  thumbsDown: PropTypes.number.isRequired,
};
