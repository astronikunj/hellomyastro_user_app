import { createNavigationContainerRef } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

// global navigation ref
export const navigationRef = createNavigationContainerRef<ParamListBase>();

// safe navigate function
export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

// safe goBack function
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
