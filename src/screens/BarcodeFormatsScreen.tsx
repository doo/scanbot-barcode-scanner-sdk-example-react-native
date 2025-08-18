import React, { useContext } from 'react';
import { SwitchOptionsList } from '@components';
import { BarcodeFormatsContext } from '@context';

export function BarcodeFormatsScreen() {
  const { barcodeFormats, toggleBarcodeFormat } = useContext(BarcodeFormatsContext);

  return <SwitchOptionsList data={barcodeFormats} onPress={toggleBarcodeFormat} />;
}
