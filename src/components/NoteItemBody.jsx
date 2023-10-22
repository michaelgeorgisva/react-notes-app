import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NoteItemBody({ id, title, createdAt, body }) {
  return (
    <div className="note-item__content">
      <Link to={`notes/${id}`} style={{ textDecoration: 'none' }}>
        <h3 className="note-item__title">{title}</h3>
      </Link>
      <p className="note-item__date">{new Date(createdAt).toDateString()}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

NoteItemBody.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItemBody;
