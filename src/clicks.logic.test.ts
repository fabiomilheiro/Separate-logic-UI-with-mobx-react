import { Clicks } from "./clicks.logic";

describe("clicks", () => {
  let clicks: Clicks;
  beforeEach(() => {
    clicks = new Clicks();
  });

  test("starts as zero", () => {
    expect(clicks.clicks).toBe(0);
  });

  test("addClicks adds 1", () => {
    clicks.addClick();
    clicks.addClick();

    expect(clicks.clicks).toBe(2);
  });

  test("leftTo1000 returns diff to 1000", () => {
    clicks.addClick();
    clicks.addClick();

    expect(clicks.leftTo1000).toBe(998);
  });

  test("leftTo1000 returns 0 if reached", () => {
    while (clicks.clicks <= 1001) {
      clicks.addClick();
    }

    expect(clicks.leftTo1000).toBe(0);
  });
});
