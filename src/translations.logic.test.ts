import { Translations } from "./translations.logic";

describe("translations", () => {
  const fetchResponseValues = {
    ok: true,
    result: ""
  };

  beforeEach(() => {
    global.fetch = jest.fn(
      (input: RequestInfo, init?: RequestInit): Promise<Response> => {
        if (!fetchResponseValues.ok) {
          return Promise.reject("not ok");
        }

        return Promise.resolve({
          ok: fetchResponseValues.ok,
          json: () =>
            Promise.resolve({
              translations: {
                translation: fetchResponseValues.result
              }
            })
        } as Response);
      }
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  let translations: Translations;
  beforeEach(() => {
    translations = new Translations();
  });

  describe("buttonText", () => {
    test("not loading", () => {
      translations.loading = false;

      expect(translations.buttonText).toBe("Translate");
    });
    test("loading", () => {
      translations.loading = true;

      expect(translations.buttonText).toBe("Loading...");
    });
  });

  describe("translate", () => {
    test("report translation failed", async () => {
      fetchResponseValues.ok = false;

      await translations.translate();
      expect(translations.loading).toBe(false);
      expect(translations.translationResult).toBe("");
      expect(translations.errorMessage).toBe("Could not translate.");
    });

    test("report translation success", async () => {
      fetchResponseValues.ok = true;
      fetchResponseValues.result = "ABC";

      await translations.translate();
      expect(translations.loading).toBe(false);
      expect(translations.translationResult).toBe("ABC");
    });
  });
});
