import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
  
        <div className="min-h-screen w-full bg-white flex flex-col ">
            <header>
                <Header />
            </header>
            <main className="flex-1 w-full bg-[#13141f] text-white font-['Nunito',sans-serif]">
                <Outlet />
            </main>

            <Footer/>
        </div>
    

  )
}