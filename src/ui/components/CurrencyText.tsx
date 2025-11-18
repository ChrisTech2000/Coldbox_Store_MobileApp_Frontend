import React from 'react';

import { Text } from '#ui/components/Text';

import { formatCurrencyWithSymbol } from '#screens/Dashboard/Main/Dashboard/CheckIn/utils';

type CurrencyTextProps = {
  currency: string;
  amount: number;
  symbolTw?: string;
  amountTw?: string;
  containerTw?: string;
};

/**
 * Component that renders currency with styled symbol and amount
 * @param currency - Currency code (e.g., 'NGN', 'USD')
 * @param amount - The amount to display
 * @param symbolTw - Tailwind classes for the symbol (default: 'text-gray-500')
 * @param amountTw - Tailwind classes for the amount
 * @param containerTw - Tailwind classes for the container Text component
 */
export function CurrencyText({
  currency,
  amount,
  symbolTw = 'text-gray-500',
  amountTw = '',
  containerTw = '',
}: CurrencyTextProps) {
  const formatted = formatCurrencyWithSymbol(currency, amount);

  // Extract symbol and amount from formatted string
  // Common currency symbols: ₦, $, €, £, ¥, etc.
  const match = formatted.match(/^([^\d\s,.]+)\s*([\d,. ]+)$/);

  if (!match) {
    // Fallback if parsing fails
    return <Text tw={containerTw}>{formatted}</Text>;
  }

  const [, symbol, value] = match;

  return (
    <Text tw={containerTw}>
      <Text tw={symbolTw}>{symbol}</Text>
      <Text tw={amountTw}>{value}</Text>
    </Text>
  );
}
