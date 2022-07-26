import React from 'react';
import { Button, Center, List, Title, Space } from '@mantine/core';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div className="welcome">
      <Center style={{ width: '100%', height: '75vh' }}>
        <List listStyleType='none'>
          <List.Item><Title order={1}>qcumber</Title></List.Item>
          <List.Item>[ alpha build ]</List.Item>
          <Space h="md" />
          <List.Item>
            An experimental Minecraft panel written in Rust and React.
          </List.Item>
          <Space h="md" />
          <Button variant="default" component={Link} to="/welcome/setup" compact>
            Get Started
          </Button>
          <Button variant="default" compact>
            Learn More
          </Button>
        </List>
      </Center>
    </div>
  );
}

export default Welcome;
