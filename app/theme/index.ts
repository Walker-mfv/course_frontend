import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export const DEFAULT_LIGHT_BACKGROUND = '#faf9f7'
export const DEFAULT_DARK_BACKGROUND = 'gray.800'

const config: ThemeConfig = {}
const theme = extendTheme({
  colors: {
    whiteSmoke: {
      500: '#e0e0e0',
    },
    rating: {
      500: '#E59819',
    },
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'purple.400',
      },
    },
    Select: {
      defaultProps: {
        focusBorderColor: 'purple.400',
      },
    },
    NumberInput: {
      defaultProps: {
        focusBorderColor: 'purple.400',
      },
    },
  },
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(DEFAULT_LIGHT_BACKGROUND, DEFAULT_DARK_BACKGROUND)(props),
      },
    }),
  },
})
export default theme
