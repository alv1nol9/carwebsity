import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthButton({ onSuccess, onError, disabled }) {
  // Google OAuth Client ID set by user
  const clientId = "704943833036-qcr9fejvdr92igjjq4vtqnahks8dqlrc.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '18px 0 8px 0' }}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          width="100%"
          theme="outline"
          text="signup_with"
          shape="rectangular"
          logo_alignment="left"
          disabled={disabled}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
