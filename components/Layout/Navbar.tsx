import Link from "next/link";
import Avatar from "../UI/Avatar";

const Navbar = () => {
  // Dev
  const { user, username }: { user: boolean; username: string | null } = {
    user: true,
    username: 'Wra',
  };

  return (
    <div className="navbar bg-base-200/30 backdrop-blur-sm sticky top-0 justify-between px-10 py-2">
      <Link href="/">
        <a className="px-4 normal-case text-xl">Wralog</a>
      </Link>
      <ul className="gap-3">
        {/* user okay */}
        {username && (
          <>
            <li>
              <Link href="/admin">
                <a className="px-4 normal-case btn btn-primary text-lg">
                  Write
                </a>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <Avatar />
              </Link>
            </li>
          </>
        )}

        {/* else */}
        {!username && (
          <>
            <li>
              <Link href="/">
                <a className="px-4 normal-case btn btn-primary text-lg">
                  Login
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;