import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "./Layout.module.css";

const Layout = ({ children, title = "This is the default title" }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          alt="Logo"
        />
        <Link
          className={styles.navlink}
          href="https://yourteam.cloudflareaccess.com"
        >
          Login
        </Link>
        <Link className={styles.navlink} href="/api/graphql">
          Query
        </Link>
        <Link className={styles.navlink} href="/employees">
          Employees
        </Link>
        <Link className={styles.navlink} href="/addemployee">
          Add new
        </Link>
      </nav>
      <hr />
    </header>
    <div className={styles.body}>{children}</div>
  </div>
);

export default Layout;
