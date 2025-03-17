import { ButtonGroup, Container, Panel } from '@clickhouse/click-ui';
import { PropsWithChildren, ReactElement, useState } from 'react';

const sizes = [
  {
    label: 'Small',
    value: 'small'
  },
  {
    label: 'Medium',
    value: 'medium'
  },
  {
    label: 'Large',
    value: 'large'
  },
  {
    label: 'XL',
    value: 'xl'
  },
  {
    label: 'Full width',
    value: 'full'
  }
];

const getWidth = (size: string): string => {
  if (size === 'small') {
    return '640px';
  }

  if (size === 'medium') {
    return '768px';
  }

  if (size === 'large') {
    return '1024px';
  }

  if (size === 'xl') {
    return '1280px';
  }

  return '100%';
};

interface ResponsiveContainer {
  maxHeight?: string;
}

export const ResponsiveContainer = ({
  maxHeight = 'auto',
  children
}: PropsWithChildren<ResponsiveContainer>): ReactElement => {
  const [size, setSize] = useState<string>('medium');
  const width = getWidth(size);

  return (
    <Container orientation="vertical">
      <Container orientation="horizontal" justifyContent="center">
        <Panel width={width} height={maxHeight}>
          {children}
        </Panel>
      </Container>
      <Container orientation="horizontal" justifyContent="center">
        <ButtonGroup onClick={setSize} options={sizes} selected={size} />
      </Container>
    </Container>
  );
};
