import { googleConsentDefaultsScript } from "./config";

export default function ConsentHead() {
  return (
    <script
      id="google-consent-defaults"
      dangerouslySetInnerHTML={{ __html: googleConsentDefaultsScript }}
    />
  );
}
