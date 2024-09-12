export function template<Props extends Record<string, unknown>>(
  str: TemplateStringsArray,
  ...args: string[] | ((props: Props) => string)[]
) {
  const interleaved = args.flatMap((arg, index) => {
    return [arg, str[index + 1]];
  });

  return (props?: Props) =>
    [str[0], ...interleaved]
      .map((part) => {
        return typeof part === 'function' ? part(props!) : part;
      })
      .join('');
}

const __htmlDocument: string = `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <style>
        * { 
            font-family: "Roboto", sans-serif;
            font-weight: 400;
            font-style: normal;
          }
        html { -webkit-print-color-adjust: exact; }
      </style>
    </head>
    <body><!--body-outlet--></body>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"></script>
  </html>
`;

export const html = (...bodyPartials: Array<string>) =>
  __htmlDocument.replace('<!--body-outlet-->', bodyPartials.join(''));
