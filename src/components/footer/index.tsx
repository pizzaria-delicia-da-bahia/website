import { FooterStyle } from "./styles";
import Facebook from "@assets/images/footer-icon-facebook.svg";
import Instagram from "@assets/images/footer-icon-instagram.svg";
import Whatsapp from "@assets/images/footer-icon-whatsapp.svg";
import { env } from "@config/env";

export const Footer = () => {
  return (
    <FooterStyle>
      <span className="icons">
        <a
          target="_blank"
          aria-label="Link para o whatsapp da pizzaria"
          href={encodeURI(
            `https://api.whatsapp.com/send?${
              env.whatsapp ? `phone=${env.whatsapp}&` : ""
            }text=Olá, gostaria de fazer um pedido! 🍕`
          )}
        >
          <img
            alt="link to our whatsapp chat"
            title="Whatsapp"
            width={40}
            height={40}
            src={Whatsapp.src}
          />
        </a>
        <a
          target="_blank"
          aria-label="Link para o facebook da pizzaria"
          href="https://www.facebook.com/pizzadeliciadabahia"
        >
          <img
            alt="link to our facebook profile"
            title="Facebook"
            width={40}
            height={40}
            src={Facebook.src}
          />
        </a>
        <a
          target="_blank"
          aria-label="Link para o instagram da pizzaria"
          href="https://www.instagram.com/pizzadeliciadabahia"
        >
          <img
            alt="link to our instagram page"
            title="Instagram"
            width={40}
            height={40}
            src={Instagram.src}
          />
        </a>
      </span>
    </FooterStyle>
  );
};
