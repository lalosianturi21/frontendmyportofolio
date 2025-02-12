import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const SocialShareButtons = ({ url, title }) => {
  const socialLinks = [
    {
      href: `https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${url}`,
      icon: <FaFacebookSquare className="text-[#3b5998]" />,
    },
    {
      href: `https://twitter.com/intent/tweet?url=${url}`,
      icon: <FaTwitterSquare className="text-[#00acee]" />,
    },
    {
      href: `http://www.reddit.com/submit?url=${url}&title=${title}`,
      icon: <FaRedditSquare className="text-[#ff4500]" />,
    },
    {
      href: `https://api.whatsapp.com/send/?text=${url}`,
      icon: <FaWhatsappSquare className="text-[#25D366]" />,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8 p-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          target="_blank"
          rel="noreferrer"
          href={social.href}
          className="w-12 h-12 flex items-center justify-center transition-transform transform hover:scale-110"
        >
          {React.cloneElement(social.icon, { className: "w-10 h-10" })}
        </a>
      ))}
    </div>
  );
};

export default SocialShareButtons;
