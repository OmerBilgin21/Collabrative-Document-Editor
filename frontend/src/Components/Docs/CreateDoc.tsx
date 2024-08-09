const CreateDoc = () => {
  return (
    <form
      className=" absolute top-0 right-[50%] w-32 h-32 text-black flex flex-col gap-4 bg-white rounded-xl transition-all duration-1000"
      onSubmit={() => {}}
    >
      <div className="flex flex-col gap-2 form-section">
        <label for="#title-input">Title: </label>
        <input id="title-input" />
      </div>

      <div className="flex flex-col gap-2 form-section">
        <label for="#name-input">Name: </label>
        <input id="name-input" type="text" />
      </div>

      <div className="flex flex-col gap-2 form-section">
        <button
          className="w-16 h-max p-2 bg-blue-200 text-black hover:text-white hover:bg-blue-500 transition-all duration-500 transform"
          type="submit"
        >
          Create
        </button>
        <button className="w-16 h-max p-2 bg-blue-200 text-black hover:text-white hover:bg-blue-500 transition-all duration-500 transform">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateDoc;
