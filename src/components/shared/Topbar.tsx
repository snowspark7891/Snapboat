import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/react-quary/quaresandMutaition";
import { useEffect } from "react";
import { useUserContext } from "@/context/authcontext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex  justify-between py-4 px-6">
        <Link to="/" className=" flex gap-3 items-center">
          <img
            src="/public/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => {
              signOut();
              console.log("clicked", signOut);
            }}
          >
            <img src="/public/assets/icons/logout.svg" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={
                user.imageUrl || "/public/assets/icons/profile-placeholder.svg" //||
              }
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
