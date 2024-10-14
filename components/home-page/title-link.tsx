import { Link } from "@nextui-org/react";

export function TitleLink({ title, url }: { title: string; url: string }) {
  return (
    <Link className="font-bold underline" key={url} href={url}>
      {title}
    </Link>
  );
}
