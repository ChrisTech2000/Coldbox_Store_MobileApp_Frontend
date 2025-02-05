import { template } from './internals';

//
// Details
//

export const DetailsContainer = template<{ datums: Array<{ label: string; value: string }> }>`
<div class="w-full px-4 py-0.5 tracking-wide my-2 rounded-md" style="background-color: #f0fdfa;">
  ${(p) => p.datums.map((datum) => `<p class="text-gray-900">${datum.label}: <span style="color: #14b8a6;">${datum.value}.</span></p>`).join('')}
</div>
`;

//
// Pills
//

export const PillCard = template<{
  label: string;
  value: number | string | Array<string | number>;
}>`
<div class="text-white h-auto flex flex-col items-center justify-center rounded-md px-4" style="background-color: #2e1065;">
  <p class="text-sm m-0 p-0">${(p) => p.label}</p>
  ${(p) =>
    Array.isArray(p.value)
      ? p.value.map((str) => `<p class="text-sm m-0 p-0">${str}</p>`).join('')
      : `<p class="text-sm m-0 p-0">${p.value.toString()}</p>`}
</div>
`;

export const PillContainer = template<{
  datums: Array<{ label: string; value: number | string | Array<string | number> }>;
}>`
<div class="bg-gray-100 rounded-md flex flex-row items-center justify-center space-x-2 space-y-1 flex-wrap my-2 p-2">
  ${(p) => p.datums.map((datum) => PillCard(datum)).join('')}
</div>
`;

//
// Section
//

export const Section = template<{ label: string; kind?: 'default' | 'impact' | 'aggregated' }>`
<div style="${(p) => (!p.kind ? 'background-color: #f0fdfa;' : '')}" class="${(p) => (p.kind === 'impact' ? 'bg-purple-50' : p.kind === 'aggregated' ? 'bg-gray-200' : '')} h-14 flex items-center px-4 my-2 rounded-md w-full">
  <p>${(p) => p.label}</p>
</div>
`;

export const UsersSection = template<{
  title: string;
  data: { male: string; female: string; other?: string };
}>`
<div class="w-full p-2 rounded-md flex flex-col items-center my-2" style="background-color: #f0fdfa;">
    <div class="text-lg mb-2">
      ${(p) => p.title}
    </div>
    <div class="flex flex-row items-center gap-2">
      <div class="text-lg">
        ${(p) => p.data.male}
      </div>
      <div class="bg-green-700 w-px h-8"></div>
      <div class="text-lg">
        ${(p) => p.data.female}
      </div>
    </div>
    ${(p) => (p.data.other ? `<div class="text-lg">${p.data.other}</div>` : '')}
  </div>
`;

export const UtilizationSection = template<{
  title: string;
  content: string;
}>`
  <div class="w-full bg-gray-200 p-2 rounded-md flex flex-col items-center my-2">
    <div class="text-lg mb-2">
      ${(p) => p.title}
    </div>
    <div class="flex flex-row items-center gap-2">
      ${(p) => p.content}
    </div>
  </div>
`;

export const ImpactGeneralSection = template<{
  title: string;
  content: string;
}>`
  <div class="w-full bg-purple-50 p-2 rounded-md flex flex-col items-center my-2">
    <div class="text-lg mb-2">
      ${(p) => p.title}
    </div>
    <div class="flex flex-row items-center gap-2">
      ${(p) => p.content}
    </div>
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
<thead class="w-full text-center bg-gray-700">
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
<tr tw="w-full">
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
          : (value ?? '')
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
  total: number;
}>`
<div class="w-full overflow-x-auto my-2">
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
    <small class="text-gray-500">${(p) => p.total?.toString() ?? 0} total</small>
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
<div class="w-full flex flex-col items-center space-y-2 p-4 bg-purple-50 rounded-md my-2">
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

//
// Scroll View
//
export const ScrollView = template<{ divs: string[] }>`
<div class="w-full mt-4 flex flex-col items-center">
  ${(p) => p.divs.join(' ')}
</div>
`;

//
// Table Footer
//
