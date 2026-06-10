import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'it' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'it',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('it');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
