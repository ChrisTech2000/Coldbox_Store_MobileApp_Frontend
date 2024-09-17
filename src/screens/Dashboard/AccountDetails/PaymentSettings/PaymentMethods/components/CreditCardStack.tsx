import React from 'react';
import { View } from 'react-native';
import colors from 'tailwindcss/colors';

import CreditCard, { Card } from './CreditCard';

interface CreditCardStackProps {
  cards: Card[];
}

const COLORS = [colors.emerald[500], colors.purple[700], colors.orange[500]];

function CreditCardStack({ cards }: CreditCardStackProps) {
  return (
    <View tw="p-4 h-full">
      <View tw="h-full">
        {cards.map((card, index) => {
          const color = COLORS[index % COLORS.length];

          return (
            <View
              key={`${card.number}-${index}`}
              style={[{ zIndex: cards.length + index }, { top: -85 * index }]}
            >
              <CreditCard
                number={card.number}
                predefined={card.predefined}
                brand={card.brand}
                color={color}
                details={card.details}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default CreditCardStack;
