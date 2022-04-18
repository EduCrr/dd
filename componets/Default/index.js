import { Menu } from "../Menu";

export const Default = ({ children }) => {
  return (
    <>
      <Menu />
      <main>{children}</main>
      <h1>Footer</h1>
    </>
  );
};
