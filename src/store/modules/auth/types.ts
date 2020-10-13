/*
 * Auth state types
 */
export interface AuthState {
  userId: string | null;
  token: string | null;
  didAutoLogout: boolean;
}

/*
 * Firebase payload types for Sign up or Sign in with email & password
 */
// Both for signup or signin request body payloads
export interface FirebaseAuthRequestBody {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

// For signup response body payload
export interface FirebaseSignupResponseBody {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  kind: string;
}

// For signin response body payload
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

/**
 * Saved user auth data types (in local storage)
 */
export interface SavedUserAuthData {
  userId: string | null;
  token: string | null;
  tokenExpirationDate: number | null;
}