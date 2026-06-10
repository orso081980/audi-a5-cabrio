import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content/index';

export function useContent<K extends keyof typeof content.it>(section: K): typeof content.it[K] {
  const { language } = useLanguage();
  return content[language][section] as typeof content.it[K];
}
