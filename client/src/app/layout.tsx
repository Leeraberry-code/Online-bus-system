import React from 'react';
import '../app/globals.css';
import NavBar from '../components/NavBar';

export const metadata = {
  title: 'Strive High School',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="lofi"> 
       <body className="pt-16"> 
        <NavBar/>
          {children}
    </body>
    </html>
  );
}