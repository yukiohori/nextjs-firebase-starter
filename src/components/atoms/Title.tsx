type Props = {
  align?: string;
  children: React.ReactNode;
};

const Title = ({ align = "text-center", children }: Props) => (
  <>
    <h1 className={`mb-4 font-bold text-5xl ${align}`}>{children}</h1>
  </>
);

export default Title;
