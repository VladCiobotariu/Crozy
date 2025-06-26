import CookiePolicy from '@/components/organisms/markdown/cookie-policy/CookiePolicy.mdx'
import { Box } from '@mui/joy'

const CookiePolicyPage = () => {

  return(
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <CookiePolicy/>
    </Box>
  )
}

export default CookiePolicyPage