import { template } from './internals';

//
// Details
//

export const DetailsContainer = template<{ datums: Array<{ label: string; value: string }> }>`
<div class="bg-teal-50 px-4 py-0.5 tracking-wide my-2 rounded-md">
  ${(p) => p.datums.map((datum) => `<p class="text-zinc-900">${datum.label}: <span class="text-teal-600">${datum.value}.</span></p>`).join('')}
</div>
`;

//
// Pills
//

export const PillCard = template<{ label: string; value: number | string }>`
<div class="bg-violet-950 text-white h-14 flex flex-col items-center justify-center rounded-md px-4">
  <p class="text-sm m-0 p-0">${(p) => p.label}</p>
  <p class="text-sm m-0 p-0">${(p) => p.value.toString()}</p>
</div>
`;

export const PillContainer = template<{ datums: Array<{ label: string; value: number | string }> }>`
<div class="h-24 max-h-24 bg-zinc-100 rounded-md flex flex-row items-center justify-evenly my-2">
${(p) => p.datums.map((datum) => PillCard(datum)).join('')}
</div>
`;

//
// Section
//

export const Section = template<{ label: string; kind?: 'default' | 'impact' }>`
<div class="${(p) => (p.kind === 'impact' ? 'bg-purple-50' : 'bg-sky-50')} h-14 flex items-center px-4 my-2 rounded-md">
  <p>${(p) => p.label}</p>
</div>
`;

//
// Table
//

type HeaderGroup = {
  name: string;
  subHeaders: Record<string, string>;
};

type TableColumns = Record<string, string | HeaderGroup>;

function _unGroupColumns(columns: TableColumns): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in columns) {
    const value = columns[key];
    if (typeof value === 'string') {
      result[key] = value;
    } else {
      for (const subKey in value.subHeaders) {
        result[subKey] = value.subHeaders[subKey];
      }
    }
  }
  return result;
}

const TableHead = template<{ columns: TableColumns }>`
<thead class="text-center bg-zinc-700">
  <tr>
    ${({ columns }) => {
      let hasSubHeaders = false;

      for (const key in columns) {
        const column = columns[key];
        if (typeof column === 'object') {
          hasSubHeaders = true;
          break;
        }
      }

      if (!hasSubHeaders) {
        return Object.values(columns)
          .map(
            (column) =>
              `<th class="whitespace-nowrap p-2 font-medium text-white border border-solid border-zinc-700">${column}</th>`
          )
          .join('');
      }

      let headerRow = '';
      let subHeaderRow = '';

      for (const key in columns) {
        const column = columns[key];
        if (typeof column === 'string') {
          headerRow += `<th class="whitespace-nowrap p-2 font-medium text-white border border-solid border-zinc-700" colspan="1"></th>`;
          subHeaderRow += `<th class="whitespace-nowrap p-2 font-medium text-white border border-solid border-zinc-700">${column}</th>`;
        } else {
          const subHeadersCount = Object.keys(column.subHeaders).length;
          headerRow += `<th class="whitespace-nowrap p-2 font-medium text-white border border-solid border-zinc-700 align-middle" colspan="${subHeadersCount}">${column.name}</th>`;
          subHeaderRow += Object.values(column.subHeaders)
            .map(
              (subHeader) =>
                `<th class="whitespace-nowrap p-2 font-medium text-white border border-solid border-zinc-700">${subHeader}</th>`
            )
            .join('');
        }
      }

      return `${headerRow}</tr><tr>${subHeaderRow}`;
    }}
  </tr>
</thead>
`;

const TableRow = template<{ values: Array<number | string> | Array<Array<number | string>> }>`
<tr>
  ${(p) =>
    p.values
      .map(
        (value) => `
    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border border-t-0 border-solid border-zinc-300">
      ${
        Array.isArray(value)
          ? `
        <div class="flex flex-col">
          ${value
            .map(
              (v) => `
            <div class="flex justify-center items-center h-8 w-full">${v}</div>
          `
            )
            .join('')}
        </div>
      `
          : value
      }
    </td>
  `
      )
      .join('')}
</tr>
`;

export const Table = template<{
  columns: TableColumns;
  rows: Array<Record<string, number | string>>;
}>`
<div class="overflow-x-auto my-2">
  <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border-collapse">
    ${({ columns }) => TableHead({ columns })}
    <tbody class="divide-y divide-gray-200">
      ${({ rows, columns }) =>
        rows
          .map((row) =>
            TableRow({
              values: Object.keys(_unGroupColumns(columns)).map((columnKey) => row[columnKey]),
            })
          )
          .join('')}
    </tbody>
  </table>
  <div class="px-4 py-3">
    <small class="text-gray-500">${(p) => p.rows.length.toString()} total</small>
  </div>
</div>
`;

//
// Survey Stats
//

export const SurveyStatsCounter = template<{
  datums: Array<{ max: number; current: number; message: string; title: string }>;
}>`
<div class="flex flex-row justify-evenly items-center bg-teal-50 p-4 tracking-wide my-2 rounded-md">
${(p) =>
  p.datums
    .map(
      (datum) => `<div class="flex flex-col items-center space-y-3">
  <div class="bg-zinc-700 h-14 px-4 rounded-md flex items-center justify-center">
    <p class="text-white text-center text-sm">${datum.title}</p>
  </div>
    <p class="text-xl"><span class="text-rose-600 text-3xl">${datum.current}</span>/${datum.max}</p>
    <p class="text-base">${datum.message}</p>
  </div>`
    )
    .join('')}
</div>
`;

export const SurveyStatsPercentage = template<{
  title: string;
  max: number;
  current: number;
  chipText: string;
}>`
<div class="flex flex-col items-center space-y-4 p-4 bg-purple-50 rounded-md my-2">
  <p class="m-0 p-0">${(p) => p.title}</p>
  <div class="flex flex-row space-x-2 items-center">
    <p class="text-xl m-0 p-0"><span class="text-zinc-700 text-2xl font-semibold">${(p) => p.current.toString()}</span>/${(p) => p.max.toString()}</p>
    <p class="text-2xl text-purple-700 m-0 p-0">(${(p) => ((p.current / p.max) * 100).toFixed(2)}%)</p>
  </div>
  <div class="bg-zinc-700 h-14 px-4 rounded-md flex items-center justify-center">
    <p class="text-white text-center text-sm m-0 p-0">${(p) => p.chipText}</p>
  </div>
</div>
`;

//
// Impact Evolution
//

export const ImpactEvolution = template<{
  title: string;
  subtitle: string;
  from: string;
  to: string;
}>`
<div class="flex flex-col items-center space-y-2 p-4 bg-purple-50 rounded-md my-2">
  <p>${(p) => p.title}</p>
  <div class="flex flex-row items-center space-x-3 h-14 max-h-14">
    <p>${(p) => p.subtitle}</p>
    <div class="w-0.5 h-full bg-zinc-500"></div>
    <div class="flex flex-col items-start">
      <p class="m-0 p-0 font-semibold">From ${(p) => p.from}</p>
      <p class="m-0 p-0 font-semibold">To ${(p) => p.to}</p>
    </div>
  </div>
</div>
`;
