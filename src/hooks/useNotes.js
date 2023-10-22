import React, { useEffect, useState } from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/network-data';

function useNotes(status) {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      if (status === 'active') {
        const { data } = await getActiveNotes();
        setNotes(data);
      }
      if (status === 'archived') {
        const { data } = await getArchivedNotes();
        setNotes(data);
      }
      setLoading(false);
    })();

    return () => {
      setLoading(true);
    };
  }, []);

  return [notes, setNotes, loading];
}

export default useNotes;
