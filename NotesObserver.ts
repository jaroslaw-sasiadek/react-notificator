type NotesType = "success" | "error";

export interface NotesProps {
  id: string;
  type: NotesType;
  note: string;
}

type NotesCallback = (props: NotesProps) => void;

class NotesObserver {
  private observer: NotesCallback | null = null;
  private lastId: number = 0;

  subscribe = (handler: NotesCallback) => {
    if (this.observer) throw new Error("Use only one 'NotesContainer'!");
    this.observer = handler;
  };

  unsubscribe = () => {
    this.observer = null;
  };

  private generateUniqueId = () => {
    return (this.lastId += 1).toString();
  };

  private notify = (type: NotesType, note: string) => {
    setTimeout(() => {
      if (!this.observer) throw new Error("There is no 'NotesContainer'!");
      const id = this.generateUniqueId();
      this.observer({ id, type, note });
    }, 100);
  };

  notifySuccess = (note: string) => this.notify("success", note);
  notifyError = (note: string) => this.notify("error", note);
}

const notesObserver = new NotesObserver();

export const observer = {
  subscribe: notesObserver.subscribe,
  unsubscribe: notesObserver.unsubscribe,
};
export const notify = {
  success: notesObserver.notifySuccess,
  error: notesObserver.notifyError,
};
