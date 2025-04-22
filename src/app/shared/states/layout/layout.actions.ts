export namespace LayoutAction {
  export class SetTitle {
    static readonly type = '[Layout] Set Title';
    constructor(public title: string) {}
  }

  export class ClearTitle {
    static readonly type = '[Layout] Clear Title';
  }
}
