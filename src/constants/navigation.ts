export interface NavItem {
  id: string;
  label: string;
  to: string;
}

export const mainNavItem: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    to: '#about',
  },
  {
    id: 'blog',
    label: 'Blog',
    to: '#blog',
  },
  {
    id: 'contact',
    label: 'Contact',
    to: '#contact',
  },
];
