import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";

import Link from "next/link";
import HeaderAuth from "./header-auth";

export default function Header() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link href="/" className="hidden sm:block font-bold text-inherit">
            MBLOG
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  );
}
