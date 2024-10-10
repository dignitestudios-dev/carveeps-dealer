import React from "react";

const Header = () => {
  return (
    <div className="rounded-[18px] flex flex-col items-center justify-center h-auto py-10 px-4 lg:h-[264px] bg-gradient-to-r from-[#FF204E] to-[#99132F]">
      <h1 className="text-[32px] font-semibold text-white">
        Subscription Plans
      </h1>
      <p className="text-white text-[18px] text-center font-medium">
        Create and manage plans effortlessly to offer top-notch services. <br />{" "}
        Let’s build subscription plans that delight!
      </p>
    </div>
  );
};

export default Header;
