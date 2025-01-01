import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/react-quary/quaresandMutaition";
import { useEffect } from "react";
import { useUserContext } from "@/context/authcontext";
import { sidebarLinks } from "@/constantsLinks";
import { INavLink } from "@/Types";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccountMutation();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className=" flex gap-3 items-center">
          <img
            src="/public/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={ user.imageUrl ||
              "/public/assets/icons/profile-placeholder.svg" // || 
            }
            alt="profile"
            className="h-14 w-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-3 items-center p-2 "
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost fixed bottom-4 left-4"
        onClick={() => {
          signOut();
          console.log("clicked", signOut);
        }}
      >
        <img src="/public/assets/icons/logout.svg" />
        <p>LogOut</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
//in Li also need to declare the group property in className in order to make that a group hover while the current active tab other tab os link li had the same hover effect
