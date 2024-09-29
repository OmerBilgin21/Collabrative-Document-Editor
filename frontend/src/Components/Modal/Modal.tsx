import { ReactNode } from "preact/compat";
import { useRef, useEffect, Dispatch } from "preact/hooks";

interface IProps {
  handleConfirm: any;
  title: string;
  body: string;
  confirmButton: string;
  cancelButton: string;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<boolean>;
  children: ReactNode;
}

const Modal = ({
  handleConfirm,
  title,
  body,
  confirmButton,
  cancelButton,
  isModalOpen,
  setIsModalOpen,
  children,
}: IProps) => {
  const actualModalRef = useRef<HTMLDivElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLFormElement;
    if (actualModalRef.current && !actualModalRef.current.contains(target)) {
      setIsModalOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={
        isModalOpen
          ? "fixed inset-0 z-50 w-screen h-screen top-0 left-0 bottom-0 right-0 m-0 p-0 bg-opacity-80 bg-black cent"
          : "hidden w-0 z-0 h-0 overflow-hidden"
      }
    >
      <div
        className="w-96 h-96 bg-gradient-to-tr from-cyan-300 to-cyan-800 rounded-3xl p-8 text-white flex flex-col gap-16"
        ref={actualModalRef}
      >
        <h1 className="text-3xl">{title}</h1>
        <p className="">{body}</p>
        {children}
        <div className="w-full h-16 flex justify-between">
          <button
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            {cancelButton}
          </button>
          <button onClick={handleConfirm}>{confirmButton}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
