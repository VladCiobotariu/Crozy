import Link from "next/link"

type MdxLinkProps = {
  text: string
  link: string
}

const MdxLink = ({text, link}:MdxLinkProps) => {
  return(
    <Link href={link} style={{
      color: "blue",
      textDecoration: "underline"
    }}>
      {text}
    </Link>
  )
}

export default MdxLink