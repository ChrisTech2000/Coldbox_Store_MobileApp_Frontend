// navigationHelpers.ts
import { DrawerActions, NavigationProp } from '@react-navigation/native';

/**
 * Checks if the current navigation state indicates that the user is at the root.
 * If so, after going back, toggles the drawer.
 *
 * @param navigation - A navigation prop (any navigator that supports goBack and dispatch)
 * @param forceToggle
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function goBackWithDrawer(navigation: NavigationProp<any>, forceToggle?: boolean) {
  // Check if the active index is 0 (the current route is at the bottom of the stack)
  const returnToDrawer = navigation.getState().index === 0 || forceToggle;
  // Go back from the current screen
  navigation.goBack();
  // If we're at the root, dispatch the drawer toggle action
  if (returnToDrawer) {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }
}
