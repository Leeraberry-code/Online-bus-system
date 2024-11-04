import Link from 'next/link';
import Logo from '../ui/logo';
import WidthContainer from '../ui/widthContainer';

export default function NavBar(){
    return (
        <div className='navbar fixed top-0 left-0 w-full bg-white p-4 shadow-md'>
            <WidthContainer>
                <div className='flex items-center justify-between w-full'>
                    <Logo className='font-bold text-xl'/>
                    <AuthNav/>
                </div>
            </WidthContainer>
        </div>
    )
}

function AuthNav() {
    return (
      <div className="space-x-2">
        <Link href="/login" className="btn btn-outline px-4 py-2 border rounded-md">
          Log In
        </Link>
        <Link href="/register" className="btn btn-primary px-4 py-2 bg-black text-white rounded-md">
          Register
        </Link>
      </div>
    );
}
