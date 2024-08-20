
import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import { useContext } from "react";
import languagecontext from "../context/languagecontext";
import themecontext from '../context/themeContext';

function Layout() {
    const { language, setLanguage } = useContext(languagecontext);
    const { theme, setDarkMode } = useContext(themecontext);
    
    return <>
    <div >
        <Header 
            language={language} 
            setLanguage={setLanguage} 
            darkMode={theme === 'dark'} 
            setDarkMode={setDarkMode} 
        />
        <Outlet/>
    </div>
    </>
}
export default Layout
