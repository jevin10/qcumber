import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { NumberInput, Button, Center, List, Title, Space, TextInput } from '@mantine/core';

function Setup() {

  const [step, setStep] = useState(1);
  let title;
  let description;
  let entry;

  const nameRef = useRef<HTMLInputElement>(null);

  switch(step) {
    case 1: {
      title = "Server Name";
      description = "Choose a name for your server.";
      entry = (    
        <TextInput
          placeholder="my-first-server"
          label="Name"
          ref={nameRef}
          required
        />
      );
      break;
    }
    case 2: {
      title = "Specifications";
      description = "Specify the amount of RAM to allocate.";
      entry = (
        <NumberInput
          defaultValue={4}
          placeholder="4"
          label="RAM"
          description="Value in Gigabytes. Recommend min 4gb."
          required
          max={32}
          min={2}
        />
      );
      break;
    }
  }

  function clickEvent() {
    if(step >= 4) {
      return;
    }
    if(step === 1) {
      if (nameRef.current != null) {
        if (nameRef.current.value === "") {
          return;
        }
      }
    }
    setStep(step+1);
  }

  return (
    <div className="setup">
      <Center style={{ width: '100%', height: '75vh' }}>
        <List listStyleType='none'>
          <List.Item><Title order={1}>Getting Started</Title></List.Item>
          <List.Item>Let's set up your first server!</List.Item>
          <Space h="md" />
          <List.Item><Title order={3}>Step {step}: {title}</Title></List.Item>
          <List.Item>{description}</List.Item>
          <Space h="md" />
          <List.Item>    
            {entry}
          </List.Item>
          <Space h="md" />
          <Button variant="default" compact onClick={clickEvent}>
            Next 
          </Button>
        </List>
      </Center>
    </div>
  );
}

export default Setup;
