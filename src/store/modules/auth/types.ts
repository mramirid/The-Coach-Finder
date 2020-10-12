/*
 * Auth state types
 */
export interface AuthState {
  userId: string | null;
  token: string | null;
  tokenExpiration: string | null;
}

/*
 * Mutation payload types
 */
export interface SetUserMutationPayload extends AuthState { }

/*
 * Firebase payload types for Sign up or Sign in with email & password
 *
 * FirebaseAuthRequestBody: Both for signup or signin request body payloads
 * FirebaseSignupResponseBody: For signup response body payload
 * FirebaseSigninResponseBody: For signin response body payload
 */
export interface FirebaseAuthRequestBody {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface FirebaseSignupResponseBody {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}

export interface FirebaseSigninResponseBody {
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
  registered: boolean;
}