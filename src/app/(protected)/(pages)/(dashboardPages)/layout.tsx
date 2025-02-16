export const dynamic = 'force-dynamic';

import React from 'react'
import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/actions/user';

type Props = {
    children: React.ReactNode;
}

const Layout = async (props: Props) => {
    const auth = await onAuthenticateUser();
    if(!auth.user) {
        redirect('/sign-in');
    }

    return (
        <div className="w-full flex flex-col gap-6 relative">
            {props.children}
        </div>
    )
}

export default Layout