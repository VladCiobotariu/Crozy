import Image from 'next/image';

type LogoProps = {
  height?: number,
}

export const LOGO_WIDTH_HEIGHT_RATIO = 4.6875

const Logo = ({height = 20} : LogoProps) => {

  const width = height*LOGO_WIDTH_HEIGHT_RATIO

  return(
    <Image src="/images/crozy_full_36.webp" alt="Crozy" width={width} height={height} style={{
      width: "auto",
      height: "auto"
    }}/>
  )
}

export default Logo