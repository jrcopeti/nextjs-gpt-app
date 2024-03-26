import Link from "next/link";

const links = [
  { href: "/chat", label: "chat" },
  { href: "/tours/new-tour", label: "new tour" },
  { href: "/tours", label: "your tours" },
  { href: "/profile", label: "profile" },
];

function NavLinks() {
  return (
    <ul className="menu font-mono text-base-content font-semibold text-xl">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link href={link.href} className='capitalize'>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
