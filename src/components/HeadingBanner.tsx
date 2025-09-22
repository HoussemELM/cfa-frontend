import "./HeadingBanner.scss";
import { headers } from "@/utils/assets";
const HeadingBanner = ({ title , path }: { title: string ,path: "/contact" | "/formations" | "/apropos" | "/cfa" | "/support" | "/financement" }) => {
  const headerImg = headers[path];
  return (
    <div id="heading-banner">
      <img src={headerImg} alt="Header" />
      <h1>{title}</h1>
    </div>
  );
};

export default HeadingBanner;
