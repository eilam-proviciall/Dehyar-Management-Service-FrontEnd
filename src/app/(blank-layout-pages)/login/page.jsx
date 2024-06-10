// Component Imports
import Login from '@views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import {AuthContext, AuthProvider} from "@/contexts/AuthContext";

export const metadata = {
  title: 'Login',
  description: 'Login to your account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <>
      <AuthProvider >
          <Login mode={mode} />
      </AuthProvider>
  </>
}

export default LoginPage
