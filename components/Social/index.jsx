import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faGithub,
  faLinkedinIn,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Social() {
  return (
    <div className="mt-4 flex items-center space-x-3 md:space-x-4">
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://www.instagram.com/sei.uminho"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://www.linkedin.com/company/sei-cesium"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://github.com/cesium/lazuli"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://x.com/cesiuminho"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faXTwitter} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://www.facebook.com/SEI.UMinho/"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="https://discord.gg/stUtCjsnHx"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faDiscord} />
      </a>
      <a
        className="w-5 transition-colors duration-75 ease-in hover:text-quinary"
        href="mailto:geral@seium.org"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faEnvelope} />
      </a>
    </div>
  );
}
