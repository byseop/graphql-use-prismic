import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function useLocalization() {
  const lang = window.navigator.language;
  useEffect(() => {
    const { pathname } = window.location;
    const redirectURL = () => {
      switch (lang) {
        case 'ko':
          return `/ko-kr${pathname}`;
        case 'en':
          return `/en-us${pathname}`;
        default:
          return `/en-us${pathname}`;
      }
    };
    navigate(redirectURL());
  }, [lang]);
}
