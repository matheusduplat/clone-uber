let logoutHandler: (() => void) | null = null;

export function setLogoutHandler(handler: (() => void) | null) {
  logoutHandler = handler;
}

export function triggerLogout() {
  if (logoutHandler) logoutHandler();
}
