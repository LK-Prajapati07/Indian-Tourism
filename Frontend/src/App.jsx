import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUser } from "./API/authApi";
import { logoutUser, setLoading, setUser } from "./Store/authSlice";


import AuthRoutes from "./Routes/AuthRoutes";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const restoreSession = async () => {
      dispatch(setLoading());

      try {
        const response = await fetchCurrentUser();
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(logoutUser());
      }
    };

    restoreSession();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  return <AuthRoutes />;
}

export default App;
