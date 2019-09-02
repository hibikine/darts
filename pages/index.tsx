import Link from 'next/link';
import { PropsWithChildren } from 'react';

const MenuButton = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => <Link href={href}><a>{children}</a></Link>;
const Index = () => (
  <div>
    <MenuButton href="/countup">Count Up</MenuButton>
  </div>
);
export default Index;
