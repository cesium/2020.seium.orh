import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { IStaff, IUser, useAuth } from "@context/Auth";
import { ROLES } from "@lib/user";
import MobileNavbar from "./components/MobileNavbar";
import ActiveLink from "./components/ActiveLink";
import Banner from "./components/Banner";
import spotlights from "pages/staff/spotlights";

// FIXME: Normalize user type between lazuli and safira
const basePahts = {
  [ROLES.ATTENDEE]: "attendee",
  [ROLES.SPONSOR]: "sponsor",
  [ROLES.STAFF]: "staff",
};

const roleNavigation = (user: IUser) => {
  switch (user.type) {
    case ROLES.SPONSOR:
      return ["scanner", "visitors"];

    case ROLES.ATTENDEE:
      return [
        "profile",
        "slots",
        "wheel",
        "badgedex",
        "leaderboard",
        "store",
        "inventory",
        "identifier",
      ];

    case ROLES.STAFF:
      return [
        "leaderboard",
        "badges",
        "prizes",
        "identifier",
        "cv",
        ...((user as IStaff).is_admin ? ["spotlights"] : []),
      ];

    default:
      throw new Error(`Unknown USER TYPE: ${user.type}`);
  }
};

type LayoutProps = {
  title?: string;
  description?: string;
  basePath?: string;
  navigation?: string[];
  children: ReactNode;
};

export default function Layout({ title, description, children }: LayoutProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const openNavbar = () => setIsNavbarOpen(true);
  const closeNavbar = () => setIsNavbarOpen(false);

  const currentHref = router.asPath;
  const links = roleNavigation(user);
  const basePath = basePahts[user.type];

  return (
    <div className="text-white">
      <Banner />

      <MobileNavbar
        isOpen={isNavbarOpen}
        links={links}
        basePath={basePath}
        currentHref={currentHref}
        onClose={closeNavbar}
        onLogout={logout}
      />

      <div className="relative lg:flex">
        {/* NAVBAR */}
        <aside className="no-scrollbar inset-y-0 hidden w-72 select-none overflow-y-auto border-r-2 bg-secondary px-8 py-5 lg:fixed lg:flex lg:flex-col">
          <div className="flex flex-1">
            <nav className="mt-8 flex flex-col">
              <Link href="/" className="pb-8">
                <Image
                  src="/images/sei-logo.svg"
                  alt="SEI Logo"
                  width="220"
                  height="120"
                />
              </Link>

              {links.map((link) => (
                <ActiveLink
                  key={link}
                  link={link}
                  basePath={basePath}
                  href={currentHref}
                />
              ))}
            </nav>
          </div>

          <button
            onClick={() => logout()}
            className="mt-4 w-full text-left font-iregular text-quinary"
          >
            Log out 👋
          </button>
        </aside>

        {/* OPEN SIDEBAR ON MOBILE */}
        <button
          type="button"
          onClick={openNavbar}
          className="absolute top-4 right-4 text-gray-500 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* CONTENT */}
        <main className="flex min-h-screen w-full flex-col px-4 pb-6 pt-20 lg:ml-72 lg:px-20">
          <h2 className="select-none font-ibold text-4xl sm:text-5xl">
            {title}
          </h2>
          <p className="mt-2 font-iregular text-lg">{description}</p>

          {children}
        </main>
      </div>
    </div>
  );
}
