import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/header.module.css";

import { useRouter } from "next/router";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();

  const router = useRouter();

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>

              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={styles.avatar}
              />
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/client">
              <a>CSR</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/src/server">
              <a>SSR</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/postsdb">
              <a>SSR Posts DB ORM</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/protected">
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-example">
              <a>JWT</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/api-frontend">
              <a>API</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/socketclient">
              <a>SocketIO</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/users">
              <a>Users</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/books">
              <a>Books</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/categories">
              <a>Categories</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
