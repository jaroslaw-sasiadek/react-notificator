import { useNotesContainer } from "./useNotesContainer";
import "./NotesContainer.css";

export const NotesContainer = () => {
  const { notes, handleClick } = useNotesContainer();

  return (
    <ul id="notify">
      {notes.map(({ id, type, note }) => (
        <li
          key={id}
          onDoubleClick={() => handleClick(id)}
          className={`notify__li notify--${type}`}
        >
          {note}
        </li>
      ))}
    </ul>
  );
};
