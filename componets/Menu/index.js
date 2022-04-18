import Link from "next/link";
import { navigationLinks } from "../../utils/data";
import { useRouter } from "next/router";
export const Menu = () => {
  const router = useRouter();
  /*
   const verifyActiveLink = (path) => {
    if (path === "/" && router.pathname !== "/") {
      return null;
    }

    if (router.pathname.indexOf(path) === 0) {
      return "linkActive";
    }
    return null;
  };

   <li className={["link", verifyActiveLink(item.path)].join(" ")} key={k}>
  
  */

  return (
    <ul>
      {navigationLinks.map((item, k) => (
        <li
          className={[
            "link",
            item.path.includes(router.pathname) ? "linkActive" : "link",
          ].join(" ")}
          key={k}
        >
          <Link href={item.path[0]}>
            <a>{item.label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
