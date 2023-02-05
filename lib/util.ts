export function sortBy<T>(arr: T[], k: keyof T) {
  return arr.concat().sort((a, b) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0));
}

export function sortByFn<T>(arr: T[], fn: (item: T) => number) {
  return arr
    .concat()
    .sort((a, b) => (fn(a) > fn(b) ? 1 : fn(a) < fn(b) ? -1 : 0));
}

// a function to extract the main text from an email string
// leave out the signature, previous emails, etc.
export function extractMainEmailText(email: string) {
  // remove text after the signature
  const signatureLessText = (email + "\n--\n").match(
    /^[\s\S]*?(?=^[-—_]+$)/m
  )?.[0];

  // // remove text after the signature
  // const signatureLessText = collapsedText?.match(/^[\s\S]*?(?=^-- $)/m)?.[0];

  // remove text after the previous emails
  const previousEmailsLessText = (signatureLessText + "\nOn wrote:")?.match(
    /^[\s\S]*?(?=^On.*wrote:)/m
  )?.[0];

  // remove text after previous froms: "froms"-less text
  const previousFromsLessText = (previousEmailsLessText + "\nFrom: >")?.match(
    /^[\s\S]*?(?=^From:.*>)/m
  )?.[0];

  // collapse multiple newlines
  const collapsedText = previousFromsLessText; //?.replaceAll(/( *\n *)*/g, "\n");

  // max length of 1000 characters
  const maxLengthText = collapsedText?.slice(0, 1000);

  return maxLengthText?.trim() ?? "";
}
