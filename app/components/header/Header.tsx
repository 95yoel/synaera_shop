import { useThemeLanguage } from "~/contexts/themeLanguageContext";
import styles from './header.module.css'

export default function Header() {

    const { toggleTheme, switchLanguage, language, theme } = useThemeLanguage()

    return (
        <header className={styles.header}>
            <p>Idioma actual: {language}</p>
            <button onClick={toggleTheme}>
                Cambiar a {theme === 'dark' ? 'claro' : 'oscuro'}
            </button>
            <button onClick={() => switchLanguage(language === 'en' ? 'es' : 'en')}>
                Cambiar idioma
            </button>
        </header>
    )
}