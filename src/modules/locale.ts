const CHANGE_LOCALE = 'locale/CHANGE_LOCALE' as const;

export const changeLocale = (locale: string) => ({
  type: CHANGE_LOCALE,
  payload: locale
});
type LocaleActions = ReturnType<typeof changeLocale>;

const initialState = 'en-us';

export default function locale(
  state = initialState,
  action: LocaleActions
): string {
  switch (action.type) {
    case CHANGE_LOCALE:
      return action.payload;
    default:
      return state;
  }
}
