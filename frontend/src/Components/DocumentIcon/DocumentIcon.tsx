import { IUser } from "../../interfaces/user";
import { useState, useRef, useEffect } from "preact/hooks";
import { useAxios } from "../../utils/api";
import { IDoc } from "../../interfaces/docs";
import Modal from "../Modal/Modal";
import { useDoc } from "../../context/DocContext";
import { useAuth } from "../../context/AuthContext";

type Props = {
  docId: IDoc["id"];
  name: string;
  sharedUserMails: IUser["email"][];
};

const DocumentIcon = ({ docId, name, sharedUserMails }: Props) => {
  console.log("sharedUserMails: ", sharedUserMails);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser["email"] | null>(null);
  const [sharedUsersTooltipOpen, setSharedUsersTooltipOpen] = useState(false);
  const sharedUsersTooltipRef = useRef<HTMLDivElement | null>(null);
  const { setSelectedDoc, docs } = useDoc();
  const { user } = useAuth();

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLDivElement;
    if (
      sharedUsersTooltipRef.current &&
      !sharedUsersTooltipRef.current.contains(target)
    ) {
      setSharedUsersTooltipOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentDoc = docs.find(
    (doc) => doc.id === docId && doc.owner_id === user?.id,
  );

  const shareUser = (docId: number) => {
    return () => {
      if (!selectedUser) return;
      (async () => {
        console.log("async execution happened");
        await useAxios("/shares", "post", { email: selectedUser, docId });
      })();
    };
  };

  return (
    <div className="w-24 h-32 rounded-md mt-1.5 border-4 border-black cent flex-col relative overflow-hidden gap-[1px]">
      <p className="nice-text">Name: {name}</p>
      {currentDoc && (
        <div className="flex">
          <p className="nice-text">Share!</p>
          <img
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="w-4 h-max rounded-md mt-1.5"
            src="/share.svg"
            alt="document-symbol"
          />
        </div>
      )}
      <button onClick={() => setSelectedDoc(docId)}>
        <p>Open!</p>
      </button>

      <button onClick={() => setSharedUsersTooltipOpen(true)}>
        <p>See Shared Users</p>
      </button>

      {sharedUsersTooltipOpen && (
        <div
          className="bg-black text-white right-0 w-32 h-64 absolute overflow-x-scroll"
          ref={sharedUsersTooltipRef}
        >
          {sharedUserMails.map((mail) => (
            <p className="nice-text">{mail}</p>
          ))}
        </div>
      )}
      <Modal
        isModalOpen={isModalOpen}
        handleConfirm={shareUser(docId)}
        setIsModalOpen={setIsModalOpen}
        body="Who would you like to share this file with?"
        title="Share File!"
        cancelButton="Cancel"
        confirmButton="Share"
        children={
          <div className="text-black cent flex-col gap-2">
            <label for="#user-email">Email:</label>
            <input
              id="user-email"
              className="form-input"
              placeholder="user email..."
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                setSelectedUser(input.value);
              }}
            />
          </div>
        }
      />
    </div>
  );
};

export default DocumentIcon;
