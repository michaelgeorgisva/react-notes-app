import React from 'react';
import PropTypes from 'prop-types';

import NoteItemBody from './NoteItemBody';

function NoteItem({
  id,
  title,
  createdAt,
  body,
  onDelete,
  onSwitchState,
  actionButton,
}) {
  return (
    <div className="note-item">
      <NoteItemBody id={id} title={title} createdAt={createdAt} body={body} />
      <div className="note-item__action">
        <button
          className="note-item__delete-button"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
        <button
          className="note-item__archive-button"
          onClick={() => onSwitchState(id)}
        >
          {actionButton}
        </button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSwitchState: PropTypes.func.isRequired,
  actionButton: PropTypes.string.isRequired,
};

export default NoteItem;
