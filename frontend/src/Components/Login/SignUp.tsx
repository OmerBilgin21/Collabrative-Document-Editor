import { useEffect } from "preact/hooks";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { isAuthenticated, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const isValid = target.checkValidity();
    if (!isValid) return;
    const formData = {
      name: (target.elements.namedItem("name") as HTMLInputElement).value,
      surname: (target.elements.namedItem("surname") as HTMLInputElement).value,
      email: (target.elements.namedItem("email") as HTMLInputElement).value,
      password: (target.elements.namedItem("password") as HTMLInputElement)
        .value,
    };
    await signUp(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-full w-full cent">
      <form
        onSubmit={handleSubmit}
        className="w-96 h-96 flex flex-col gap-4 cent rounded-lg"
      >
        <h1 className="text-3xl">Sign Up</h1>
        <div className="divider" />
        <input
          className="form-input"
          type="text"
          required
          placeholder="name..."
          name="name"
        />
        <input
          className="form-input"
          type="text"
          required
          placeholder="surname..."
          name="surname"
        />
        <input
          className="form-input"
          type="email"
          required
          placeholder="email..."
          name="email"
        />
        <input
          className="form-input"
          type="password"
          required
          placeholder="password..."
          name="password"
        />
        <button className="bg-slate-200 rounded-xl p-2 w-3/5" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
