import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function useLocalization() {
  useEffect(() => {
    const lang = window?.navigator.language;
    const { pathname } = window?.location;
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
  }, []);
}
