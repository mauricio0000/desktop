import { connect } from 'react-redux'
import { SignInForm } from '../../components/SignInForm'
import { ApplicationState } from '../../store'

const mapState = (state: ApplicationState) => ({
  signInError: state.auth.signInError,
  signInStarted: state.auth.signInStarted,
})

const mapDispatch = (dispatch: any) => ({ signIn: dispatch.auth.signIn })

export type SignInFormControllerProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>

export const SignInFormController = connect(
  mapState,
  mapDispatch
)(SignInForm)
