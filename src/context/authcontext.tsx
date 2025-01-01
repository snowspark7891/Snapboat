import { getCurrentAccount } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/Types";
import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  //for update and create user data changing and changes
  id: "",
  name: "",
  email: "",
  username: "",
  imageUrl: "",
  bio: "",
};
export const INITIAL_STATE = {
  //for initial state of user //to know wether the user loged in or not
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

//every context which is created should have a provider to provide the data to the children components
//provider is a component which is used to provide the data to the children components
//because every context wrap the entier class or function component
const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate(); //to navigate to the different pages

  const checkAuthUser = async () => {
    //
    try {
      const currentAccount = await getCurrentAccount();
      if (currentAccount) {
        setUser({
          //if the user is present then set the user data
          id: currentAccount.$id, //setting the user data
          name: currentAccount.name,
          email: currentAccount.email,
          username: currentAccount.username,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);
        return true; //once the user is authenticated return true
      }
      return false; //if the user is not authenticated return
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  //this above function is work when ever we refresh the page or when the user is logged in
  //useEffect is used to run the function only once when the component is mounted

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/sign-in"); //if the user is logged in then check the user data

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useUserContext = () => {
  // this is a custom hook to use the context
  return useContext(AuthContext); //quickly access the context
  // makes easier to call the context everytime
};

/*<<<<<<<<---------------------------very compex logic is been here so go andcheck all logics through the code---------------------->>>>>>>>>>>>>>>>
   appwrite/api.ts
    appwrite/config.ts
    Types.ts
    lib/utils.ts
    lib/validation/index.ts

*/
