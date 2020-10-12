/*
 * Auth state types
 */
export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: string | null;
}

/*
 * Firebase payload types for Sign up or Sign in with email & password
 */
export interface FirebaseAuthRequestBody {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FirebaseAuthResponseBody {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}