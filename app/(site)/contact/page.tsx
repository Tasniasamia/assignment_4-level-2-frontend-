import About from '@/components/common/shared/about';
import Contact from '@/components/common/shared/contact';
import Banner from '@/components/layout/banner';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner routeName='Contact Us'/>
            <Contact/>
        </div>
    );
};

export default page;