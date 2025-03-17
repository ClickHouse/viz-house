import { Container, Icon, Panel } from '@clickhouse/click-ui';
import { ReactElement } from 'react';

interface LoadingProps {
  height: string;
  width: string;
}

export const Loading = ({ height, width }: LoadingProps): ReactElement => {
  return (
    <Panel
      orientation="vertical"
      height={height}
      width={width}
      data-testid="loading"
    >
      <Container
        orientation="vertical"
        justifyContent="center"
        fillHeight={true}
      >
        <Container
          orientation="horizontal"
          justifyContent="center"
          fillWidth={true}
        >
          <Icon name="horizontal-loading" size="xxl" />
        </Container>
      </Container>
    </Panel>
  );
};
