import {
  teal200,
  teal500,
  teal700,
  grey100,
  grey300,
  grey400,
  grey500,
  pinkA200,
  orange500,
  white,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'

const tealTheme = {
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56,
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal500,
    primary2Color: teal700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: teal500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
    appBarBackgroundColor: '#f5f5f5',
    link1Color: teal700,
    link2Color: teal200,
    errorTextColor: orange500,
  },
}

export default tealTheme
