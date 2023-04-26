import { Flex, Group } from "@mantine/core";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-32">
      <div className="bg-slate-800 py-16 text-white/70 font-bold text-center">
        <Flex justify={"center"} align={"center"} gap={"xl"}>
          <Link href="#" className="hover:text-white">
            Twitter
          </Link>
          <Link href="#" className="hover:text-white">
            GitHub
          </Link>
        </Flex>
      </div>
    </footer>
  );
}
