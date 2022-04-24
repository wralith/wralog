import Image from "next/image";

// TODO: Width and Height should be props

const Avatar = () => {
  return (
    <div className="cursor-pointer items-center flex rounded-full  hover:ring-2 ring-primary">
      <Image
        className="rounded-full"
        src="https://api.lorem.space/image/face?w=150&h=150"
        alt="avatar"
        width={50}
        height={50}
      ></Image>
    </div>
  );
};

export default Avatar;
