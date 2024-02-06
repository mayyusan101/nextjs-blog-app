"use client";
import React from "react";
import {
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarItem,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

function HeaderAuth() {
  const { data: session, status } = useSession();

  let authContent: React.ReactNode;

  if (status === "loading") {
    authContent = null;
  } else if (session?.user) {
    authContent = (
      <div className="flex gap-2 items-center">
        <Button
          type="submit"
          color="danger"
          variant="solid"
          onClick={() => signOut()}
        >
          Sing Out
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              src={session.user.image || ""}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{session.user.email}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  } else {
    authContent = (
      <>
        <Button color="primary" variant="bordered" onClick={() => signIn()}>
          SignIn
        </Button>
      </>
    );
  }

  return <NavbarItem>{authContent}</NavbarItem>;
}

export default HeaderAuth;
