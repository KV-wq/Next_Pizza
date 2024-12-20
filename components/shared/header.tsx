import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b bg-white", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* ЛЕВО */}
        <Link href="/">
          {" "}
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Pizza logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкуснее уже не будет!
              </p>
            </div>
          </div>
        </Link>

        {/* СЕРЕДИНА*/}

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* ПРАВО */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1 pl-3">
            <User size={16} />
            Войти
          </Button>

          <CartButton />
        </div>
      </Container>
    </header>
  );
};