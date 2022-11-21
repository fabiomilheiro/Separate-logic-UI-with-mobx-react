import React from "react";
import { observer } from "mobx-react-lite";
import { Translations } from "./translations.logic";

const translations = new Translations();

export const Translation = observer(() => (
  <>
    <h1>Translate</h1>
    {translations.errorMessage && <p>{translations.errorMessage}</p>}
    <label htmlFor="original" style={{ display: "block" }}>
      Original
    </label>
    <textarea
      id="original"
      onChange={(e) => translations.setOriginal(e.currentTarget.value)}
      value={translations.original}
    />
    <p>Result: {translations.translationResult}</p>
    <button
      disabled={translations.loading}
      onClick={() => translations.translate()}
    >
      {translations.buttonText}
    </button>
  </>
));
