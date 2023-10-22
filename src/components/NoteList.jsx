import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import useNotes from '../hooks/useNotes';

function NoteList({
  notes,
  loading,
  onDelete,
  onSwitchState,
  actionButton,
  keyWord,
}) {
  // const [notes, loading] = useNotes(status);
  // console.log(notes);

  if (loading === true) {
    return (
      <>
        <div className="note-list__loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return notes.length === 0 ? (
    <h3 className="notes-list__empty-message">Tidak ada catatan</h3>
  ) : (
    <div className="notes-list">
      {notes.map((note) => {
        if (
          !note.title.toLowerCase().includes(keyWord.toLowerCase()) &&
          !note.body.toLowerCase().includes(keyWord.toLowerCase())
        ) {
          return;
        }

        return (
          <NoteItem
            {...note}
            key={note.id}
            onDelete={onDelete}
            onSwitchState={onSwitchState}
            actionButton={actionButton}
          />
        );
      })}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSwitchState: PropTypes.func.isRequired,
  actionButton: PropTypes.string.isRequired,
  keyWord: PropTypes.string.isRequired,
};

export default NoteList;
