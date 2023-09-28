import { Navigate } from 'react-router-dom';
import AuthenticationService from './services/auth/authentication-service';


const PrivateRoute = ({ element }) => {

    const isAuthenticated = AuthenticationService.isAuthenticated; // Mettez à jour avec votre logique d'authentification
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" /> // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  );
};

export default PrivateRoute;