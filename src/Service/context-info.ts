// These are the parameters which make up the current context / state of this app.
// It's mainly needed to ensure that the Http Service is correctly set up.
/**
 * The context in which the current app is running.
 * Important to interact with the server
 * or with the DNN around it.
 */
export class ContextInfo {
  /**
   * the DNN module id
   */
  moduleId: number;

  /**
   * the DNN tab id (internal page number)
   */
  tabId: number;

  /**
   * the security / anti-forgery token for api-requests
   */
  antiForgeryToken: string;
}