import React, { useEffect, useState } from 'react';
import NoteDetail from '../components/NoteDetail';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function firstMount() {
      const { data } = await getNote(id);
      setNote(data);
      setLoading(false);
    }

    firstMount();

    return () => {
      setLoading(true);
    };
  }, []);

  if (loading) {
    return (
      <>
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  if (note === null) {
    return <p>Note is not found</p>;
  }

  return <NoteDetail {...note} />;
}

export default DetailPage;
