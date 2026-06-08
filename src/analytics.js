import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-344MV3DB5Z");
};

export const trackPageView = (path) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};
