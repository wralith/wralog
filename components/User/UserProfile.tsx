const UserProfile = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col items-center lg:w-1/2 m-auto mt-12 rounded-md border-primary border-2 gap-3 p-12 bg-base w-[90%] base-content">
      <img
        className="avatar rounded-full"
        src={user.photoURL}
        alt="profile-picture"
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1 className="text-2xl">{user.displayName}</h1>
    </div>
  );
};

export default UserProfile;
