import React from 'react';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { NumberInput, Button, Center, List, Title, Space, TextInput, Group } from '@mantine/core';
import { invoke } from '@tauri-apps/api/tauri';
import { useForm, UseFormReturnType } from '@mantine/form';

declare global {
    interface Window {
        __TAURI__:any;
    }
  }

let __TAURI__ = window.__TAURI__;

function Setup() {
  const nameRef = useRef<HTMLInputElement>(null);

  // Be sure to set `build.withGlobalTauri` in `tauri.conf.json` to true
  const invoke = __TAURI__.invoke;

  const [step, setStep] = useState(1);
  let title;
  let description;
  let entry;
  const [totalRam, setTotalRam] = useState(1);
  const [name, setName] = useState('');
  const [ram, setRam] = useState(1);

  interface FormValues {
    name: string;
    ramSpec: number;
  }
  
  function NameInput({form}: { form: UseFormReturnType<FormValues> }) {
    return <TextInput 
      placeholder="my-first-server"
      label="Name"
      ref={nameRef}
      required
      autoFocus='true'
      {...form.getInputProps('name')} 
    />;
  }

  function RamInput({form}: { form: UseFormReturnType<FormValues> }) {
    return <NumberInput
      defaultValue={4}
      placeholder="4"
      label="RAM"
      min={1}
      max={totalRam}
      description="Recommended min 4gb."
      required
      {...form.getInputProps('ramSpec')}  
    />;
  }

  const form = useForm<FormValues>({ initialValues: { name: '', ramSpec: 4, } });

  useEffect(() => {
    const storedValue = window.localStorage.getItem('user-form');
    if (storedValue) {
      try {
        form.setValues(JSON.parse(window.localStorage.getItem('user-form')!));
      } catch (e) {
        console.log('Failed to parse stored value');
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('user-form', JSON.stringify(form.values));
  }, [form.values]);
  
  useEffect(() => {
    invoke('get_ram').then((message: any) => (
      setTotalRam(Math.round(message/(1024*1024)))
    ));
  }, []);
 
  switch(step) {
    case 1: {
      title = "Server Name";
      description = "Choose a name for your server.";
      entry = (    
        <NameInput form={form} />
      );
      break;
    }
    case 2: {
      title = "Specifications";
      description = "Specify the amount of RAM to allocate.";
      entry = (
        <RamInput form={form} />
      );
      break;
    }
    case 3: {
      title = "Finalize";
      description = "Double check your settings and we're ready to roll!";
      entry = (
        <p>
          <b>Server Name:</b> {name}
          <br/>
          <b>Server Ram:</b> {ram}gb
        </p>
      );
      break;
    }
    default: break;
  }

  function backClickEvent() {
    if(step === 1) {
      return;
    }
    setStep(step-1);
  }

  function nextClickEvent() {
    if(step >= 4) {
      return;
    }
    if(step === 1) {
      if(form.values.name.length === 0) {
        return;
      }
      setName(form.values.name);
    }
    if(step ===2) {
      setRam(form.values.ramSpec);
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
          <Group position="apart">
            <Button variant="default" compact onClick={backClickEvent}>
              Back
            </Button>
            <Button variant="default" compact onClick={nextClickEvent}>
              Next
            </Button>
          </Group>
        </List>
      </Center>
    </div>
  );
}

export default Setup;