type Props = {
  children: React.ReactNode;
};

const Title = ({ children }: Props) => (
  <>
    <h1 className="mb-4 font-bold">{children}</h1>
  </>
);

export default Title;
