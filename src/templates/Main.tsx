import { AppConfig } from "src/utils/AppConfig";

type IMainProps = {
  meta: React.ReactNode;
  children: React.ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full text-gray-700">
    {props.meta}
    <div className="max-w-screen-lg mx-auto">
      <div className="px-2 lg:px-0 py-5 text-xl">{props.children}</div>
      <div className="border-t border-gray-300 text-center py-8 text-sm text-white">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
        by <a href="https://github.com/yukiohori">YUKI OHORI</a>
      </div>
    </div>
  </div>
);

export { Main };
