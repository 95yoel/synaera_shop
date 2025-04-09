import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeLanguageContextType = {
  theme: string
  language: string
  toggleTheme: () => void
  switchLanguage: (lang: string) => void
}

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

const isBrowser = typeof window !== 'undefined'

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [theme, setTheme] = useState<string>('light')
  const [language, setLanguage] = useState<string>('en')

  useEffect(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme')
      const savedLang = localStorage.getItem('language')

      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
      }

      if (savedLang) {
        setLanguage(savedLang)
      } else {
        const browserLang = navigator.language || 'en'
        setLanguage(browserLang.startsWith('es') ? 'es' : 'en')
      }
    }
  }, [])

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('language', language)
    }
  }, [language])


  useEffect(() => {
    if (isBrowser) {
      document.body.setAttribute('data-theme', theme);
      document.body.setAttribute('lang', language);
    }
  }, [theme, language]);


  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  const switchLanguage = (lang: string) => setLanguage(lang)

  return (
    <ThemeLanguageContext.Provider
      value={{ theme, language, toggleTheme, switchLanguage }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  )
}

export const useThemeLanguage = () => {
  const context = useContext(ThemeLanguageContext)
  if (!context)
    throw new Error('useThemeLanguage must be used within a ThemeLanguageProvider')
  return context
}
