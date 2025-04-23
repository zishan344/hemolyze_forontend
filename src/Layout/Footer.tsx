import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer
        id="contact"
        className="footer p-10 bg-base-200 text-base-content">
        <div>
          <span className="footer-title">About Hemolyze</span>
          <p className="max-w-xs">
            Hemolyze is dedicated to connecting blood donors with those in need,
            creating a community of lifesavers across the country.
          </p>
          <div className="flex mt-4 gap-4">
            <a className="btn btn-circle btn-outline">
              <Facebook className="h-5 w-5" />
            </a>
            <a className="btn btn-circle btn-outline">
              <Twitter className="h-5 w-5" />
            </a>
            <a className="btn btn-circle btn-outline">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <span className="footer-title">Contact Us</span>
          <a className="link link-hover flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            (555) 123-4567
          </a>
          <a className="link link-hover flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            contact@hemolyze.com
          </a>
          <a className="link link-hover flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            123 Donation St, Medical City
          </a>
        </div>
        <div>
          <span className="footer-title">Resources</span>
          <a className="link link-hover">Donation FAQ</a>
          <a className="link link-hover">Eligibility Requirements</a>
          <a className="link link-hover">Blood Types Guide</a>
          <a className="link link-hover">Donation Centers</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p>© {new Date().getFullYear()} Hemolyze - All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
