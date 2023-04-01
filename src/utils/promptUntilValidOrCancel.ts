function promptUntilValidOrCancel({
  prompt,
  validator,
  defaultValue,
}: {
  prompt: string;
  validator: (input: string) => boolean;
  defaultValue?: string;
}) {
  let input = window.prompt(prompt, defaultValue);

  while (input && !validator(input)) {
    input = window.prompt(prompt, defaultValue);
  }

  return input?.trim();
}

export default promptUntilValidOrCancel;
