import { getWindowId } from './get-window-id';

export class Event<T extends object | null | undefined = null | undefined> {
  public readonly windowId: number;
  public readonly data: T;

  constructor(data: T) {
    this.windowId = getWindowId();
    this.data = (data ?? null) as T;
  }
}
