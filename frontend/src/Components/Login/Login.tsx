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
        className="w-full h-full flex flex-col gap-4 cent"
      >
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
        <button type="submit">Submit</button>
        <Link to="/signup">Don't have an account? Signup</Link>
      </form>
    </div>
  );
};

export default Login;
