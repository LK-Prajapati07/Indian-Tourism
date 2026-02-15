import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCurrentUser } from "@/API/authApi";
import AppRoutes from "@/routes/AppRoutes";
import { logoutUser, setLoading, setUser } from "./Store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        dispatch(setLoading());

        const response = await fetchCurrentUser();

        // IMPORTANT: correct data extraction
        const user = response.data.user;

        dispatch(setUser(user));
      } catch (error) {
        dispatch(logoutUser());
      }
    };

    restoreUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <AppRoutes />;
}

export default App;
