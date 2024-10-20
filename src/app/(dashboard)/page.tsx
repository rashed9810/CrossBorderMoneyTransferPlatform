import { redirect } from 'next/navigation';
import * as React from 'react';

interface IpageProps {
}

const page: React.FunctionComponent<IpageProps> = (props) => {
  redirect('/user/dashboard')
};

export default page;
