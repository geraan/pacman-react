import { Card } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Ghost } from '../lib/Ghost';
import { GhostDebugControls } from './GhostDebugControls';
import { GhostsDebugTable } from './GhostDebugTable';
import { VSpace } from './Spacer';

type RenderGhost = (ghost: Ghost) => JSX.Element | string;

export const GhostsDebugView: FC<{}> = observer(() => {
  return (
    <div className="GhostsDebugView">
      <Card title="Ghosts" size="small">
        <GhostsDebugTable />
        <VSpace size="32px" />
        <GhostDebugControls />
      </Card>
    </div>
  );
});
