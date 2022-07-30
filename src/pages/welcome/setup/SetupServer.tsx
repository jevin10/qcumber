import React from 'react';
import { Button, Center, List, Title, Space } from '@mantine/core';


function SetupServer() {

  return (
    <div className="setupServer">
      <Center style={{ width: '100%', height: '75vh' }}>
        <List listStyleType='none'>
          <List.Item><Title order={1}>Building Server</Title></List.Item>
            <List.Item>[ ... ]</List.Item>
              <Space h="md" />
              <List.Item>
                An experimental Minecraft panel written in Rust and React.
              </List.Item>
              <Space h="md" />
            </List>
      </Center>
    </div>
  );
}
export default SetupServer;