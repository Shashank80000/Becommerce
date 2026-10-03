import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { loginAdmin } from "../../services/adminApi";

export default function AdminLogin({ onAuthenticated }) {
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(apiKey);
      onAuthenticated();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={28} />
        </div>
        <p className="eyebrow">Restricted area</p>
        <h1>Admin sign in</h1>
        <p className="admin-login-copy">
          Sign in securely to access catalogue and quote operations.
        </p>
        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Admin API key</span>
            <div className="admin-key-input">
              <LockKeyhole size={17} />
              <input
                type="password"
                value={apiKey}
                onChange={(event) => setApiKey(event.target.value)}
                placeholder="Enter your admin key"
                autoComplete="current-password"
                required
              />
            </div>
          </label>
          {error && <p className="field-error">{error}</p>}
          <button className="button button-dark admin-login-button" disabled={loading}>
            {loading ? "Checking..." : "Continue securely ↗"}
          </button>
        </form>
        <p className="admin-login-note">Your key is kept only for this browser session.</p>
      </section>
    </main>
  );
}
