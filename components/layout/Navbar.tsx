'use client';

import React from 'react';
import { StaggeredMenu } from '../ui/staggered-menu/StaggeredMenu';

const menuItems = [
  { label: 'Services', ariaLabel: 'Go to Services section', link: '#services' },
  { label: 'About', ariaLabel: 'Go to About section', link: '#about' },
  { label: 'Work', ariaLabel: 'Go to Work section', link: '#work' },
  { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export function Navbar() {
  return (
    <StaggeredMenu
      position="right"
      isFixed={true}
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#252F2C"
      openMenuButtonColor="#252F2C"
      colors={['#EEF7E8', '#256951']}
      accentColor="#256951"
    />
  );
}
export default Navbar;
