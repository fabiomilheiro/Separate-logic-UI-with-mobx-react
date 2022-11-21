import { makeAutoObservable } from "mobx";

export class Clicks {
  clicks: number = 0;

  get leftTo1000() {
    if (this.clicks < 1000) {
      return 1000 - this.clicks;
    }

    return 0;
  }

  constructor() {
    makeAutoObservable(this);
  }

  addClick() {
    this.clicks += 1;
  }
}
