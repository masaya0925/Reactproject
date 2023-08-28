import React, { useState } from "react";
import axios from "axios";

export const useResource = <ResourceType extends {id: number}>(
  baseurl:string
):[ResourceType[], typeof service] => {
  const [resources, setResources] = useState<ResourceType[]>([]);

  let token = '';

  const setToken = (newToken: string) => {
    token = `bearer ${newToken}`;
  };

  const getAll = async () => {
    const response = await axios.get<ResourceType[]>(baseurl);
    setResources(response.data);
  };

  const create = async (resource: Omit<ResourceType, 'id'>) => {
    const config = {
        headers: { Authorization: token }
    };
    const response = await axios.post<ResourceType>(baseurl, resource, config);
    setResources(resources.concat(response.data));
  };

  const update = async (id: number, resource: ResourceType) => {
    const response = await axios.patch<ResourceType>(`${baseurl}/${id}`, resource);
    const newResources = resources.map(r => r.id !== id ? r : response.data);
    setResources(newResources);
  };

  const service = {
    setToken,
    getAll,
    create,
    update
  };

  return [resources, service];
};

export const useField = (
  type: string
  ):[typeof attributes, typeof reset] => {
  const [value, setValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  }

  const attributes = {
    type,
    value,
    onChange
  };

  return [attributes, reset];
};