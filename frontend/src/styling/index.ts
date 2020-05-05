export type FontSize = 'xxxs' | 'xxs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export const fontSizes: { [key in FontSize]: number } = {
  xxxs: 8,
  xxs: 10,
  xs: 11,
  sm: 12,
  base: 14,
  md: 16,
  lg: 19,
  xl: 24,
  xxl: 36,
  xxxl: 48,
}

export type Color =
  | 'primary'
  | 'primaryLight'
  | 'primaryHighlight'
  | 'secondary'
  | 'successLight'
  | 'success'
  | 'successDark'
  | 'dangerLight'
  | 'danger'
  | 'dangerDark'
  | 'warning'
  | 'gray'
  | 'grayLightest'
  | 'grayLighter'
  | 'grayLight'
  | 'grayDark'
  | 'grayDarker'
  | 'grayDarkest'
  | 'white'
  | 'black'
  | 'rpi'

const lightTheme: { [key in Color]: string } = {
  primary: '#0096e7',
  primaryLight: '#9ed3f0',
  primaryHighlight: '#edf8ff',
  secondary: '#0d6dba',
  successLight: '#a4db4c',
  success: '#75bd00',
  successDark: '#436807',
  dangerLight: '#e07562',
  danger: '#d6290a',
  dangerDark: '#871a06',
  warning: '#ed9912',
  grayLight: '#dbdbdb',
  grayLighter: '#efefef',
  grayLightest: '#fafafa',
  gray: '#bbb',
  grayDarkest: '#333',
  grayDarker: '#595959',
  grayDark: '#999',
  white: 'white',
  black: 'black',
  rpi: '#C51A4A',
}

export const colors: { [key in Color]: string } = {
  primary: '#0096e7',
  primaryLight: '#9ed3f0',
  primaryHighlight: '#edf8ff',
  secondary: '#0d6dba',
  successLight: '#a4db4c',
  success: '#75bd00',
  successDark: '#436807',
  dangerLight: '#e07562',
  danger: '#d6290a',
  dangerDark: '#871a06',
  warning: '#ed9912',
  grayLightest: '#333',
  grayLighter: '#444',
  grayLight: '#555',
  gray: '#777',
  grayDark: '#999',
  grayDarker: '#aaa',
  grayDarkest: '#bbb',
  white: '#333',
  black: '#ccc',
  rpi: '#C51A4A',
}

export type Spacing = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export const spacing: { [key in Spacing]: number } = {
  xxs: 3,
  xs: 6,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 36,
  xxl: 48,
}

export const page = {
  marginVertical: 30,
  marginHorizontal: 50,
}

export default { fontSizes, colors, spacing, page }
