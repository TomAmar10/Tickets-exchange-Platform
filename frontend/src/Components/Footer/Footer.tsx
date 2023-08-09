import { useRef, useState } from "react";
import "./Footer.scss";
import useSubscribeService from "../../services/subscribeService";

function Footer(): JSX.Element {
  const subscribeRef = useRef<HTMLInputElement>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribeService = useSubscribeService();

  const subscribe = (e: any) => {
    e.preventDefault();
    subscribeService.addSubscribe(subscribeRef.current?.value as string);
    setIsSubscribed(true);
  };

  return (
    <div className="Footer-container">
      <div className="Footer">
        <div className="few-words-about-hotix-section footer-section">
          <h1>
            Ho<span>tix</span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud.
          </p>
          <div className="footer-platform-links">
            <i className="fa-brands fa-facebook-f platform-link"></i>
            <i className="fa-brands fa-twitter platform-link"></i>
            <i className="fa-brands fa-linkedin-in platform-link"></i>
          </div>
        </div>
        <div className="plan-events-section footer-section">
          <h5>Plan Events</h5>
          <a href="/">Create & Set Up</a>
          <a href="/">Sell Tickets</a>
          <a href="/">Online RSVP</a>
          <a href="/">Online Events</a>
        </div>
        <div className="Hotix-links-section footer-section">
          <h5>Hotix</h5>
          <a href="/">About Us</a>
          <a href="/">Press</a>
          <a href="/">Contact Us</a>
          <a href="/">Help Center</a>
          <a href="/">How it Works</a>
          <a href="/">Privacy</a>
          <a href="/">Terms</a>
        </div>
        <div className="stay-in-loop-section footer-section">
          <h5>Stay In The Loop</h5>
          <p>
            Join our mailing list to stay in the loop with our news for events
            and concerts
          </p>
          <form className="subscribe-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="add-email"
              ref={subscribeRef}
            />
            <button
              className={`subscribe-btn ${isSubscribed ? "completed" : ""}`}
            >
              {isSubscribed ? "Subscribed ✔" : "Subscribe Now"}
            </button>
          </form>
        </div>
      </div>
      <div className="footer-copyrights-area">
        <hr />
        <span>Copyrights © 2023 Tom Amar</span>
      </div>
    </div>
  );
}

export default Footer;
