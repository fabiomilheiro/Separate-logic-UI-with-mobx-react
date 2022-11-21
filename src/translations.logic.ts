import { makeAutoObservable } from "mobx";

export class Translations {
  original: string = "Hello world";
  translationResult: string = "";
  loading: boolean = false;
  errorMessage: string = "";

  constructor() {
    makeAutoObservable(this);
  }

  setOriginal(value: string): void {
    this.original = value;
  }

  setLoading(value: boolean): void {
    this.loading = value;
  }

  setErrorMessage(value: string): void {
    this.errorMessage = value;
  }

  setTranslationResult(value: string): void {
    this.translationResult = value;
  }

  get buttonText(): string {
    return this.loading ? "Loading..." : "Translate";
  }

  async translate(): Promise<void> {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", this.original);
    encodedParams.append("target", "es");
    encodedParams.append("source", "en");

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "8b9096d893msh861bebfc73eb363p153b5fjsn6f0773d1743b",
        "X-RapidAPI-Host": "translate-plus.p.rapidapi.com"
      },
      body: JSON.stringify({
        text: this.original,
        source: "en",
        target: "fr"
      })
    };

    this.setLoading(true);

    try {
      const response = await global.fetch(
        "https://translate-plus.p.rapidapi.com/translate",
        options
      );

      const json = await response.json();

      if (!response.ok) {
        throw Error("response not ok.");
      }

      this.setTranslationResult(json.translations.translation);
      this.setLoading(false);
      this.setErrorMessage("");
    } catch (err) {
      console.error(err);
      this.setLoading(false);
      this.setErrorMessage("Could not translate.");
    }
  }
}
