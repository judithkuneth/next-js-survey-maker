import Link from 'next/link';

// const headerStyles = css`
//   display: flex;
//   align-items: center;
//   position: fixed;
//   width: 100%;
//   height: 70px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 0px 0px 0px 0px;
//   background-color: #fffcf2;
//   a {
//     font-size: 20px;
//     font-weight: bold;
//     margin: 12px;
//     div {
//       font-size: 18px;
//     }
//   }
// `;

export default function Header() {
  return (
    <header
    // css={headerStyles}
    >
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>
      </nav>
    </header>
  );
}
