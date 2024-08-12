import { Dispatch, useEffect, useRef, useState } from "preact/hooks";
import useAxios from "../../utils/api";

interface IProps {
  setIsFormOpen: Dispatch<boolean>;
}

const CreateDoc = ({ setIsFormOpen }: IProps) => {
  const [formData, setFormData] = useState<string>("");
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLFormElement;
    if (formRef.current && !formRef.current.contains(target)) {
      setIsFormOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    await useAxios("/docs", "post", { name: formData });
  };

  return (
    <form
      className="w-32 h-32 text-black flex flex-col gap-4 bg-white rounded-xl transition-all duration-1000"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div className="flex flex-col gap-2 form-section">
        <label for="#name-input">Name: </label>
        <input
          className="border-[1px] border-dotted border-black"
          id="name-input"
          type="text"
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setFormData(target.value);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 form-section">
        <button
          className="w-16 h-max p-2 bg-blue-200 text-black hover:text-white hover:bg-blue-500 transition-all duration-500 transform"
          type="submit"
        >
          Create
        </button>
        <button
          className="w-16 h-max p-2 bg-blue-200 text-black hover:text-white hover:bg-blue-500 transition-all duration-500 transform"
          type="reset"
          onClick={() => {
            setIsFormOpen(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateDoc;
