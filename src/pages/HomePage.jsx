import React from 'react';
import NoteInput from '../components/NoteInput';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import {
  addNote,
  archiveNote,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
  unarchiveNote,
} from '../utils/network-data';
import useNotes from '../hooks/useNotes';
// import { useNavigate } from 'react-router-dom';

function HomePage({ searchKeyword }) {
  const [activeNotes, setActiveNotes, activeLoading] = useNotes('active');
  const [archivedNotes, setArchivedNotes, archivedLoading] =
    useNotes('archived');

  const onDeleteActiveNoteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setActiveNotes(data);
  };

  const onDeleteArchivedNoteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getArchivedNotes();
    setArchivedNotes(data);
  };

  const onArchivedNoteHandler = async (id) => {
    await archiveNote(id);
    const { data: activeNote } = await getActiveNotes();
    const { data: archivedNote } = await getArchivedNotes();
    setActiveNotes(activeNote);
    setArchivedNotes(archivedNote);
  };

  const onUnarchivedNoteHandler = async (id) => {
    await unarchiveNote(id);
    const { data: activeNote } = await getActiveNotes();
    const { data: archivedNote } = await getArchivedNotes();
    setActiveNotes(activeNote);
    setArchivedNotes(archivedNote);
  };

  const onAddNoteHandler = async (contact) => {
    const { error } = await addNote(contact);
    console.log(error);
    if (!error) {
      const { data } = await getActiveNotes();
      setActiveNotes(data);
    }
  };

  return (
    <>
      <NoteInput addNote={onAddNoteHandler} />
      <h2>Catatan Aktif</h2>
      <NoteList
        notes={activeNotes}
        loading={activeLoading}
        onDelete={onDeleteActiveNoteHandler}
        onSwitchState={onArchivedNoteHandler}
        actionButton="Arsipkan"
        keyWord={searchKeyword}
      />
      <h2>Arsip</h2>
      <NoteList
        notes={archivedNotes}
        loading={archivedLoading}
        onDelete={onDeleteArchivedNoteHandler}
        onSwitchState={onUnarchivedNoteHandler}
        actionButton="Pindahkan"
        keyWord={searchKeyword}
      />
    </>
  );
}

HomePage.propTypes = {

  searchKeyword: PropTypes.string.isRequired,
};

export default HomePage;
