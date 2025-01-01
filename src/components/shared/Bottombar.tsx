import { bottombarLinks } from "@/constantsLinks";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`group ${
              isActive && "bg-primary-500 rounded-[20px]"
            }  flex-center flex-col gap-1 p-2 transition`}
            // className="flex gap-3 items-center p-2 "
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`group-hover:invert-white ${
                isActive && "invert-white"
              }`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
