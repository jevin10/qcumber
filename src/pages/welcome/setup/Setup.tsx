import React from 'react';
import { Button, Center, List, Title, Space } from '@mantine/core';

function Setup() {
  return (
    <div className="setup">
      <Center style={{ width: '100%', height: '75vh' }}>
        <List listStyleType='none'>
          <List.Item><Title order={1}>Getting Started</Title></List.Item>
          <List.Item>Let's set up your first server!</List.Item>
          <Space h="md" />
          <List.Item><Title order={3}>Step [Step]: [Title]</Title></List.Item>
          <List.Item>[Description]</List.Item>
          <Space h="md" />
          <List.Item>
            [Entry]
          </List.Item>
          <Space h="md" />
          <Button variant="default" compact>
            Next 
          </Button>
        </List>
      </Center>
    </div>
  );
}

export default Setup;
