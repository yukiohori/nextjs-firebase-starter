import { AppConfig } from "src/utils/AppConfig";

type IMainProps = {
  meta: React.ReactNode;
  children: React.ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full text-gray-700">
    {props.meta}

    <div className="max-w-screen-md mx-auto">
      <div className="py-5 text-xl content">{props.children}</div>

      <div className="border-t border-gray-300 text-center py-8 text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{" "}
        by <a href="https://github.com/yukiohori">YUKI OHORI</a>
      </div>
    </div>
  </div>
);

export { Main };
