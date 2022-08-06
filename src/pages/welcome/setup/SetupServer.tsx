import React, { useEffect } from 'react';
import { Button, Center, List, Title, Space } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';

let __TAURI__ = window.__TAURI__;

function SetupServer() {

  const invoke = __TAURI__.invoke;

  useEffect(() => {
    invoke('create_build_context');
  }, []);

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