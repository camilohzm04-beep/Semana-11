import { useAutoRedirect } from "../hooks/useAutoRedirect";
import "../styles/main.css";

const LandingPage = () => {
  useAutoRedirect("/home", 5000);

  return (
    <div className="landing-page">
      <div className="landing-page__content">
        <h1 className="landing-page__title">Bienvenidos a Relatos de Papel</h1>
        <p className="landing-page__subtitle">
          Historias que merecen ser descubiertas
        </p>
        <div className="landing-page__loader"></div>
        <p className="landing-page__message">Redirigiendo a la tienda...</p>
      </div>
    </div>
  );
};

export default LandingPage;
