import { useState, useEffect } from "react";

import { NotesProps, observer } from "./NotesObserver";

export const useNotesContainer = () => {
  const [notes, setNotes] = useState<NotesProps[]>([]);

  useEffect(() => {
    const handleNote = (props: NotesProps) => {
      setNotes((prevNotes) => [...prevNotes, props]);
    };

    observer.subscribe(handleNote);
    return () => observer.unsubscribe();
  }, []);

  function handleClick(id: string) {
    setTimeout(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    }, 100);
  }

  return { notes, handleClick };
};
