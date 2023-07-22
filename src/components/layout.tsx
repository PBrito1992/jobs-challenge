import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }) => (
  <div className="min-h-screen flex flex-col lg:pt-8 lg:pb-6 p-3 lg:px-32 bg-brand-main-color">
    <header className="font-poppins text-2xl text-brand-dark-gray">
      <h1>
        <span className="font-bold">Github</span> Jobs
      </h1>
    </header>
    <main className="flex flex-col flex-1 py-8">{children}</main>
    <footer className="text-brand-light-gray text-sm text-center font-montserrat">
      created by <span className="font-semibold underline">Pedro Brito</span> -
      devChallenges.io
    </footer>
  </div>
);

export { Layout };
