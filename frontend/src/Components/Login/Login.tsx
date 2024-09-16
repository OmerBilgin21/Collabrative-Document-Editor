import { useEffect } from "preact/hooks";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const isValid = target.checkValidity();
    if (!isValid) return;
    const formData = {
      email: (target.elements.namedItem("email") as HTMLInputElement).value,
      password: (target.elements.namedItem("password") as HTMLInputElement)
        .value,
    };
    await signIn(formData.email, formData.password);
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
        <h1 className="text-3xl">Sign In</h1>
        <div className="divider" />
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
        <Link className="bg-slate-200 rounded-xl p-2 w-3/5" to="/signup">
          Don't have an account? <span className="text-blue-500">Signup</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
